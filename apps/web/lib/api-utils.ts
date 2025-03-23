import { NextRequest, NextResponse } from "next/server";
import { ApiErrorResponse } from "types/api";

export async function withZodValidation<T>(req: NextRequest, schema: Zod.ZodSchema<T>, callback: (requestData: T) => Promise<NextResponse>): Promise<NextResponse> {
    const requestBody = await req.json()
    const parseResult = schema.safeParse(requestBody);

    if (!parseResult.success) return NextResponse.json<ApiErrorResponse>({
        error: parseResult.error,
        errorMessage: 'Request validation failed',
        success: false
    }, { status: 400 });

    return await callback(parseResult.data)
}   