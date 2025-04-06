
import { db } from "@featherstats/database";
import { withAuth } from "lib/auth";
import { OnboardingDataSchema } from "lib/validation/onboarding";
import { NextRequest, NextResponse } from "next/server";
import { emailService } from "services/email.service";
import { SubscriptionService } from "services/subscription.service";
import { UserService } from "services/user.service";
import { workspaceService as defaultWorkspaceService, WorkspaceService } from "services/workspace.service";
import { WorkspaceWithDomains } from "types/workspace";

export function POST(request: NextRequest) {
    return withAuth(request, async (_, userId) => {

        try {
            const existingWorkspace = await defaultWorkspaceService.getDefaultWorkspaceByUserId(userId);
            if (existingWorkspace) return NextResponse.json(existingWorkspace, { status: 200 });

            const requestBody = await request.json()
            const onboardingData = OnboardingDataSchema.parse(requestBody);

            const result = await db.transaction(async (transaction) => {
                const userService = new UserService(transaction)
                const workspaceService = new WorkspaceService(transaction)
                const subscriptionService = new SubscriptionService(transaction)

                try {
                    const user = await userService.updateUserById(userId, { name: onboardingData.name });
                    const workspace = await workspaceService.createDefaultUserWorkspace(userId, { name: onboardingData.workspaceName });
                    const domain = await workspaceService.createWorkspaceDomain(workspace.id, { name: onboardingData.domainName, enforce_origin_match: true, normalize_www: true });
                    const subscription = await subscriptionService.createUserSubscription(userId, onboardingData.priceId, true);

                    return {
                        workspace: workspace,
                        domain: domain,
                        user: user,
                        subscription: subscription
                    }

                } catch (err) {
                    transaction.rollback();
                    console.log("An error occurred while processing the onboarding request. ", err)
                }
            });

            const { domain, workspace, user } = result!;
            await emailService.sendWelcomeEmail(user.email!, user.name!);
            return NextResponse.json<WorkspaceWithDomains>({
                ...workspace,
                domains: [domain]
            }, { status: 200 })

        } catch (err) {
            console.log(err)
            return new NextResponse(null, { status: 400 });
        }
    })
}