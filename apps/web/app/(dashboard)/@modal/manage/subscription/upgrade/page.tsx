'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import SubscriptionPlanSelection from "components/subscription/subscription-plan-selection";
import { useSubscription } from "hooks/use-subscription";
import { useUser } from "hooks/use-user";
import { useCallback, useEffect } from "react";
import { useModalSafeClose } from "hooks/use-modal-close";
import { useRouter } from "next/navigation";

export default function UserPlanSelectionDialog() {
    const close = useModalSafeClose();
    const {push } = useRouter();

    const { plans, isLoading, updateSubscriptionPlan, fetchPlans, paymentIntent } = useSubscription();

    const { profile } = useUser()
    const subscription = profile.subscription
    const currentPlanId = subscription?.planId;

    const onPlanSelected = useCallback((planId: string, priceId: string) => {
        updateSubscriptionPlan({ planId, priceId })
    }, [])

    useEffect(() => {
        if (paymentIntent?.clientSecret && paymentIntent?.intentType) {
            push(`/manage/subscription/checkout?payment_intent_client_secret=${encodeURIComponent(paymentIntent.clientSecret)}&intent_type=${encodeURIComponent(paymentIntent.intentType)}`)
        }
    }, [paymentIntent])

    useEffect(() => {
        fetchPlans();
    }, [])

    return <>
        <Dialog open={true} onOpenChange={close}>
            <DialogContent className="md:max-w-[825px]!">
                <DialogHeader className="items-center">
                    <DialogTitle>Choose Your Plan</DialogTitle>
                    <DialogDescription>
                        Select the plan that best fits your needs.
                    </DialogDescription>
                </DialogHeader>
                <SubscriptionPlanSelection onPlanSelected={onPlanSelected} subscriptionPlans={plans} isLoading={isLoading} currentPlanId={currentPlanId} currentBillingPeriod={subscription?.billingPeriod} />
            </DialogContent>
        </Dialog>
    </>
}