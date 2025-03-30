import { NextRequest, NextResponse } from "next/server";
import { subscriptionService } from "services/subscription.service";

export async function POST(req: NextRequest) {
    await subscriptionService.createUserSubscription("rDzI7wxDw4GR", "price_1R7eITCHv2qPXSvbOpXeRpT4")

    return NextResponse.json({})
}