'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "lib/stripe/client";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import SubscriptionCheckoutForm from "components/subscription/subscription-checkout-form";
import { useModalSafeClose } from "hooks/use-modal-close";
import { useSearchParams } from "next/navigation";
import { SubscriptionPaymentIntent } from "types/subscription";

export default function SubscriptionCheckoutDialog() {

    const searchParams = useSearchParams();
    const close = useModalSafeClose()

    const [paymentIntent, setPaymentIntent] = useState<SubscriptionPaymentIntent | null>();
    const [status, setStatus] = useState<"succeeded" | "canceled" | "processing" | "requires_action" | "requires_capture" | "requires_confirmation" | "requires_payment_method">()

    const clientSecret = searchParams.get('payment_intent_client_secret');
    const intentType = searchParams.get("intent_type") || "payment_intent"
    const redirectStatus = searchParams.get("redirect_status")

    const getPaymentIntentDetails = useCallback(async () => {
        const stripe = await stripePromise
        if (clientSecret && stripe) {
            const intent = await stripe.retrievePaymentIntent(clientSecret)
            setStatus(intent.paymentIntent?.status)
            setPaymentIntent({
                amount: intent.paymentIntent?.amount,
                currency: intent.paymentIntent?.currency,
                intentType: "payment_intent"
            })
        }

    }, [clientSecret])

    const getSetupIntentDetails = useCallback(async () => {
        const stripe = await stripePromise
        if (clientSecret && stripe) {
            const intent = await stripe.retrieveSetupIntent(clientSecret)
            setStatus(intent.setupIntent?.status)
            setPaymentIntent({
                intentType: "setup_intent"
            });
        }

    }, [clientSecret])

    useEffect(() => {
        if (intentType === "payment_intent")
            getPaymentIntentDetails();
        else if (intentType === "setup_intent")
            getSetupIntentDetails()
    }, [clientSecret, intentType])

    const options: StripeElementsOptions = useMemo(() => (
        {
            clientSecret: clientSecret!,
            appearance: {
                theme: "night",
                variables: {
                    colorPrimary: "#006dbc",
                    colorBackground: "#090d11"
                }
            }

        }), [clientSecret])

    const checkoutContent = useMemo(() => {
        if (status === "succeeded") {
            return <>Your payment has been processed succesfully</>
        } else if (status === "canceled") {
            return <>Your request has been cancelled</>
        } else if (status === "processing") {
            return <>Your request is being processed in the background</>
        }

        if (paymentIntent) {
            <Elements stripe={stripePromise} options={options}>
                <SubscriptionCheckoutForm clientSecret={clientSecret!} intentType={paymentIntent?.intentType} amount={paymentIntent?.amount} currency={paymentIntent?.currency} />
            </Elements>
        }

    }, [paymentIntent, status, stripePromise])

    return <>
        <Dialog open={true} onOpenChange={close} >
            <DialogContent className="md:max-w-[825px]!" onInteractOutside={(e) => { e.preventDefault(); }}>
                <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                {checkoutContent}
            </DialogContent>
        </Dialog>
    </>
}