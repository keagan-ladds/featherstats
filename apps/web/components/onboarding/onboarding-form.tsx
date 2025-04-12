'use client'
import { useOnboarding } from 'hooks/use-onboarding'
import OnboardingStepWelcome from './onboarding-welcome'
import OnboardingStepWorkspace from "./onboarding-workspace"
import OnboardingStepDomain from "./onboarding-domain"
import { Button } from '@repo/ui/components/ui/button'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import OnboardingStepDone from './onboarding-done'
import OnboardingStepSubscription from './onboarding-subscription'
import OnboardingStepConnect from './onboarding-connect'

export default function OnboardingForm() {
    const { onboardingStep } = useOnboarding();

    return (
        <div className="flex flex-col min-h-[500px]">
            {onboardingStep == 'welcome' && <OnboardingStepWelcome />}
            {onboardingStep == 'subscription' && <OnboardingStepSubscription/>}
            {onboardingStep == 'workspace' && <OnboardingStepWorkspace />}
            {onboardingStep == 'domain' && <OnboardingStepDomain />}
            {onboardingStep == 'connect' && <OnboardingStepConnect />}
            {onboardingStep == 'done' && <OnboardingStepDone />}
        </div>
    )
}

interface OnboardingContinueButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    text?: string
}

export function OnboardingContinueButton({onClick, disabled, text}: OnboardingContinueButtonProps) {
    const { loading } = useOnboarding()

    return (
        <div className='flex flex-col items-center w-full  mt-auto gap-2'>
            <Button className='group w-full' disabled={loading || disabled} onClick={() => onClick?.()}>
                {loading ? (<>
                    <LoaderCircle className='animate-spin' />
                </>) :
                    (<> {text || "Continue"}
                        <ArrowRight className='group-hover:translate-x-2 transition-transform' />
                    </>)}
            </Button>
        </div>

    )
}