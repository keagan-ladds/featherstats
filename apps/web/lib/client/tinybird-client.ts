

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
}

export default new TinybirdClient();
