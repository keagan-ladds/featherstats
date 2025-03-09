'use client'

import { OnboardingContext, OnboardingStep } from "contexts/onboarding-context";
import { onboardDefaultWorkspace } from "lib/client/api-client";
import { useCallback, useContext } from "react";
import { OnboardingData } from "types/onboarding";
import { toast } from "sonner"

export function useOnboarding() {
    const context = useContext(OnboardingContext);

    if (!context) throw new Error("The hook 'useOnboarding' can only be used within an OnboardingProvider.")

    const { onboardingStep, onboardingData, loading } = context;
    const { setOnboardingStep, setOnboardingData, setLoading } = context;

    const onContinue = useCallback((nextStep: OnboardingStep, data?: Partial<OnboardingData>) => {
        setOnboardingStep(nextStep);
        setOnboardingData(data || {})
    }, []);

    const onBack = useCallback((previousStep: OnboardingStep) => {
        setOnboardingStep(previousStep);
    }, [])

    const onboardWorkspace = useCallback(async (data?: Partial<OnboardingData>) => {
        try {
            setLoading(true);
            await onboardDefaultWorkspace({ ...onboardingData, ...data } as OnboardingData);
            setOnboardingStep('done');
        } catch (err) {
            toast.error("An unexpected error occurred while onboarding your workspace, please refresh the page and try again")
        }

        setLoading(false);
    }, []);


    return {
        loading,
        onboardingStep,
        onContinue,
        onboardWorkspace
    }
}