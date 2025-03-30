import { withAuth } from "lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { subscriptionService } from "services/subscription.service";

export async function GET(request: NextRequest) {
    return await withAuth(request, async (_, userId) => {
        const plans = await subscriptionService.getPlans();
        return NextResponse.json(plans)
    });
}