import { BillingPeriod, PlanUsageLimit, SubscriptionStatus, User } from "@featherstats/database/types";
import { UpdateUserPreferencesSchema } from "lib/validation/user";
import { z } from "zod";

export type UserSubscription = {
    planId: string;
    name: string;
    amount: number;
    currency: string;
    status: SubscriptionStatus
    billingPeriod: BillingPeriod;
    currentPeriodEnd?: Date | null;
    usageLimits: PlanUsageLimit
}

export type UserProfile = Omit<User, "metadata" | "stripeCustomerId"> & {
    subscription: UserSubscription
}

export type UpdateUserPreferencesOptions = z.infer<typeof UpdateUserPreferencesSchema>