import { withAuth } from "lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { subscriptionService } from "services/subscription.service";

export async function GET(request: NextRequest) {
    return withAuth(request, async (_, userId) => {
        const result = await subscriptionService.updateBillingDetails(userId);
        return NextResponse.json(result)
    })
}