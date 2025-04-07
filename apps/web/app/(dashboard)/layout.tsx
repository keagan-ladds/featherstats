import { SidebarProvider, SidebarInset, SidebarTrigger } from "@repo/ui/components/ui/sidebar"
import { AppSidebar } from "components/app-sidebar"
import { workspaceService } from "services/workspace.service"
import { auth } from "lib/auth"
import { redirect } from "next/navigation"
import WorkspaceProvider from "providers/workspace-provider"
import UserProvider from "providers/user-provider"
import { userService } from "services/user.service"
import AppShellProvider from "providers/app-shell-provider"
import NavHeader from "components/nav-header"
import DialogProvider from "providers/dialog-provier"
import DomainCreateDialog from "components/dialog/domain-create-dialog"
import { DomainSwitcher } from "components/domain-switcher"
import SubscriptionUsageAlert from "components/subscription/subscription-usage-alert"

interface AppLayoutProps {
    children: React.ReactNode,
    modal: React.ReactNode
}

export default async function AppLayout({ children, modal }: AppLayoutProps) {

    const session = await auth();
    if (!session?.user?.id) return redirect('/login');

    const userId = session.user.id;
    const userProfile = await userService.getUserProfileById(userId);
    const workspace = await workspaceService.getDefaultWorkspaceByUserId(userId);
    if (!workspace) return redirect('/onboarding');

    return <>
        <UserProvider userProfile={userProfile}>
            <AppShellProvider>
                <DialogProvider>
                    <WorkspaceProvider workspace={workspace} domains={workspace.domains || []}>
                        <SidebarProvider>
                            <AppSidebar />
                            <SidebarInset>
                                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                                    <div className="flex items-center gap-2 px-4">
                                        <SidebarTrigger className="-ml-1" />
                                        <DomainSwitcher />
                                    </div>
                                    <NavHeader />
                                </header>
                                <div className="flex-1 space-y-4 p-4 pt-0">
                                    <SubscriptionUsageAlert/>
                                    {children}
                                </div>
                            </SidebarInset>
                        </SidebarProvider>
                        {modal}
                        <DomainCreateDialog />
                    </WorkspaceProvider>
                </DialogProvider>
            </AppShellProvider>
        </UserProvider>
    </>
}