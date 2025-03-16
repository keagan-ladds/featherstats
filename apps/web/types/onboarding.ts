import { OnboardingDataDomainSchema, OnboardingDataSchema, OnboardingDataWelcomeSchema, OnboardingDataWorkspaceSchema } from "lib/validation/onboarding";
import { z } from "zod";

export type OnboardingDataWelcome = z.infer<typeof OnboardingDataWelcomeSchema>
export type OnboardingDataWorkspace  = z.infer<typeof OnboardingDataWorkspaceSchema>
export type OnboardingDataDomain = z.infer<typeof OnboardingDataDomainSchema>
export type OnboardingData = z.infer<typeof OnboardingDataSchema>