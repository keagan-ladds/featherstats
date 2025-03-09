'use client'
import { useOnboarding } from "hooks/use-onboarding";
import { Blocks, CheckCircle } from "lucide-react";
import { OnboardingContinueButton } from "./onboarding-form";
import { useCallback } from "react";
import { redirect } from "next/navigation";



export default function OnboardingStepDone() {
    const onContinue = useCallback(() => {
        redirect("/app")
    }, [])

    return (
        <div className="flex flex-col items-center my-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-md mb-2">
                <CheckCircle className="size-10" />
            </div>
            <h1 className="text-xl font-bold">You're all set!</h1>
            <div className="text-center text-sm mb-8">
                Your workspace is ready, and your first domain is locked in. Time to explore and make some data-driven moves!
            </div>
            <OnboardingContinueButton onClick={onContinue} />
        </div>
    )
}