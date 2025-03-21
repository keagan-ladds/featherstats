'use client'

import { useAnalytics } from "hooks/use-analytics";
import { useEffect, useMemo, useState } from "react";
import DashboardMetricsCard from "components/analytics/dashboard-metrics-card";
import SummaryCard from "components/analytics/summary-card";
import CountrySummaryTable from "components/analytics/table/country-summary-table";
import CitySummaryTable from "components/analytics/table/city-summary-table";
import SourceSummaryTable from "components/analytics/table/source-summary-table";
import ChannelSummaryTable from "components/analytics/table/channel-summary-table";
import DeviceSummaryTable from "components/analytics/table/device-summary-table";
import BrowserSummaryTable from "components/analytics/table/browser-summary-table";
import OsSummaryTable from "components/analytics/table/os-summary-table";
import PageSummaryTable from "components/analytics/table/page-summary-table";

export default function DomainDashboardPage() {
    const analytics = useAnalytics();
    const { countrySummary, citySummary, sourceSummary, channelSummary, deviceSummary, browserSummary, osSummary, pageSummary, dateRange } = analytics;
    const { fetchKeyMetrics, fetchPageSummary, fetchSourceSummary, fetchChannelSummary, fetchCountrySummary, fetchCitySummary, fetchDeviceSummary, fetchBrowserSummary, fetchOsSummary } = analytics;

    const locationSummaryTabs = useMemo(() => {
        return {
            countries: {
                title: "Top Countries",
                triggerText: 'Countries',
                content: <CountrySummaryTable {...countrySummary} />
            },
            cities: {
                title: "Top Cities",
                triggerText: 'Cities',
                content: <CitySummaryTable {...citySummary} />
            }
        }
    }, [countrySummary, citySummary])

    const sourceSummaryTabs = useMemo(() => {
        return {
            sources: {
                title: "Top Sources",
                triggerText: 'Sources',
                content: <SourceSummaryTable {...sourceSummary} />
            },
            channels: {
                title: "Top Channels",
                triggerText: 'Channels',
                content: <ChannelSummaryTable {...channelSummary} />
            }
        }
    }, [sourceSummary, channelSummary]);

    const pageSummaryTabs = useMemo(() => {
        return {
            pages: {
                title: "Top Pages",
                triggerText: 'Pages',
                content: <PageSummaryTable {...pageSummary} />
            }
        }
    }, [pageSummary])

    const deviceSummaryTabs = useMemo(() => {
        return {
            device: {
                title: "Top Devices",
                triggerText: 'Device',
                content: <DeviceSummaryTable {...deviceSummary} />
            },
            browser: {
                title: "Top Browsers",
                triggerText: 'Browsers',
                content: <BrowserSummaryTable {...browserSummary} />
            },
            os: {
                title: "Top Operating Systems",
                triggerText: 'OS',
                content: <OsSummaryTable {...osSummary} />
            }
        }
    }, [deviceSummary, browserSummary, osSummary])


    type PageSummaryTabs = keyof typeof pageSummaryTabs;
    type SourceSummaryTabs = keyof typeof sourceSummaryTabs;
    type LocationSummaryTabs = keyof typeof locationSummaryTabs;
    type DeviceSummaryTabs = keyof typeof deviceSummaryTabs;

    const [pageSummaryTab, setPageSummaryTab] = useState<PageSummaryTabs>("pages");
    const [sourceSummaryTab, setSourceSummaryTab] = useState<SourceSummaryTabs>("sources");
    const [locationSummaryTab, setLocationSummaryTab] = useState<LocationSummaryTabs>("countries")
    const [deviceSummaryTab, setDeviceSummaryTab] = useState<DeviceSummaryTabs>("device")

    // Always load key metrics & pages summary data
    useEffect(() => {
        fetchKeyMetrics();
        fetchPageSummary();
    }, [dateRange])

    useEffect(() => {
        switch (locationSummaryTab) {
            case "countries":
                fetchCountrySummary();
                break;
            case "cities":
                fetchCitySummary();
                break;
        }

    }, [dateRange, locationSummaryTab]);

    useEffect(() => {
        switch (sourceSummaryTab) {
            case "sources":
                fetchSourceSummary();
                break;
            case "channels":
                fetchChannelSummary();
                break;
        }
    }, [dateRange, sourceSummaryTab])

    useEffect(() => {
        switch (deviceSummaryTab) {
            case "browser":
                fetchBrowserSummary();
                break;
            case "device":
                fetchDeviceSummary();
                break;
            case "os":
                fetchOsSummary();
                break;
        }
    }, [dateRange, deviceSummaryTab])

    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DashboardMetricsCard className="col-span-full" />
            <SummaryCard tabs={locationSummaryTabs} defaultTab={locationSummaryTab} onValueChange={(value) => setLocationSummaryTab(value as LocationSummaryTabs)} />
            <SummaryCard tabs={sourceSummaryTabs} defaultTab={sourceSummaryTab} onValueChange={(value) => setSourceSummaryTab(value as SourceSummaryTabs)}/>
            <SummaryCard tabs={pageSummaryTabs} defaultTab={pageSummaryTab} onValueChange={(value) => setPageSummaryTab(value as PageSummaryTabs)}/>
            <SummaryCard tabs={deviceSummaryTabs} defaultTab={deviceSummaryTab} onValueChange={(value) => setDeviceSummaryTab(value as DeviceSummaryTabs)} />
        </div>
    </>
}