import { addDays, addMonths, endOfDay, getUnixTime, isBefore, isSameDay, startOfDay } from "date-fns";
import { SubscriptionUsage, UsageTrackResult } from "types/usage";
import { redis } from "lib/redis/server";
import { DrizzleClient } from "@featherstats/database/types";
import { db } from "@featherstats/database";
import { eq } from "drizzle-orm";
import { TinybirdClient, tinybirdClient } from "lib/tinybird/server";
import { planPricesTable, plansTable, subscriptionsTable, workspacesTable } from "@featherstats/database/schema/app";
import { usersTable } from "@featherstats/database/schema/auth";
import { UTCDate } from "@date-fns/utc";
import logger from "lib/logger";
import { emailService } from "./email.service";


class UsageService {
    private database: DrizzleClient;
    private tinybird: TinybirdClient;

    constructor(database: DrizzleClient = db) {
        this.database = database;
        this.tinybird = tinybirdClient;
    }

    async getSubscriptionUsage(subscriptionId: string): Promise<SubscriptionUsage | undefined> {
        const [subscription] = await this.database.select({
            currentPeriodStart: subscriptionsTable.currentPeriodStart,
            usageLimits: plansTable.usageLimits
        }).from(subscriptionsTable)
            .innerJoin(planPricesTable, eq(planPricesTable.id, subscriptionsTable.priceId))
            .innerJoin(plansTable, eq(plansTable.id, planPricesTable.planId))
            .where(eq(subscriptionsTable.id, subscriptionId))

        if (!subscription) return;

        const workspaces = await this.database.select({
            workspaceId: workspacesTable.id,
        }).from(subscriptionsTable)
            .innerJoin(usersTable, eq(usersTable.id, subscriptionsTable.userId))
            .innerJoin(workspacesTable, eq(workspacesTable.userId, usersTable.id))
            .innerJoin(planPricesTable, eq(planPricesTable.id, subscriptionsTable.priceId))
            .innerJoin(plansTable, eq(plansTable.id, planPricesTable.planId))
            .where(eq(subscriptionsTable.id, subscriptionId))

        if (!workspaces || workspaces.length == 0) {
            return;
        }

        const workspaceIds = workspaces.map((workspace) => workspace.workspaceId)
        const usagePeriodAnchor = subscription.currentPeriodStart
        const { start: usagePeriodStart, end: usagePeriodEnd } = this.getUsagePeriod(usagePeriodAnchor || undefined);
        var usage = await this.tinybird.getUsageSummary(workspaceIds, usagePeriodStart, usagePeriodEnd)

        const periodUsage = usage.reduce((prev, curr) => {
            prev.pageviews += curr.pageviews;
            prev.visits += curr.visits
            return prev;
        }, { pageviews: 0, visits: 0 })


        const dailyUsage = usage.reduce((prev, curr) => {
            if (isSameDay(curr.date, UTCDate.now())) {
                prev.pageviews += curr.pageviews;
                prev.visits += curr.visits;
            }

            return prev;
        }, { pageviews: 0, visits: 0 })

        return {
            from: usagePeriodStart,
            to: usagePeriodEnd,
            periodUsage: periodUsage,
            dailyUsage: dailyUsage,
            usageLimits: subscription.usageLimits,
            dailyPageviewSoftlimit: this.getDailySoftlimit(subscription.usageLimits.maxMonthlyPageviews),
            workspaces: workspaces.length
        };
    }

    async syncSubscriptionUsage(subscriptionId: string) {
        const usage = await this.getSubscriptionUsage(subscriptionId);

        if (!usage) {
            return;
        }

        const { dailyUsage, periodUsage, to: usagePeriodEnd } = usage;

        // Sync the daily and period limits to Redis
        await redis.set(this.getDailyUsageKey(subscriptionId), dailyUsage.pageviews, { exat: getUnixTime(endOfDay(UTCDate.now())) })
        await redis.set(this.getPeriodUsageKey(subscriptionId), periodUsage.pageviews, { exat: getUnixTime(endOfDay(usagePeriodEnd)) })

        if (usage.periodUsage.pageviews > usage.usageLimits.maxMonthlyPageviews && !await redis.get<boolean>(this.getMonthlyUsageExceedNotificationKey(subscriptionId))) {            
            await redis.set(this.getMonthlyUsageExceedNotificationKey(subscriptionId), true, { exat: getUnixTime(endOfDay(usagePeriodEnd)) });
            emailService.sendMonthlyLimitExceedNotification(subscriptionId)
        }

        if (usage.dailyUsage.pageviews > usage.dailyPageviewSoftlimit && !await redis.get<boolean>(this.getDailyUsageExceedNotificationKey(subscriptionId))) {
            await redis.set(this.getDailyUsageExceedNotificationKey(subscriptionId), true, { exat: getUnixTime(endOfDay(UTCDate.now())) });
            emailService.sendSoftlimitExceedNotification(subscriptionId);
        }

        return usage;
    }

    async trackUsage(subscriptionId: string): Promise<UsageTrackResult> {
        try {

            const [subscription] = await this.database.select({
                usagePeriodAnchor: subscriptionsTable.currentPeriodStart,
                usageLimits: plansTable.usageLimits
            }).from(subscriptionsTable)
                .innerJoin(planPricesTable, eq(planPricesTable.id, subscriptionsTable.priceId))
                .innerJoin(plansTable, eq(plansTable.id, planPricesTable.planId))
                .where(eq(subscriptionsTable.id, subscriptionId));

            if (!subscription) {
                logger.warn(`Could not get subscription details for subscription id '${subscriptionId}', unable to track usage.`)
                return { shouldRateLimit: false }
            }

            const { usagePeriodAnchor, usageLimits } = subscription;

            const { end: usagePeriodEnd } = this.getUsagePeriod(usagePeriodAnchor || undefined);
            const periodUsageKey = this.getPeriodUsageKey(subscriptionId);
            const dailyUsageKey = this.getDailyUsageKey(subscriptionId);
            const dailyUsageSoftLimit = this.getDailySoftlimit(usageLimits.maxMonthlyPageviews);
            const dailyExpire = getUnixTime(endOfDay(UTCDate.now()));
            const periodExpire = getUnixTime(usagePeriodEnd);

            let periodUsage = await redis.get<number>(periodUsageKey) || 0
            let dailyUsage = await redis.get<number>(dailyUsageKey) || 0

            if (periodUsage > usageLimits.maxMonthlyPageviews) {
                return { shouldRateLimit: true, message: "Monthly pageview limit has been reached." }
            }

            if (dailyUsage > dailyUsageSoftLimit) {
                return { shouldRateLimit: true, message: "Daily soft-limit has been reached." }
            }

            periodUsage = await redis.incr(periodUsageKey);
            dailyUsage = await redis.incr(dailyUsageKey);

            if (periodUsage == 1)
                await redis.expireat(periodUsageKey, periodExpire)

            if (dailyUsage == 1)
                await redis.expireat(dailyUsageKey, dailyExpire)

            return { shouldRateLimit: false }
        } catch (err) {
            console.error("An error occurred while trying to track usage.")
            return { shouldRateLimit: false, error: err }
        }
    }


    private getUsagePeriod(anchor: Date = this.startOfMonthUTC(new UTCDate())): { start: Date, end: Date } {
        // Make sure to anchor to the start of the day (UTC)
        anchor = startOfDay(new UTCDate(anchor))
        const now = UTCDate.now();

        // Ensure anchor is before or equal to now
        if (isBefore(now, anchor)) {
            throw new Error('Anchor date must be in the past or now.');
        }

        // Find how many full custom months have passed
        let periodsPassed = 0;
        let periodStart = anchor;
        let periodEnd = addMonths(anchor, 1);

        // Shift period forward until now is inside [start, end)
        while (!isBefore(now, periodEnd)) {
            periodsPassed++;
            periodStart = addMonths(anchor, periodsPassed);
            periodEnd = addMonths(anchor, periodsPassed + 1);
        }

        periodEnd = new Date(periodEnd.getTime() - 1);

        return {
            start: periodStart,
            end: periodEnd
        };
    }

    private getMonthlyUsageExceedNotificationKey = (subscriptionId: string) => `subscription_usage_${subscriptionId}_monthlimit_exceed_notification`;
    private getDailyUsageExceedNotificationKey = (subscriptionId: string) => `subscription_usage_${subscriptionId}_softlimit_exceed_notification`;
    private getDailyUsageKey = (subscriptionId: string) => `subscription_usage_${subscriptionId}_softlimit`;
    private getPeriodUsageKey = (subscriptionId: string) => `subscription_usage_${subscriptionId}`;
    private getDailySoftlimit = (monthlyLimit: number) => Math.ceil(1.25 * (monthlyLimit / 30))

    startOfMonthUTC(date: Date): Date {
        return new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            1, 0, 0, 0, 0
        ));
    }
}

export const usageService = new UsageService();


