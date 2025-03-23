'use client'

import { addDays } from "date-fns/addDays";
import { AnalyticsDataState } from "hooks/use-analytics";
import { createContext, useCallback, useMemo, useState } from "react";
import { BrowserDetailsData, CountryDetailsData, DeviceDetailsData, KeyMetricsData, OsDetailsData, SourceDetailsData, BrowserSummaryData, DeviceSummaryData, CountrySummaryData, OperatingSystemSummaryData, PageSummaryData, CitySummaryData, SourceSummaryData, ChannelSummaryData, ChannelDetailsData, CityDetailsData, PageDetailsData } from "types/analytics";

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
    pageSummary: AnalyticsData<PageSummaryData>;
    countrySummary: AnalyticsData<CountrySummaryData>
    sourceSummary: AnalyticsData<SourceSummaryData>
    channelSummary: AnalyticsData<ChannelSummaryData>
    deviceSummary: AnalyticsData<DeviceSummaryData>
    browserSummary: AnalyticsData<BrowserSummaryData>
    osSummary: AnalyticsData<OperatingSystemSummaryData>;
    pageDetails: AnalyticsData<PageDetailsData>,
    sourceDetails: AnalyticsData<SourceDetailsData>
    channelDetails: AnalyticsData<ChannelDetailsData>
    deviceDetails: AnalyticsData<DeviceDetailsData>
    browserDetails: AnalyticsData<BrowserDetailsData>
    operatingSystemDetails: AnalyticsData<OsDetailsData>
    countryDetails: AnalyticsData<CountryDetailsData>
    cityDetails: AnalyticsData<CityDetailsData>
    citySummary: AnalyticsData<CitySummaryData>
    dateRange: AnalyticsDateRange
    setDateRange: (dateRange: AnalyticsDateRange) => void;
    refreshToken: () => Promise<string>
}

interface AnalyticsProviderProps {
    children: React.ReactNode
    token: string
    refreshToken: () => Promise<string>
}


function defineAnalyticsDataState<T extends any[]>() {
    const [dataState, setDataState] = useState<AnalyticsDataState<T>>({ data: [] as unknown as T, loading: false, error: null })

    const analyticsData = useMemo(() => ({
        ...dataState,
        setData: (data: T) => setDataState(prev => ({ ...prev, data })),
        setLoading: (loading: boolean) => setDataState(prev => ({ ...prev, loading })),
        setError: (error: Error | null) => setDataState(prev => ({ ...prev, error }))
    }), [dataState])

    return { analyticsData }
}

export const AnalyticsContext = createContext<AnalyticsContext | null>(null)

export function AnalyticsProvider({ children, ...props }: AnalyticsProviderProps) {

    const [token, setToken] = useState<string>(props.token);
    const [dateRange, setDateRange] = useState({
        start: addDays(new Date(), -7),
        end: new Date()
    });

    const {analyticsData: keyMetrics} = defineAnalyticsDataState<KeyMetricsData>();
    const {analyticsData: topPages} = defineAnalyticsDataState<PageSummaryData>();
    const {analyticsData: countrySummary} = defineAnalyticsDataState<CountrySummaryData>();
    const {analyticsData: citySummary} = defineAnalyticsDataState<CitySummaryData>();
    const {analyticsData: topSources} = defineAnalyticsDataState<SourceSummaryData>()
    const {analyticsData: deviceSummary} = defineAnalyticsDataState<DeviceSummaryData>()
    const {analyticsData: browserSummary} = defineAnalyticsDataState<BrowserSummaryData>()
    const {analyticsData: osSummary} = defineAnalyticsDataState<OperatingSystemSummaryData>()
    const {analyticsData: pageDetails} = defineAnalyticsDataState<PageDetailsData>()
    const {analyticsData: sourceDetails} = defineAnalyticsDataState<SourceDetailsData>()
    const {analyticsData: channelDetails} = defineAnalyticsDataState<ChannelDetailsData>()
    const {analyticsData: channelSummary} = defineAnalyticsDataState<ChannelSummaryData>()
    const {analyticsData: deviceDetails} = defineAnalyticsDataState<DeviceDetailsData>()
    const {analyticsData: browserDetails} = defineAnalyticsDataState<BrowserDetailsData>();
    const {analyticsData: operatingSystemDetails} = defineAnalyticsDataState<OsDetailsData>();
    const {analyticsData: countryDetails} = defineAnalyticsDataState<CountryDetailsData>();
    const {analyticsData: cityDetails} = defineAnalyticsDataState<CityDetailsData>();

    const refreshToken = useCallback(async () => {
        const newToken = await props.refreshToken();
        setToken(newToken)
        return newToken
    }, [token])

    const context: AnalyticsContext = {
        baseUrl: "https://api.tinybird.co",
        token,
        keyMetrics,
        pageSummary: topPages,
        sourceSummary: topSources,
        channelSummary,
        countrySummary,
        citySummary, 
        deviceSummary,
        browserSummary,
        osSummary: osSummary,
        pageDetails,
        sourceDetails,
        channelDetails,
        dateRange,
        deviceDetails,
        browserDetails,
        operatingSystemDetails,
        countryDetails,
        cityDetails,
        setDateRange,
        refreshToken
    }

    return <>
        <AnalyticsContext.Provider value={context}>
            {children}
        </AnalyticsContext.Provider>
    </>
}