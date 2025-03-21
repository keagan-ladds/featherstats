import OnboardingForm from "components/onboarding/onboarding-form";
import { OnboardingProvider } from "contexts/onboarding-context";
import { auth } from "lib/auth";
import { forbidden, redirect } from "next/navigation";
import WorkspaceProvider from "providers/workspace-provider";
import { workspaceService } from "services/workspace.service";

export default async function OnboardingPage() {
    const session = await auth();
    if (!session || !session.user?.id) return forbidden()
    const defaultWorkspace = await workspaceService.getDefaultWorkspaceByUserId(session.user?.id)
    if (defaultWorkspace) return redirect("/app");

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <OnboardingProvider>
                    <OnboardingForm />
                </OnboardingProvider>
            </div>
        </div>
    )
}