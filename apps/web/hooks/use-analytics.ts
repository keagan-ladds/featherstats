'use client'

import { AnalyticsContext } from "providers/analytics-provider"
import { useCallback, useContext, useMemo, useState } from "react"
import { KeyMetricsData, TopLocationsData, TopPagesData, TopSourcesData } from "@repo/ui/types/analytics"
import { formatISO } from 'date-fns'


export interface AnalyticsDataState<T> {
    data: T;
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

    const dateRangeQuery = `date_from=${formatISO(dateRange.start, { representation: "date" })}&date_to=${formatISO(dateRange.end, { representation: "date" })}`;

    const [metricsState, setMetricsState] = useState<AnalyticsDataState<KeyMetricsData>>({ data: [], loading: false, error: null })
    const [topLocationsState, setTopLocationsState] = useState<AnalyticsDataState<TopLocationsData>>({ data: [], loading: false, error: null })
    const [topPagesState, setTopPagesState] = useState<AnalyticsDataState<TopPagesData>>({ data: [], loading: false, error: null })
    const [topSourcesState, setTopSourcesState] = useState<AnalyticsDataState<TopSourcesData>>({ data: [], loading: false, error: null })

    const keyMetrics = useMemo(() => ({
        ...metricsState,
        setData: (data: KeyMetricsData) => setMetricsState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setMetricsState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setMetricsState(prev => ({ ...prev, error }))
    }), [metricsState])

    const topLocations = useMemo(() => ({
        ...topLocationsState,
        setData: (data: TopLocationsData) => setTopLocationsState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setTopLocationsState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setTopLocationsState(prev => ({ ...prev, error }))
    }), [topLocationsState])

    const topPages = useMemo(() => ({
        ...topPagesState,
        setData: (data: TopPagesData) => setTopPagesState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setTopPagesState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setTopPagesState(prev => ({ ...prev, error }))
    }), [topPagesState])

    const topSources = useMemo(() => ({
        ...topSourcesState,
        setData: (data: TopSourcesData) => setTopSourcesState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setTopSourcesState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setTopSourcesState(prev => ({ ...prev, error }))
    }), [topSourcesState])

    const fetchKeyMetrics = useCallback(async () => {

        keyMetrics.setLoading(true);
        const response = await fetch(`${context.baseUrl}/v0/pipes/key_metrics.json?${dateRangeQuery}`, {
            headers: {
                Authorization: 'Bearer ' + context.token
            }
        });

        const responseData = await response.json() as {
            data: KeyMetricsData
        };

        keyMetrics.setData(responseData.data);
        keyMetrics.setLoading(false);
    }, [dateRange, keyMetrics])

    const fetchTopLocations = useCallback(async () => {
        topLocations.setLoading(true);
        const response = await fetch(`${context.baseUrl}/v0/pipes/top_locations.json?limit=10&${dateRangeQuery}`, {
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


    const fetchTopPages = useCallback(async () => {
        topPages.setLoading(true);
        const response = await fetch(`${context.baseUrl}/v0/pipes/top_pages.json?limit=10&${dateRangeQuery}`, {
            headers: {
                Authorization: 'Bearer ' + context.token
            }
        });

        const responseData = await response.json() as {
            data: TopPagesData
        };

        topPages.setData(responseData.data);
        topPages.setLoading(false);
    }, [dateRange, topPages])

    const fetchTopSources = useCallback(async () => {
        topSources.setLoading(true);
        const response = await fetch(`${context.baseUrl}/v0/pipes/top_sources.json?limit=10&${dateRangeQuery}`, {
            headers: {
                Authorization: 'Bearer ' + context.token
            }
        });

        const responseData = await response.json() as {
            data: TopSourcesData
        };

        topSources.setData(responseData.data);
        topSources.setLoading(false);
    }, [dateRange, topSources])

    const refreshAllData = useCallback(() => {
        fetchKeyMetrics();
        fetchTopLocations();
        fetchTopPages();
        fetchTopSources();

    }, [fetchTopLocations, fetchKeyMetrics, fetchTopPages, fetchTopSources])

    return {
        setDateRange,
        refreshAllData,
        topPages,
        topSources,
        keyMetrics,
        topLocations,
        dateRange,
    }
}