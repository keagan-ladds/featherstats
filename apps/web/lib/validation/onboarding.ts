import { z } from "zod";

export const OnboardingDataWelcomeSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    })
})

export const OnboardingDataWorkspaceSchema = z.object({
    workspaceName: z.string().min(2, {
        message: "Workspace name must be at least 2 characters.",
    }),
})

export const OnboardingDataDomainSchema = z.object({
    domainName: z.string().min(2),
})

export const OnboardingDataSchema = OnboardingDataWelcomeSchema.and(OnboardingDataWorkspaceSchema).and(OnboardingDataDomainSchema);