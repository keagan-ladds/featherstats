'use client'

import { AnalyticsContext, AnalyticsData } from "providers/analytics-provider"
import { useCallback, useContext } from "react"
import { formatISO } from 'date-fns'
import { BrowserDetailsData, CountryDetailsData, DeviceDetailsData, OsDetailsData, SourceDetailsData, BrowserSummaryData, DeviceSummaryData, PageSummaryData, CountrySummaryData, KeyMetricsData, SourceSummaryData, OperatingSystemSummaryData, CitySummaryData, ChannelSummaryData, ChannelDetailsData, CityDetailsData, PageDetailsData } from "types/analytics"


export interface AnalyticsDataState<T> {
    data: T;
    loading: boolean;
    error: Error | null;
}

export function useAnalytics() {
    const context = useContext(AnalyticsContext);
    if (!context) throw new Error("The 'useAnalytics' hook should only be used within an AnalyticsProvider context");

    const { dateRange, setDateRange, keyMetrics, pageSummary, deviceSummary, browserSummary, osSummary, sourceDetails, channelDetails, deviceDetails, browserDetails, operatingSystemDetails, countryDetails } = context;

    const { sourceSummary, channelSummary } = context;
    const { countrySummary, citySummary, cityDetails } = context;

    const dateRangeQuery = `date_from=${formatISO(dateRange.start, { representation: "date" })}&date_to=${formatISO(dateRange.end, { representation: "date" })}`;


    

    function fetchAnalyticsData<T>(data: AnalyticsData<T>, pipe: string) {
        return useCallback(async () => {
            data.setLoading(true);
            let response = await fetch(`${context!.baseUrl}/v0/pipes/${pipe}.json?${dateRangeQuery}`, {
                headers: {
                    Authorization: 'Bearer ' + context!.token
                }
            });

            // If we get a 403, it's likely that the token has expired so refresh and retry
            if (response.status == 403) {
                const token = await context!.refreshToken();
                response = await fetch(`${context!.baseUrl}/v0/pipes/${pipe}.json?${dateRangeQuery}`, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
            }

            if (response.ok) {
                const responseData = await response.json() as {
                    data: T
                };

                data.setData(responseData.data);
            }

            data.setLoading(false);
        }, [dateRange])
    }

    const fetchKeyMetrics = fetchAnalyticsData<KeyMetricsData>(context.keyMetrics, "key_metrics")
    const fetchPageSummary = fetchAnalyticsData<PageSummaryData>(context.pageSummary, "page_summary");
    const fetchSourceSummary = fetchAnalyticsData<SourceSummaryData>(context.sourceSummary, "source_summary");
    const fetchChannelSummary = fetchAnalyticsData<ChannelSummaryData>(context.channelSummary, "channel_summary");
    const fetchDeviceSummary = fetchAnalyticsData<DeviceSummaryData>(context.deviceSummary, "device_summary");
    const fetchBrowserSummary = fetchAnalyticsData<BrowserSummaryData>(context.browserSummary, "browser_summary");
    const fetchOsSummary = fetchAnalyticsData<OperatingSystemSummaryData>(context.osSummary, "os_summary");
    const fetchCountrySummary = fetchAnalyticsData<CountrySummaryData>(context.countrySummary, "country_summary");
    const fetchCitySummary = fetchAnalyticsData<CitySummaryData>(context.citySummary, "city_summary");

    const fetchPageDetails = fetchAnalyticsData<PageDetailsData>(context.pageDetails, "page_details");
    const fetchSourceDetails = fetchAnalyticsData<SourceDetailsData>(context.sourceDetails, "source_details");
    const fetchChannelDetails = fetchAnalyticsData<ChannelDetailsData>(context.channelDetails, "channel_details");
    const fetchDeviceDetails = fetchAnalyticsData<DeviceDetailsData>(context.deviceDetails, "device_details");
    const fetchBrowserDetails = fetchAnalyticsData<BrowserDetailsData>(context.browserDetails, "browser_details");
    const fetchOsDetails = fetchAnalyticsData<OsDetailsData>(operatingSystemDetails, "os_details");
    const fetchCountryDetails = fetchAnalyticsData<CountryDetailsData>(countryDetails, "country_details");
    const fetchCityDetails = fetchAnalyticsData<CityDetailsData>(context.cityDetails, "city_details");

    const refreshSourceDetailsData = useCallback(() => {
        fetchSourceDetails();
    }, [dateRange, fetchSourceDetails])

    const refreshDeviceDetails = useCallback(() => {
        fetchDeviceDetails()
    }, [dateRange, fetchDeviceDetails])

    const refreshBrowserDetails = useCallback(() => {
        fetchBrowserDetails();
    }, [dateRange, fetchBrowserDetails])

    const refreshOperatingSystemDetails = useCallback(() => {
        fetchOsDetails();
    }, [dateRange, fetchOsDetails])

    const refreshCountryDetails = useCallback(() => {
        fetchCountryDetails();
    }, [dateRange, fetchCountryDetails])

    return {
        setDateRange,
        fetchKeyMetrics,
        fetchPageSummary,
        fetchSourceSummary,
        fetchChannelSummary,
        fetchDeviceSummary,
        fetchBrowserSummary,
        fetchOsSummary,
        fetchCountrySummary,
        fetchCitySummary,
        fetchPageDetails,
        fetchChannelDetails,
        refreshSourceDetailsData,
        refreshDeviceDetails,
        refreshBrowserDetails,
        refreshOperatingSystemDetails,
        refreshCountryDetails,
        fetchCityDetails,
        keyMetrics,
        pageSummary,
        sourceSummary,
        channelSummary,
        countrySummary,
        citySummary,
        dateRange,
        deviceSummary,
        browserSummary,
        osSummary,
        pageDetails: context.pageDetails,
        sourceDetails,
        channelDetails,
        deviceDetails,
        browserDetails,
        operatingSystemDetails,
        countryDetails,
        cityDetails,
    }
}