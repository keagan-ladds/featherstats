import { withAuth } from "lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { subscriptionService } from "services/subscription.service";
import { usageService } from "services/usage.service";

export function GET(request: NextRequest) {
    return withAuth(request, async (_, userId) => {
        const subscription = await subscriptionService.getActiveUserSubscription(userId);
        if (!subscription) return new NextResponse("User does not have an active subscription.", { status: 400 })

        const usage = await usageService.getSubscriptionUsage(subscription.id);
        return NextResponse.json(usage);
    })
}