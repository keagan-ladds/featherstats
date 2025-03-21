import jwt from "jsonwebtoken";

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

    public generateToken(workspaceId: string, hostName: string) {
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
