import { db } from "@featherstats/database"
import { usersTable } from "@featherstats/database/schema/auth"
import { User, UserMetadata } from "@featherstats/database/types"
import { eq } from "drizzle-orm";
import { UpdateUserPreferencesOptions, UserProfile } from "types/user";
import { planPricesTable, plansTable, subscriptionsTable } from "@featherstats/database/schema/app";

class UserService {
    async getUserById(id: string): Promise<User | undefined> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));
        return user;
    }

    async getUserProfileById(id: string): Promise<UserProfile> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));

        if (!user) throw new Error('User not found');

        const [subscription] = await db.select().from(subscriptionsTable)
            .innerJoin(planPricesTable, eq(planPricesTable.id, subscriptionsTable.priceId))
            .innerJoin(plansTable, eq(planPricesTable.planId, plansTable.id));

        return {
            ...user,
            subscription: {
                planId: subscription?.plans.id || "",
                status: subscription?.subscriptions.status || "active",
                name: subscription?.plans.name || "Free",
                amount: subscription?.plan_prices.amount || 0,
                billingPeriod: subscription?.plan_prices.billingPeriod || "monthly",
                currency: subscription?.plan_prices.currency || "usd",
                currentPeriodEnd: subscription?.subscriptions.currentPeriodEnd,
                usageLimits: subscription?.plans.usageLimits || {
                    maxDomains: 1,
                    dataRetentionDays: 90,
                    maxMonthlyPageviews: 10000,
                    maxWorkspaces: 1
                }
            }
        }
    }

    async updateUserProfileById(id: string, opts: UpdateUserPreferencesOptions): Promise<void> {
        const user = await this.getUserById(id);
        if (!user) throw new Error("User not found");

        await db.update(usersTable)
            .set({
                name: opts.name,
                preferences: {
                    ...user.preferences,
                    clarifyModeEnabled: opts.clarityModeEnabled,
                    theme: opts.theme
                }
            }).where(eq(usersTable.id, id));
    }

    async updateUserMetadataById(id: string, metadata: Partial<UserMetadata>) {
        await db.update(usersTable).set({ metadata: metadata }).where(eq(usersTable.id, id));
    }

    async updateUserById(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
        const [user] = await db.update(usersTable)
            .set({ ...data })
            .where(eq(usersTable.id, id)).returning();

        if (!user) throw new Error(`Failed to update, user with id '${id}' could not be found`);

        return user;
    }
}

export const userService = new UserService()