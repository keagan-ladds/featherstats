'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import useDialog from "hooks/use-dialog";
import SubscriptionPlanSelection from "components/subscription/subscription-plan-selection";
import { useSubscription } from "hooks/use-subscription";
import { useUser } from "hooks/use-user";
import { useCallback, useEffect, useMemo } from "react";

export default function UserPlanSelectionDialog() {
    const { close, isOpen } = useDialog("upgrade")
    const { open: openCheckout } = useDialog("checkout")

    const { plans, isLoading, updateSubscriptionPlan, fetchPlans, paymentIntent } = useSubscription();

    const { profile } = useUser()
    const subscription = profile.subscription
    const currentPlanId = subscription?.planId;


    const currentMode = useMemo(() => {
        return "plans"
    }, [])

    const onPlanSelected = useCallback((planId: string, priceId: string) => {
        updateSubscriptionPlan({ planId, priceId })
    }, [])

    useEffect(() => {
        if (paymentIntent != null) {
            openCheckout(paymentIntent)
        }
    }, [paymentIntent])

    useEffect(() => {
        fetchPlans();
    }, [])

    return <>
        <Dialog open={isOpen} onOpenChange={close}>
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