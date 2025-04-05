'use client'
import { CheckCircle } from "lucide-react";
import { OnboardingContinueButton } from "./onboarding-form";
import { useCallback } from "react";
import { redirect } from "next/navigation";

export default function OnboardingStepDone() {
    const onContinue = useCallback(() => {
        redirect("/")
    }, [])

    return (
        <div className="flex flex-col my-auto gap-4">
            <div className="flex flex-col">
                <div className="flex h-10 w-10 mb-2">
                    <CheckCircle className="size-10" />
                </div>
                <h1 className="text-xl font-bold">You're all set!</h1>
                <div className="text-sm text-muted-foreground">
                    Your workspace is ready, and your first domain is locked in. Time to explore and make some data-driven moves!
                </div>
            </div>
            <OnboardingContinueButton onClick={onContinue} />
        </div>
    )
}