
'use client'

import { ApiErrorResponse } from "types/api";
import { OnboardingData } from "types/onboarding";
import { WorkspaceWithDomains } from "types/workspace";

if (!process.env.NEXT_PUBLIC_API_URL) throw new Error('NEXT_PUBLIC_API_URL has not been defined');
const ApiBaseUrl = process.env.NEXT_PUBLIC_API_URL

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