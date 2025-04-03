export type UsageSummaryData = {
    date: Date;
    workspace_id: string;
    visits: number;
    pageviews: number;
}[]

export type UsageTrackResult = {
    shouldRateLimit: boolean
    message?: string
    error?: any
}