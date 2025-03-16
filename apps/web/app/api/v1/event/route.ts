import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { AnalyticsEvent } from '@repo/analytics-client';
import { getClientIP, parseUserAgent } from 'lib/analytics-utils';
import tinybirdClient from 'lib/client/tinybird-client';
import { geolocation } from '@vercel/functions';

export async function POST(request: Request) {
    try {
        const headersList = await headers();
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
        let hostname = '';
        if (origin) {
            var url = new URL(origin);
            hostname = url.hostname;
        }
        

        const payload = {
            ip: anonymizedIp,
            userAgent: userAgent,
            country: location.country,
            city: location.city,
            region: location.countryRegion,
            ...parseUserAgent(userAgent),
        };

        const appId = 'featherstats';

        const eventsWithClientInfo = events.map(event => ({
            ...event,
            host: hostname,
            domain_name: hostname,
            workspace_id: appId,
            appId: appId,
            payload: {
                ...payload,
                ...event.payload
            }
        }));

        await tinybirdClient.publishEvents('analytics_events', eventsWithClientInfo);

    } catch (error) {
        console.error('Error processing telemetry:', error);
    }

    return NextResponse.json({});
}