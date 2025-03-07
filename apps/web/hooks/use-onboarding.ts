'use client'

import { OnboardingContext } from "contexts/onboarding-context";
import { useCallback, useContext } from "react";

export function useOnboarding() {
    const context = useContext(OnboardingContext);

    if (!context) throw new Error("The hook 'useOnboarding' can only be used within an OnboardingProvider.")

    const { onboardingStep, continueEnabled } = context;
    const { setContinueEnabled, setOnboardingStep } = context;

    const onContinue = useCallback(() => {
        switch (onboardingStep) {
            case "welcome":
                setOnboardingStep("workspace");
                return;
            case "workspace":
                setOnboardingStep("domain")
                return;
            case "domain":
                setOnboardingStep("done");
                return;
        }
    }, []);

    const createWorkspace = useCallback(() => {
        
    }, [])

    return {
        onboardingStep,
        continueEnabled,
        onContinue
    }
}