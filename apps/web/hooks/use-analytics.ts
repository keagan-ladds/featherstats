'use client'

import { AnalyticsContext } from "providers/analytics-provider"
import { useCallback, useContext, useMemo, useState } from "react"
import { TopLocationsData } from "@repo/ui/types/analytics"

export interface TopPagesResponse {
    data: {
        pathname: string,
        visits: number;
        hits: number
    }[]
}

export interface AnalyticsDataState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function useAnalytics() {
    const context = useContext(AnalyticsContext);
    if (!context) throw new Error("The 'useAnalytics' hook should only be used within an AnalyticsProvider context");


    const [dateRange, setDateRange] = useState({
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date()
    });

    const [topLocationsState, setTopLocationsState] = useState<AnalyticsDataState<TopLocationsData>>({ data: null, loading: false, error: null })


    const topLocations = useMemo(() => ({
        ...topLocationsState,
        setData: (data: TopLocationsData) => setTopLocationsState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setTopLocationsState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setTopLocationsState(prev => ({ ...prev, error }))
    }), [topLocationsState])

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



    const fetchTopLocations = useCallback(async () => {
        topLocations.setLoading(true);
        const response = await fetch(`${context.baseUrl}/v0/pipes/top_locations.json?limit=10`, {
            headers: {
                Authorization: 'Bearer ' + context.token
            }
        });

        const responseData = await response.json() as {
            data: TopLocationsData
        };

        topLocations.setData(responseData.data);
        topLocations.setLoading(false);
    }, [topLocations, dateRange])

    const refreshAllData = useCallback(() => {
        fetchTopLocations();
        
    }, [fetchTopLocations])

    return {
        fetchTopPages,
        refreshAllData,
        topPagesData,
        loading,
        topLocations
    }
}