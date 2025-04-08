import { db } from "@featherstats/database"
import { usersTable } from "@featherstats/database/schema/auth"
import { DrizzleClient, User, UserMetadata } from "@featherstats/database/types"
import { eq } from "drizzle-orm";
import { UpdateUserPreferencesOptions, UserProfile } from "types/user";
import { planPricesTable, plansTable, subscriptionsTable } from "@featherstats/database/schema/app";

export class UserService {
    private database: DrizzleClient;

    constructor(database: DrizzleClient = db) {
        this.database = database;
    }

    async getUserById(id: string): Promise<User | undefined> {
        const [user] = await this.database.select().from(usersTable).where(eq(usersTable.id, id));
        return user;
    }

    async getUserProfileById(userId: string): Promise<UserProfile> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));

        if (!user) throw new Error('User not found');

        const [subscription] = await this.database.select().from(subscriptionsTable)
            .innerJoin(usersTable, eq(usersTable.subscriptionId, subscriptionsTable.id))
            .innerJoin(planPricesTable, eq(planPricesTable.id, subscriptionsTable.priceId))
            .innerJoin(plansTable, eq(planPricesTable.planId, plansTable.id))
            .where(eq(usersTable.id, userId));

        const userSubscription = subscription ? {
            planId: subscription.plans.id,
            status: subscription.subscriptions.status!,
            name: subscription.plans.name,
            amount: subscription.plan_prices.amount,
            billingPeriod: subscription.plan_prices.billingPeriod,
            currency: subscription.plan_prices.currency,
            currentPeriodEnd: subscription.subscriptions.currentPeriodEnd,
            usageLimits: subscription.plans.usageLimits
        } : undefined;


        return {
            ...user,
            subscription: userSubscription
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
        await this.database.update(usersTable).set({ metadata: metadata }).where(eq(usersTable.id, id));
    }

    async updateUserById(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
        const [user] = await this.database.update(usersTable)
            .set({ ...data })
            .where(eq(usersTable.id, id)).returning();

        if (!user) throw new Error(`Failed to update, user with id '${id}' could not be found`);

        return user;
    }
}

export const userService = new UserService()