'use client'
import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { StripeError } from '@stripe/stripe-js';
import { Button } from '@repo/ui/components/ui/button';
import { SubscriptionPaymentIntent, UpdateSubscriptionPlanResult } from 'types/subscription';
import { getURL } from 'lib/utils';
import { formatCurrency } from 'lib/format-utils';


interface Props {
    clientSecret: string;
    intentType:  SubscriptionPaymentIntent["intentType"];
    amount?: number;
    currency?: string
}

export default function SubscriptionCheckoutForm({clientSecret, intentType, amount, currency}: Props) {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState(false);

    const handleError = (error: StripeError) => {
        setLoading(false);
        setErrorMessage(error.message);
    }

    const handleSubmit = async (event: any) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setLoading(true);

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        const confirmIntent = intentType === "setup_intent" ? stripe.confirmSetup : stripe.confirmPayment;

        // Confirm the Intent using the details collected by the Payment Element
        const { error } = await confirmIntent({
            elements,
            clientSecret,
            confirmParams: {
                return_url: getURL("/manage/subscription/checkout"),
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when confirming the Intent.
            // Show the error to your customer (for example, "payment details incomplete").
            handleError(error);
        } else {
            // Your customer is redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer is redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <Button className='mt-5 w-full' type="submit" disabled={!stripe || loading}>
                {amount && currency ? `Pay ${formatCurrency(amount, currency)}` : "Save Details" }
            </Button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
}