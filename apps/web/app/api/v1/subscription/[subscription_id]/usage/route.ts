import { NextRequest, NextResponse } from "next/server";
import { usageService } from "services/usage.service";

export async function POST(request: NextRequest, context: { params: Promise<{ subscription_id: string }> }) {
    const { subscription_id } = await context.params
    const result = await usageService.syncSubscriptionUsage(subscription_id);
    return NextResponse.json(result)
}

export async function GET(request: NextRequest, context: { params: Promise<{ subscription_id: string }> }) {
    const { subscription_id } = await context.params
    const result = await usageService.getSubscriptionUsage(subscription_id);
    return NextResponse.json(result)
}