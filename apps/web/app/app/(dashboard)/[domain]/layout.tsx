import { tinybirdClient } from "lib/tinybird/server";
import { AnalyticsProvider } from "providers/analytics-provider";

interface AnalyticsLayoutProps {
    children: React.ReactNode,
    params: Promise<{ domain: string }>
}

export default async function AnalyticsLayout({ children, params }: AnalyticsLayoutProps) {
    const domain = (await params).domain;
    // TODO: later we can get this from a service that gets all the details + validate that the user has access to the specified domain
    const token = tinybirdClient.generateToken('featherstats', domain);

    return <>
        <AnalyticsProvider token={token}>
            {children}
        </AnalyticsProvider>

    </>
}