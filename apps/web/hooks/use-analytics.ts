'use client'

import { AnalyticsContext } from "providers/analytics-provider"
import { useCallback, useContext, useMemo, useState } from "react"
import { KeyMetricsData, TopLocationsData, TopPagesData, TopSourcesData } from "@repo/ui/types/analytics"
import { formatISO } from 'date-fns'
import { TopBrowsersData, TopDevicesData } from "types/analytics"


export interface AnalyticsDataState<T> {
    data: T;
    loading: boolean;
    error: Error | null;
}

export function useAnalytics() {
    const context = useContext(AnalyticsContext);
    if (!context) throw new Error("The 'useAnalytics' hook should only be used within an AnalyticsProvider context");

    const {dateRange, setDateRange, keyMetrics, topLocations, topPages, topSources, topDevices, topBrowsers, topOperatingSystems} = context;
    

    const dateRangeQuery = `date_from=${formatISO(dateRange.start, { representation: "date" })}&date_to=${formatISO(dateRange.end, { representation: "date" })}`;

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

    const fetchTopDevices = useCallback(async () => {
        topDevices.setLoading(true);
        const response = await fetch(`${context.baseUrl}/v0/pipes/top_devices.json?limit=10&${dateRangeQuery}`, {
            headers: {
                Authorization: 'Bearer ' + context.token
            }
        });

        const responseData = await response.json() as {
            data: TopDevicesData
        };

        topDevices.setData(responseData.data);
        topDevices.setLoading(false);
    }, [dateRange, topDevices])

    const fetchTopBrowsers = useCallback(async () => {
        topBrowsers.setLoading(true);
        const response = await fetch(`${context.baseUrl}/v0/pipes/top_browsers.json?limit=10&${dateRangeQuery}`, {
            headers: {
                Authorization: 'Bearer ' + context.token
            }
        });

        const responseData = await response.json() as {
            data: TopBrowsersData
        };

        topBrowsers.setData(responseData.data);
        topBrowsers.setLoading(false);
    }, [dateRange, topDevices])

    const refreshAllData = useCallback(() => {
        fetchKeyMetrics();
        fetchTopLocations();
        fetchTopPages();
        fetchTopSources();
        fetchTopDevices();
        fetchTopBrowsers();

    }, [fetchTopLocations, fetchKeyMetrics, fetchTopPages, fetchTopSources, fetchTopDevices, fetchTopBrowsers])

    return {
        setDateRange,
        refreshAllData,
        keyMetrics,
        topPages,
        topSources,
        topLocations,
        dateRange,
        topDevices,
        topBrowsers,
        topOperatingSystems
    }
}