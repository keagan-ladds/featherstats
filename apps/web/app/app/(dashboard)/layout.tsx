import { Separator } from "@repo/ui/components/ui/separator"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@repo/ui/components/ui/sidebar"
import { AppSidebar } from "components/app-sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@repo/ui/components/ui/breadcrumb"
import { workspaceService } from "services/workspace.service"
import { auth } from "lib/auth"
import { redirect } from "next/navigation"
import WorkspaceProvider from "providers/workspace-provider"

interface AppLayoutProps {
    children: React.ReactNode
}

export default async function AppLayout({ children }: AppLayoutProps) {

    const session = await auth();
    if (!session?.user?.id) return redirect('/app/login');
    const userId = session.user.id;

    const workspace = await workspaceService.getDefaultWorkspaceByUserId(userId);
    if (!workspace) return redirect('/app/onboarding');
    return <>
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
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink>
                                            {workspace.name}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>

                    <div className="flex-1 space-y-4 p-4 pt-0">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </WorkspaceProvider>
    </>
}