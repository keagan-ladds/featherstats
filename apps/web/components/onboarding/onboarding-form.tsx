'use client'
import { useOnboarding } from 'hooks/use-onboarding'
import OnboardingStepWelcome from './onboarding-welcome'
import OnboardingStepWorkspace from "./onboarding-workspace"
import OnboardingStepDomain from "./onboarding-domain"
import { Button } from '@repo/ui/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function OnboardingForm() {

    const { onboardingStep } = useOnboarding();

    return (
        <div className="flex flex-col min-h-[500px]">
            {onboardingStep == 'welcome' && <OnboardingStepWelcome />}
            {onboardingStep == 'workspace' && <OnboardingStepWorkspace />}
            {onboardingStep == 'domain' && <OnboardingStepDomain />}
        </div>
    )
}

export function OnboardingContinueButton() {
    return (
        <div className='flex flex-col items-center w-full  mt-auto gap-2'>
            <Button className='group w-full'>Continue
                <ArrowRight className='group-hover:translate-x-2 transition-transform' />
            </Button>
        </div>

    )
}