'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import useDialog from "hooks/use-dialog";
import SubscriptionPlanSelection from "components/subscription/subscription-plan-selection";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useSubscription } from "hooks/use-subscription";
import SubscriptionBillingForm from "components/subscription/subscription-billing-form";
import { useUser } from "hooks/use-user";
import { useCallback } from "react";
import { stripePromise } from "lib/stripe/client";


export default function UserPlanSelectionDialog() {
    const { close, isOpen } = useDialog("upgrade")

    const { plans, isLoading, updateSubscriptionPlan, clientSecret, intentType } = useSubscription();
    const { profile } = useUser()
    const subscription = profile.subscription
    const currentPlanId = subscription.planId;

    const options = {
        clientSecret: clientSecret,
    } satisfies StripeElementsOptions

    const onPlanSelected = useCallback((planId: string, priceId: string) => {
        updateSubscriptionPlan({ planId, priceId })
    }, [])

    return <>
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="md:!max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Choose Your Plan</DialogTitle>
                    <DialogDescription>
                        Select the plan that best fits your needs.
                    </DialogDescription>
                </DialogHeader>

                {!clientSecret && (<SubscriptionPlanSelection onPlanSelected={onPlanSelected} subscriptionPlans={plans} isLoading={isLoading} currentPlanId={currentPlanId} currentBillingPeriod={subscription.billingPeriod} />)}
                {clientSecret && (
                    <Elements stripe={stripePromise} options={options}>
                        <SubscriptionBillingForm clientSecret={clientSecret} intentType={intentType} />
                    </Elements>
                )}
            </DialogContent>
        </Dialog>
    </>
}