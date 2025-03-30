import { withZodValidation } from "lib/api-utils";
import { withAuth } from "lib/auth";
import { UpdateUserSubscriptionSchema as UpdateSubscriptionPlanSchema } from "lib/validation/subscription";
import { NextRequest, NextResponse } from "next/server";
import { subscriptionService } from "services/subscription.service";
import { UpdateSubscriptionPlanOptions as UpdateSubscriptionPlanOptions } from "types/subscription";

export async function PUT(request: NextRequest) {
    return await withAuth(request, async (_, userId) => {
        return withZodValidation<UpdateSubscriptionPlanOptions>(request, UpdateSubscriptionPlanSchema, async (data: UpdateSubscriptionPlanOptions) => {
            const result = await subscriptionService.updateSubscriptionPlan(userId, data)
            console.log(result)
            return NextResponse.json(result);
        });
    })
}