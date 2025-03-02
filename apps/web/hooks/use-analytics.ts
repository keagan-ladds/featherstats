'use client'

import { AnalyticsContext } from "providers/analytics-provider"
import { useContext, useState } from "react"

export interface TopPagesResponse {
    data: {
        pathname: string,
        visits: number;
        hits: number
    }[]
}

export function useAnalytics() {
    const context = useContext(AnalyticsContext);
    if (!context) throw new Error("The 'useAnalytics' hook should only be used within an AnalyticsProvider context");


    const [topPagesData, setTopPagesData] = useState<TopPagesResponse["data"]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const fetchTopPages = async () => {

        setLoading(true);
        const response = await fetch(`${context.baseUrl}/v0/pipes/top_pages.json?limit=10`, {
            headers: {
                Authorization: 'Bearer ' + context.token
            }
        });

        const data = await response.json() as TopPagesResponse;
        setTopPagesData(data.data);
        setLoading(false);
        return data;
    }

    return {
        fetchTopPages,
        topPagesData,
        loading
    }
}