import OnboardingForm from "components/onboarding/onboarding-form";
import { OnboardingProvider } from "contexts/onboarding-context";
import { auth } from "lib/auth";
import { getFlowCookies } from "lib/onboarding-utils";
import { forbidden, redirect } from "next/navigation";
import { workspaceService } from "services/workspace.service";

export default async function OnboardingPage() {
    const session = await auth();
    if (!session || !session.user?.id) return forbidden()
    const defaultWorkspace = await workspaceService.getDefaultWorkspaceByUserId(session.user?.id)
    if (defaultWorkspace) return redirect("/");

    const flowParams = await getFlowCookies();

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-lg">
                <OnboardingProvider flowParams={flowParams}>
                    <OnboardingForm />
                </OnboardingProvider>
            </div>
        </div>
    )
}