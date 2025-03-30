import DashboardLayout from "components/analytics/dashboard-layout";
import AnalyticsIntegrationDialog from "components/dialog/domain-integrate-dialog";
import { auth } from "lib/auth";
import { tinybirdClient } from "lib/tinybird/server";
import { notFound } from "next/navigation";
import { AnalyticsProvider } from "providers/analytics-provider";
import DomainProvider from "providers/domain-provider";
import { workspaceService } from "services/workspace.service";

interface AnalyticsLayoutProps {
    children: React.ReactNode,
    params: Promise<{ domain: string }>
}

export default async function AnalyticsLayout({ children, params }: AnalyticsLayoutProps) {
    const domainName = (await params).domain;
    const session = await auth();
    const domain = await workspaceService.getWorkspaceDomainByName(domainName, session?.user?.id || '');

    if (!domain) return notFound();

    async function refreshToken(): Promise<string> {
        'use server'
        return tinybirdClient.generateAnalyticsToken(domain!.workspaceId, domain!.name);
    }

    const token = await refreshToken();

    return <>
        <DomainProvider domain={domain}>
            <AnalyticsProvider token={token} refreshToken={refreshToken}>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
                <AnalyticsIntegrationDialog trackingId={domain.key} />
            </AnalyticsProvider>
        </DomainProvider>
    </>
}