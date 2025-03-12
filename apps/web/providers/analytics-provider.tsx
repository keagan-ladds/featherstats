'use client'

import { TopSourcesData } from "@repo/ui/types/analytics";
import { addDays } from "date-fns/addDays";
import { AnalyticsDataState } from "hooks/use-analytics";
import { createContext, useMemo, useState } from "react";
import { KeyMetricsData, SourceDetailsData, TopBrowsersData, TopDevicesData, TopLocationsData, TopOperatingSystemsData, TopPagesData } from "types/analytics";

export interface AnalyticsData<T> extends AnalyticsDataState<T> {
    setData: (data: T) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: Error | null) => void;
}

export interface AnalyticsDateRange {
    start: Date;
    end: Date
}

interface AnalyticsContext {
    baseUrl: string;
    token: string;
    keyMetrics: AnalyticsData<KeyMetricsData>
    topPages: AnalyticsData<TopPagesData>;
    topLocations: AnalyticsData<TopLocationsData>
    topSources: AnalyticsData<TopSourcesData>
    topDevices: AnalyticsData<TopDevicesData>
    topBrowsers: AnalyticsData<TopBrowsersData>
    topOperatingSystems: AnalyticsData<TopOperatingSystemsData>;
    sourceDetails: AnalyticsData<SourceDetailsData>
    dateRange: AnalyticsDateRange
    setDateRange: (dateRange: AnalyticsDateRange) => void;

}

interface AnalyticsProviderProps {
    children: React.ReactNode
    token: string
}



export const AnalyticsContext = createContext<AnalyticsContext | null>(null)

export function AnalyticsProvider({ children, token }: AnalyticsProviderProps) {

    const [topLocationsState, setTopLocationsState] = useState<AnalyticsDataState<TopLocationsData>>({ data: [], loading: false, error: null })
    const [topPagesState, setTopPagesState] = useState<AnalyticsDataState<TopPagesData>>({ data: [], loading: false, error: null })
    const [topSourcesState, setTopSourcesState] = useState<AnalyticsDataState<TopSourcesData>>({ data: [], loading: false, error: null })
    const [topDevicesState, setTopDevicesState] = useState<AnalyticsDataState<TopDevicesData>>({ data: [], loading: false, error: null })
    const [topBrowsersState, setTopBrowsersState] = useState<AnalyticsDataState<TopBrowsersData>>({ data: [], loading: false, error: null })
    const [topOperatingSystemsState, setTopOperatingSystemsState] = useState<AnalyticsDataState<TopOperatingSystemsData>>({ data: [], loading: false, error: null })
    const [metricsState, setMetricsState] = useState<AnalyticsDataState<KeyMetricsData>>({ data: [], loading: false, error: null })
    const [sourceDetailsState, setSourceDetailsState] = useState<AnalyticsDataState<SourceDetailsData>>({ data: [], loading: false, error: null })

    const [dateRange, setDateRange] = useState({
        start: addDays(new Date(), -7),
        end: new Date()
    });

    const keyMetrics = useMemo(() => ({
        ...metricsState,
        setData: (data: KeyMetricsData) => setMetricsState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setMetricsState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setMetricsState(prev => ({ ...prev, error }))
    }), [metricsState])


    const topPages = useMemo(() => ({
        ...topPagesState,
        setData: (data: TopPagesData) => setTopPagesState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setTopPagesState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setTopPagesState(prev => ({ ...prev, error }))
    }), [topPagesState])

    const topLocations = useMemo(() => ({
        ...topLocationsState,
        setData: (data: TopLocationsData) => setTopLocationsState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setTopLocationsState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setTopLocationsState(prev => ({ ...prev, error }))
    }), [topLocationsState])

    const topSources = useMemo(() => ({
        ...topSourcesState,
        setData: (data: TopSourcesData) => setTopSourcesState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setTopSourcesState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setTopSourcesState(prev => ({ ...prev, error }))
    }), [topSourcesState])

    const topDevices = useMemo(() => ({
        ...topDevicesState,
        setData: (data: TopDevicesData) => setTopDevicesState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setTopDevicesState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setTopDevicesState(prev => ({ ...prev, error }))
    }), [topDevicesState])

    const topBrowsers = useMemo(() => ({
        ...topBrowsersState,
        setData: (data: TopBrowsersData) => setTopBrowsersState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setTopBrowsersState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setTopBrowsersState(prev => ({ ...prev, error }))
    }), [topBrowsersState])

    const topOperatingSystems = useMemo(() => ({
        ...topOperatingSystemsState,
        setData: (data: TopOperatingSystemsData) => setTopOperatingSystemsState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setTopOperatingSystemsState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setTopOperatingSystemsState(prev => ({ ...prev, error }))
    }), [topOperatingSystemsState])

    const sourceDetails = useMemo(() => ({
        ...sourceDetailsState,
        setData: (data: SourceDetailsData) => setSourceDetailsState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setSourceDetailsState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setSourceDetailsState(prev => ({ ...prev, error }))
    }), [sourceDetailsState])

    const context: AnalyticsContext = {
        baseUrl: "https://api.tinybird.co",
        token,
        keyMetrics,
        topPages,
        topSources,
        topLocations,
        topDevices,
        topBrowsers,
        topOperatingSystems,
        sourceDetails,
        dateRange,
        setDateRange
    }

    return <>
        <AnalyticsContext.Provider value={context}>
            {children}
        </AnalyticsContext.Provider>
    </>
}