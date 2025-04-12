import { stripe } from "lib/stripe/server";
import { NextRequest, NextResponse } from "next/server";
import { subscriptionService } from "services/subscription.service";
import { Stripe } from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_KEY;

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get("Stripe-Signature");

    if (!signature || !webhookSecret) {
        return new NextResponse("Webhook signature or secret missing", { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error(`❌ Error message: ${errorMessage}`);
        return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
    }

    switch (event.type) {
        case "customer.subscription.created":
            const createdSubscription = event.data.object as Stripe.Subscription
            await subscriptionService.handleSubscriptionCreated(createdSubscription);
            break;

        case "customer.subscription.updated":
            const updatedSubscription = event.data.object as Stripe.Subscription
            await subscriptionService.handleSubscriptionUpdated(updatedSubscription);
            break;

        case "customer.subscription.deleted":
            const deletedSubscription = event.data.object as Stripe.Subscription
            await subscriptionService.handleSubscriptionCancelled(deletedSubscription);
            break;

        default:
            console.log(`Unhandled Stripe webhook event type ${event.type}.`);
    }

    return NextResponse.json({ received: true });
}