'use client'

import { createContext, useState } from "react";
import { OnboardingData } from "types/onboarding";

export type OnboardingStep = 'welcome' | 'workspace' | 'domain' | 'done';



interface OnboardingContext {
    onboardingStep: OnboardingStep
    loading: boolean;
    onboardingData: Partial<OnboardingData>;
    setOnboardingStep: (step: OnboardingStep) => void;
    setOnboardingData: (data: Partial<OnboardingData>) => void;
    setLoading: (loading: boolean) => void;
}

interface OnboardingProviderProps {
    children: React.ReactNode
}

export const OnboardingContext = createContext<OnboardingContext | null>(null)
export function OnboardingProvider({ children }: OnboardingProviderProps) {
    const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("welcome")
    const [loading, setLoading] = useState<boolean>(false)
    const [onboardingData, setOnboardingDataState] = useState<Partial<OnboardingData>>({})

    const setOnboardingData = (data: Partial<OnboardingData>) => {
        setOnboardingDataState({
            ...onboardingData, 
            ...data
        })
    }

    const context: OnboardingContext = {
        onboardingStep,
        loading,
        onboardingData,
        setOnboardingStep,
        setOnboardingData,
        setLoading
    }

    return <OnboardingContext.Provider value={context}>{children}</OnboardingContext.Provider>;
}