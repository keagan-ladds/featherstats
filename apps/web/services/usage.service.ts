import { endOfDay, getUnixTime } from "date-fns";
import { UsageTrackResult } from "types/usage";
import { redis } from "lib/redis/server";
import { DrizzleClient, PlanUsageLimit } from "@featherstats/database/types";
import { db } from "@featherstats/database";

class UsageService {
    private database: DrizzleClient;

    constructor(database: DrizzleClient = db) {
        this.database = database;
    }
    async syncWorkspaceUsage(workspaceId: string) {

    }

    async trackUsage(subscriptionId: string, usageLimits: PlanUsageLimit): Promise<UsageTrackResult> {
        try {
            //const periodUsageKey = `subscription_usage_${subscriptionId}`;
            const dailyUsageKey = `subscription_usage_${subscriptionId}_softlimit`;
            const dailyUsageSoftLimit = Math.ceil(1.1 * (usageLimits.maxMonthlyPageviews / 30))
            const dailyExpire = getUnixTime(endOfDay(Date.now()));
            //const periodExpire = getUnixTime(usagePeriodEnd);

            //let periodUsage = await redis.get<number>(periodUsageKey) || 0
            let dailyUsage = await redis.get<number>(dailyUsageKey) || 0

            //if (periodUsage > usageLimits.maxMonthlyPageviews) {
            //    return { shouldRateLimit: true, message: "Monthly pageview limit has been reached." }
            //}

            if (dailyUsage > dailyUsageSoftLimit) {
                return { shouldRateLimit: true, message: "Daily soft-limit has been reached." }
            }

            //periodUsage = await redis.incr(periodUsageKey);
            dailyUsage = await redis.incr(dailyUsageKey);

            //if (periodUsage == 1)
            //    await redis.expireat(periodUsageKey, periodExpire)

            if (dailyUsage == 1)
                await redis.expireat(dailyUsageKey, dailyExpire)

            return { shouldRateLimit: false }
        } catch (err) {
            console.error("An error occurred while trying to track usage.")
            return { shouldRateLimit: false, error: err }
        }
    }
}

export const usageService = new UsageService();


