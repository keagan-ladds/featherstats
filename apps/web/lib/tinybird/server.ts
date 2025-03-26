import { formatISO } from "date-fns";
import jwt from "jsonwebtoken";
import { UsageSummaryData } from "types/usage";

const TINYBIRD_SIGNING_TOKEN = process.env.TINYBIRD_SIGNING_TOKEN ?? "";
const WORKSPACE_ID = process.env.TINYBIRD_WORKSPACE ?? "";

export class TinybirdClient {
    private readonly baseUrl: string = 'https://api.tinybird.co';
    private readonly token: string;

    constructor() {
        if (!process.env.TINYBIRD_API_TOKEN) {
            throw new Error("Tinybird API Token no configured")
        }

        this.token = process.env.TINYBIRD_API_TOKEN;
    }

    public publishEvents(eventName: string, events: Object[]): Promise<void> {
        const ndjsonData = events.map(event => JSON.stringify(event)).join('\n');

        return fetch(`${this.baseUrl}/v0/events?name=${eventName}`, {
            method: 'POST',
            body: ndjsonData,
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/x-ndjson'
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to publish events: ${res.statusText}`);
                }
                return res.json();
            });
    }

    public async getUsageSummary(workspaceId: string, from: Date, to: Date): Promise<UsageSummaryData> {
        const fromQueryParam = `${encodeURIComponent(formatISO(from, { representation: "date" }))}`;
        const toQueryParam = `${encodeURIComponent(formatISO(to, { representation: "date" }))}`;
        const dateRangeQuery = `from=${fromQueryParam}&to=${toQueryParam}`;
        const token = this.generateUsageToken(workspaceId);

        const response = await fetch(`${this.baseUrl}/v0/pipes/usage_summary.json?${dateRangeQuery}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        if (!response.ok) throw new Error("Could not get usage summary data from Tinybird.");

        const responseData = await response.json() as {
            data: UsageSummaryData
        };

        return responseData.data;
    }

    private generateUsageToken(workspaceId: string) {
        const next10minutes = new Date();
        next10minutes.setTime(next10minutes.getTime() + 1000 * 60 * 10);

        const pipes = [
            "usage_summary",
        ]

        const payload = {
            workspace_id: WORKSPACE_ID,
            name: "usage_jwt",
            exp: Math.floor(next10minutes.getTime() / 1000),
            scopes: [
                ...pipes.map(pipe => ({
                    type: "PIPES:READ",
                    resource: pipe,
                    fixed_params: {
                        "workspace_id": workspaceId
                    }
                }))
            ],
        };

        return jwt.sign(payload, TINYBIRD_SIGNING_TOKEN, { noTimestamp: true });
    }

    public generateAnalyticsToken(workspaceId: string, hostName: string) {
        const next10minutes = new Date();
        next10minutes.setTime(next10minutes.getTime() + 1000 * 60 * 10);

        const pipes = [
            "key_metrics",
            "page_summary",
            "country_summary",
            "city_summary",
            "source_summary",
            "channel_summary",
            "device_summary",
            "browser_summary",
            "os_summary",
            "page_details",
            "source_details",
            "channel_details",
            "device_details",
            "browser_details",
            "os_details",
            "country_details",
            "city_details"
        ]

        const payload = {
            workspace_id: WORKSPACE_ID,
            name: "my_demo_jwt",
            exp: Math.floor(next10minutes.getTime() / 1000),
            scopes: [
                ...pipes.map(pipe => ({
                    type: "PIPES:READ",
                    resource: pipe,
                    fixed_params: {
                        "workspace_id": workspaceId,
                        "domain_name": hostName
                    }
                }))
            ],
        };

        return jwt.sign(payload, TINYBIRD_SIGNING_TOKEN, { noTimestamp: true });
    }
}

export const tinybirdClient = new TinybirdClient();
