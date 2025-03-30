import { z } from "zod";

export const UpdateUserSubscriptionSchema = z.object({
    planId: z.string(),
    priceId: z.string(),
})