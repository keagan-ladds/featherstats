'use client'

import { OnboardingContext, OnboardingStep } from "contexts/onboarding-context";
import { getDomain, onboardDefaultWorkspace } from "lib/client/api-client";
import { useCallback, useContext, useState } from "react";
import { OnboardingData } from "types/onboarding";
import { toast } from "sonner"

export function useOnboarding() {
    const context = useContext(OnboardingContext);

    const [error, setError] = useState<string>()

    if (!context) throw new Error("The hook 'useOnboarding' can only be used within an OnboardingProvider.")

    const { onboardingStep, onboardingData, loading, flowParams, workspaceId, domainName, trackingId } = context;
    const { setOnboardingStep, setOnboardingData, setLoading, setWorkspaceId, setDomainName, setTrackingId } = context;

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
            const result = await onboardDefaultWorkspace({ ...onboardingData, ...data } as OnboardingData);
            setWorkspaceId(result.id);
            setDomainName(result.domains![0]!.name)
            setTrackingId(result.domains![0]!.key)

            setOnboardingStep('connect');
        } catch (err) {
            toast.error("An unexpected error occurred while onboarding your workspace, please refresh the page and try again")
        }

        setLoading(false);
    }, []);

    const validateTag = useCallback(async () => {
        if (!workspaceId || !domainName) return;

        setLoading(true)
        await retryOperation(async () => {
            const domain = await getDomain(workspaceId, domainName);
            if (!domain || domain.verificationStatus != "verified") {
                throw new Error("Could not verify tag was correctly defined.")
            }

            toast.success("Domain tracker successfully verified.");
            setOnboardingStep('done');
        }, 5, 15000, () => setError("Could not verify the domain tracker was placed correctly."))

        setLoading(false)
    }, [])

    const retryOperation = async <T>(
        operation: () => Promise<T>,
        maxRetries: number,
        delayMs: number,
        onError?: (error: any) => void
    ): Promise<T> => {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const result = await operation();
                return result; // success!
            } catch (error) {
                if (attempt === maxRetries) {
                    if (onError) onError(error);
                    throw error;
                }
                console.warn(`Attempt ${attempt} failed. Retrying in ${delayMs / 1000}s...`);
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            }
        }
        // Should never reach here
        throw new Error('Unhandled retry failure');
    };


    return {
        loading,
        onboardingStep,
        flowParams,
        trackingId,
        error,
        onContinue,
        onboardWorkspace,
        validateTag
    }
}