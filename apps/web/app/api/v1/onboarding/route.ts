
import { withAuth } from "lib/auth";
import { OnboardingDataSchema } from "lib/validation/onboarding";
import { NextRequest, NextResponse } from "next/server";
import { userService } from "services/user.service";
import { workspaceService } from "services/workspace.service";
import { WorkspaceWithDomains } from "types/workspace";

export function POST(request: NextRequest) {
    return withAuth(request, async (_, userId) => {

        // Check if the user already has a default workspace, if so they have already onboarded
        // so just return that workspace
        const existingWorkspace = await workspaceService.getDefaultWorkspaceByUserId(userId);
        if (existingWorkspace) return NextResponse.json(existingWorkspace, { status: 200 });

        const requestBody = await request.json()
        const onboardingData = OnboardingDataSchema.parse(requestBody);
        
        await userService.updateUserById(userId, { name: onboardingData.name });
        const workspace = await workspaceService.createDefaultUserWorkspace(userId, { name: onboardingData.workspaceName });
        const domain = await workspaceService.createWorkspaceDomain(workspace.id, { name: onboardingData.domainName });

        return NextResponse.json<WorkspaceWithDomains>({
            ...workspace,
            domains: [domain]
        }, { status: 200 })
    })
}