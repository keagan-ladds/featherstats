import { OnboardingDataDomainSchema, OnboardingDataSchema, OnboardingDataSubscriptionSchema, OnboardingDataWelcomeSchema, OnboardingDataWorkspaceSchema } from "lib/validation/onboarding";
import { z } from "zod";

export type OnboardingDataWelcome = z.infer<typeof OnboardingDataWelcomeSchema>
export type OnboardingDataSubscription = z.infer<typeof OnboardingDataSubscriptionSchema>
export type OnboardingDataWorkspace  = z.infer<typeof OnboardingDataWorkspaceSchema>
export type OnboardingDataDomain = z.infer<typeof OnboardingDataDomainSchema>
export type OnboardingData = z.infer<typeof OnboardingDataSchema>