import { withZodValidation } from "lib/api-utils";
import { withAuth } from "lib/auth";
import { UpdateUserPreferencesSchema } from "lib/validation/user";
import { NextRequest, NextResponse } from "next/server";
import { userService } from "services/user.service";
import { ApiResponse } from "types/api";
import { UpdateUserPreferencesOptions, UserProfile } from "types/user";

export function GET(req: NextRequest) {
    return withAuth(req, async (_, userId) => {
        const userProfile = await userService.getUserProfileById(userId);
        return NextResponse.json<UserProfile>(userProfile);
    });
}

export function POST(req: NextRequest) {
    return withAuth(req, async (_, userId) => {
        return withZodValidation<UpdateUserPreferencesOptions>(req, UpdateUserPreferencesSchema, async (data: UpdateUserPreferencesOptions) => {
            await userService.updateUserProfileById(userId, data);
            return NextResponse.json<ApiResponse>({ success: true })
        });
    });
}