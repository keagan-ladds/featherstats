import { PlanUsageLimit } from "@featherstats/database/types";

export type UsageSummaryData = {
    date: Date;
    workspace_id: string;
    visits: number;
    pageviews: number;
}[]

export type UsageTrackResult = {
    shouldRateLimit: boolean;
    shouldBlock?: boolean;
    message?: string
    error?: any
}

export type SubscriptionUsage = {
    from: Date,
    to: Date,
    periodUsage: {
        pageviews: number
        visits: number
    },
    dailyUsage: {
        pageviews: number
        visits: number
    },
    usageLimits: PlanUsageLimit;
    dailyPageviewSoftlimit: number;
    workspaces: number
}