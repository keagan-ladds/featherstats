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

    const token = tinybirdClient.generateToken(domain.workspaceId, domainName);

    return <>
        <DomainProvider domain={domain}>
            <AnalyticsProvider token={token}>
                {children}
            </AnalyticsProvider>
        </DomainProvider>
    </>
}