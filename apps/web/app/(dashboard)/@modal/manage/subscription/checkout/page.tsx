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
import { cn } from "lib/utils";
import { CheckCircle, Cross, Hourglass } from "lucide-react";

export default function SubscriptionCheckoutDialog() {

    const searchParams = useSearchParams();
    const close = useModalSafeClose('/', true)

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

    const shouldShowElements = useMemo(() => {
        switch (status) {
            case "canceled":
            case "processing":
            case "succeeded":
                return false;
        }

        if (paymentIntent) return true;
        return false;
    }, [paymentIntent, status])

    const checkoutContent = useMemo(() => {
        if (status === "succeeded") {
            return <div className="flex flex-col items-center justify-center gap-6 my-6">
                <CheckCircle className="text-green-400 size-20" />
                <div className="flex flex-col items-center">
                    <h1 className="text-center text-xl">Payment Successful</h1>
                    <span className="text-center text-muted-foreground text-sm">You can close this dialog</span>
                </div>
            </div>
        } else if (status === "canceled") {
            return <div className="flex flex-col items-center justify-center gap-6 my-6">
                <Cross className="text-red-400 size-20" />
                <div className="flex flex-col items-center">
                    <h1 className="text-center text-xl">Payment Failed</h1>
                    <span className="text-center text-muted-foreground text-sm">Your payment has failed, please try again.</span>
                </div>
            </div>
        } else if (status === "processing") {
            return <div className="flex flex-col items-center justify-center gap-6 my-6">
                <Hourglass className="text-foreground size-20" />
                <div className="flex flex-col items-center">
                    <h1 className="text-center text-xl">Payment Processing</h1>
                    <span className="text-center text-muted-foreground text-sm">Your payment is still being processed, you can close this dialog and we will let you know if we need more information.</span>
                </div>
            </div>
        }

        if (paymentIntent) {
            return (
                <Elements stripe={stripePromise} options={options}>
                    <SubscriptionCheckoutForm clientSecret={clientSecret!} intentType={paymentIntent?.intentType} amount={paymentIntent?.amount} currency={paymentIntent?.currency} />
                </Elements>
            )
        }

    }, [paymentIntent, status, stripePromise])

    return <>
        <Dialog open={true} onOpenChange={close} >
            <DialogContent className={cn("", shouldShowElements && "md:max-w-[825px]")} onInteractOutside={(e) => { e.preventDefault(); }}>
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