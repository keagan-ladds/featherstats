'use client'

import { createContext, useState } from "react";

type OnboardingStep = 'welcome' | 'workspace' | 'domain' | 'done';

interface OnboardingContext {
    onboardingStep: OnboardingStep
    continueEnabled: boolean;
    loading: boolean;
    setOnboardingStep: (step: OnboardingStep) => void;
    setContinueEnabled: (enabled: boolean) => void;
}

interface OnboardingProviderProps {
    children: React.ReactNode
}

export const OnboardingContext = createContext<OnboardingContext | null>(null)
export function OnboardingProvider({ children }: OnboardingProviderProps) {
    const [continueEnabled, setContinueEnabled] = useState<boolean>(true)
    const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("welcome")
    const [loading, setLoading] = useState<boolean>(false)

    const context: OnboardingContext = {
        onboardingStep,
        continueEnabled,
        loading,
        setOnboardingStep,
        setContinueEnabled
    }

    return <OnboardingContext.Provider value={context}>{children}</OnboardingContext.Provider>;
}