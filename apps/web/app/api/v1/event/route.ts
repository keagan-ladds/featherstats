import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { AnalyticsEvent } from '@repo/analytics-client';
import { cleanReferrer, getClientIP, getLocationFromIP, parseUserAgent } from 'lib/analytics-utils';
import tinybirdClient from 'lib/client/tinybird-client';

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
        const location = process.env.NODE_ENV === 'development' ? null : await getLocationFromIP(ip);
        const userAgent = headersList.get('user-agent');
        const host = headersList.get('origin');

        const payload = {
            ip: anonymizedIp,
            userAgent: userAgent,
            referrer: cleanReferrer(headersList.get('referer')),
            ...parseUserAgent(userAgent),
            ...location
        };

        const appId = 'featherstats';

        const eventsWithClientInfo = events.map(event => ({
            ...event,
            host: host,
            appId: appId,
            payload: {
                ...payload,
                ...event.payload
            }
        }));

        tinybirdClient.publishEvents('analytics_events', eventsWithClientInfo);

    } catch (error) {
        console.error('Error processing telemetry:', error);
    }

    return NextResponse.json({});
}