import { NextRequest, NextResponse } from "next/server";
import { usageService } from "services/usage.service";

export async function POST(request: NextRequest, context: { params: Promise<{ subscription_id: string }> }) {
    const { subscription_id } = await context.params
    const result = await usageService.syncSubscriptionUsage(subscription_id);
    if (!result) return new NextResponse(null, { status: 404 });
    return NextResponse.json(result)
}

export async function GET(request: NextRequest, context: { params: Promise<{ subscription_id: string }> }) {
    const { subscription_id } = await context.params
    const result = await usageService.getSubscriptionUsage(subscription_id);
    if (!result) return new NextResponse(null, { status: 404 });
    return NextResponse.json(result)
}