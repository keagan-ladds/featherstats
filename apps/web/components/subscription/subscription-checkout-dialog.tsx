'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "lib/stripe/client";
import SubscriptionCheckoutForm from "./subscription-checkout-form";
import { StripeElementsOptions } from "@stripe/stripe-js";
import { useMemo } from "react";
import useDialog from "hooks/use-dialog";
import { useSubscription } from "hooks/use-subscription";

export default function SubscriptionCheckoutDialog() {
    const { close, isOpen, data: paymentIntent } = useDialog("checkout")

    const options: StripeElementsOptions = useMemo(() => (
        {
            clientSecret: paymentIntent?.clientSecret,
            appearance: {
                theme: "night",
                variables: {
                    colorPrimary: "#006dbc",
                    colorBackground: "#090d11"
                }
            }

        }), [paymentIntent])

    return <>
        <Dialog open={isOpen} onOpenChange={close} >
            <DialogContent className="md:max-w-[825px]!" onInteractOutside={(e) => { e.preventDefault(); }}>
                <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                {paymentIntent?.clientSecret && (
                    <Elements stripe={stripePromise} options={options}>
                        <SubscriptionCheckoutForm clientSecret={paymentIntent?.clientSecret!} intentType={paymentIntent?.intentType} amount={paymentIntent?.amount} currency={paymentIntent?.currency} />
                    </Elements>
                )}

            </DialogContent>
        </Dialog>
    </>
}