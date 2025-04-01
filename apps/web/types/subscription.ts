import { Plan, PlanPrice } from "@featherstats/database/types";
import { UpdateUserSubscriptionSchema } from "lib/validation/subscription";
import { z } from "zod";

export type PlanWithPrices = Plan & {
    prices: PlanPrice[]
}

export type UpdateSubscriptionPlanOptions = z.infer<typeof UpdateUserSubscriptionSchema>

export type UpdateSubscriptionPlanResult = {
    complete: boolean;
    intentType?: 'payment_intent' | 'setup_intent'
    clientSecret?: string;
    amount?: number;
    currency?: string;
}