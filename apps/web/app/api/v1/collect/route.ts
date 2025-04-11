import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { AnalyticsEvent } from '@repo/analytics-client';
import { getClientIP, parseUserAgent } from 'lib/analytics-utils';
import tinybirdClient from 'lib/client/tinybird-client';
import { geolocation } from '@vercel/functions';
import { workspaceService } from 'services/workspace.service';
import { usageService } from 'services/usage.service';
import logger from 'lib/logger';

export async function POST(request: NextRequest) {
    try {
        const headersList = await headers();
        const apiKey = headersList.get('X-Api-Key');

        if (!apiKey) return new NextResponse(null, { status: 401 });
        const domain = await workspaceService.getWorkspaceDomainByKey(apiKey);
        if (!domain) return new NextResponse(null, { status: 401 });
        if (!domain.subscriptionId) return new NextResponse("No active subscription", { status: 400 });

        const { shouldRateLimit, message } = await usageService.trackUsage(domain.subscriptionId);
        if (shouldRateLimit) return new NextResponse(message, { status: 429 });

        const { events } = await request.json() as { events: AnalyticsEvent[] };

        if (!Array.isArray(events) || events.length === 0) {
            return NextResponse.json(
                { error: 'Invalid events data' },
                { status: 200 }
            );
        }

        const { ip, anonymizedIp } = getClientIP(headersList);
        const location = geolocation(request);
        const userAgent = headersList.get('user-agent');
        const origin = headersList.get('origin');

        const payload = {
            ip: anonymizedIp,
            userAgent: userAgent,
            country: location.country,
            city: location.city,
            region: location.countryRegion,
            ...parseUserAgent(userAgent),
        };

        const workspaceId = domain.workspaceId;
        const domainName = domain.name;

        const eventsWithClientInfo = events.map(event => ({
            ...event,
            timestamp: event.timestamp || new Date().toISOString(),
            domainName: domainName,
            workspaceId: workspaceId,
            payload: {
                ...payload,
                ...event.payload
            }
        }));

        await tinybirdClient.publishEvents('analytics_events', eventsWithClientInfo);

    } catch (error) {
        logger.error(error, 'Error processing telemetry');
    }

    return NextResponse.json({});
}