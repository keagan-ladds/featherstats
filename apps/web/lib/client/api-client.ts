
'use client'

import { ApiErrorResponse, ApiResponse } from "types/api";
import { OnboardingData } from "types/onboarding";
import { PlanWithPrices, UpdateSubscriptionPlanOptions, UpdateSubscriptionPlanResult } from "types/subscription";
import { UpdateUserPreferencesOptions } from "types/user";
import { WorkspaceWithDomains } from "types/workspace";

const ApiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';

async function makeApiRequest<TResponse>(url: string, method: string, body?: any) {
    const response = await fetch(`${ApiBaseUrl}${url}`, {
        body: body && JSON.stringify(body),
        method: method
    });

    if (!response.ok){
        if (response.status === 401 || response.status === 403)
            throw new ApiUnauthorizedError("");

        const errorResponse = await response.json() as ApiErrorResponse;
        const errorMessage = errorResponse.error ?? "Unknown API error";
        
        throw new ApiError(errorMessage);
    }

    const responseBody = await response.json() as TResponse
    return responseBody;
}

export async function onboardDefaultWorkspace(onboardingData: OnboardingData): Promise<WorkspaceWithDomains> {
    return makeApiRequest("/api/v1/onboarding", "POST", onboardingData);
}

export async function updateUserProfile(opts: UpdateUserPreferencesOptions): Promise<ApiResponse> {
    return makeApiRequest("/api/v1/profile", "POST", opts);
}

export async function getSubscriptionPlans(): Promise<PlanWithPrices[]> {
    return makeApiRequest("/api/v1/subscription/plans", "GET");
}

export async function updateSubscriptionPlan(opts: UpdateSubscriptionPlanOptions): Promise<UpdateSubscriptionPlanResult> {
    return makeApiRequest("/api/v1/subscription", "PUT", opts);
}

export class ApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ApiError";
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export class ApiUnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ApiUnauthorizedError";
        Object.setPrototypeOf(this, ApiUnauthorizedError.prototype);
    }
}