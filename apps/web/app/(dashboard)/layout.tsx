import { Separator } from "@repo/ui/components/ui/separator"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@repo/ui/components/ui/sidebar"
import { AppSidebar } from "components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@repo/ui/components/ui/breadcrumb"
import { workspaceService } from "services/workspace.service"
import { auth } from "lib/auth"
import { redirect } from "next/navigation"
import WorkspaceProvider from "providers/workspace-provider"
import UserProvider from "providers/user-provider"
import { userService } from "services/user.service"
import UserPreferencesDialog from "components/user/user-preferences-dialog"
import AppShellProvider from "providers/app-shell-provider"
import NavHeader from "components/nav-header"

interface AppLayoutProps {
    children: React.ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {

    const session = await auth();
    if (!session?.user?.id) return redirect('/login');

    const userId = session.user.id;
    const userProfile = await userService.getUserProfileById(userId);
    const workspace = await workspaceService.getDefaultWorkspaceByUserId(userId);
    if (!workspace) return redirect('/onboarding');

    return <>
        <UserProvider userProfile={userProfile}>
            <AppShellProvider>
                <WorkspaceProvider workspace={workspace} domains={workspace.domains || []}>
                    <SidebarProvider>
                        <AppSidebar />
                        <SidebarInset>
                            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                                <div className="flex items-center gap-2 px-4">
                                    <SidebarTrigger className="-ml-1" />
                                    <Separator orientation="vertical" className="mr-2 h-4" />
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem className="!hidden !md:block">
                                                <BreadcrumbLink>
                                                    {workspace.name}
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                                <NavHeader/>
                            </header>
                            <div className="flex-1 space-y-4 p-4 pt-0">
                                {children}
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                    <UserPreferencesDialog />
                </WorkspaceProvider>
            </AppShellProvider>
        </UserProvider>
    </>
}