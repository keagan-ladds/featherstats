import { z } from "zod";

export const OnboardingDataWelcomeSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    })
})

export const OnboardingDataSubscriptionSchema = z.object({
    priceId: z.string().nonempty()
})

export const OnboardingDataWorkspaceSchema = z.object({
    workspaceName: z.string().min(2, {
        message: "Workspace name must be at least 2 characters.",
    }),
})

export const OnboardingDataDomainSchema = z.object({
    domainName: z.string().regex(new RegExp("^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$"), "Please provide a valid domain name"),
    enforce_origin_match: z.boolean(),
    normalize_www: z.boolean()
})

export const OnboardingDataSchema = OnboardingDataWelcomeSchema.and(OnboardingDataWorkspaceSchema).and(OnboardingDataDomainSchema).and(OnboardingDataSubscriptionSchema);