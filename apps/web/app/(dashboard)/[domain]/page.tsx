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
import ClarityModeTooltip from "components/clarity-mode/clarity-tooltip";
import useAppShell from "hooks/use-app-shell";

export default function DomainDashboardPage() {
    const {setPageTitle} = useAppShell()
    const analytics = useAnalytics();
    const { countrySummary, citySummary, sourceSummary, channelSummary, deviceSummary, browserSummary, osSummary, pageSummary, dateRange } = analytics;
    const { fetchKeyMetrics, fetchPageSummary, fetchSourceSummary, fetchChannelSummary, fetchCountrySummary, fetchCitySummary, fetchDeviceSummary, fetchBrowserSummary, fetchOsSummary } = analytics;

    const locationSummaryTabs = useMemo(() => {
        return {
            countries: {
                title: <div className="flex items-center gap-2">Top Countries <ClarityModeTooltip content="See where your visitors are coming from! This shows the countries that generate the most traffic to your site. Understanding your audience's location helps with localization, marketing, and content strategies."/></div>,
                triggerText: 'Countries',
                content: <CountrySummaryTable {...countrySummary} />
            },
            cities: {
                title: <div className="flex items-center gap-2">Top Cities <ClarityModeTooltip content="Drill down into specific cities where your visitors are located. This can help you target regional marketing campaigns or understand where demand for your content or services is highest."/></div>,
                triggerText: 'Cities',
                content: <CitySummaryTable {...citySummary} />
            }
        }
    }, [countrySummary, citySummary])

    const sourceSummaryTabs = useMemo(() => {
        return {
            sources: {
                title: <div className="flex items-center gap-2">Top Sources <ClarityModeTooltip content="A 'source' is where your visitors were before they landed on your website. Common sources include search engines (like Google), social media (like Facebook), or other websites linking to yours."/></div>,
                triggerText: 'Sources',
                content: <SourceSummaryTable {...sourceSummary} />
            },
            channels: {
                title: <div className="flex items-center gap-2">Top Channels <ClarityModeTooltip content="A 'channel' groups similar sources together to help you understand where your traffic is coming from at a higher level."/></div>,
                triggerText: 'Channels',
                content: <ChannelSummaryTable {...channelSummary} />
            }
        }
    }, [sourceSummary, channelSummary]);

    const pageSummaryTabs = useMemo(() => {
        return {
            pages: {
                title: <div className="flex items-center gap-2">Top Pages <ClarityModeTooltip content="These are the most visited pages on your site. Understanding which pages attract the most traffic can help you improve popular content and optimize underperforming pages."/></div>,
                triggerText: 'Pages',
                content: <PageSummaryTable {...pageSummary} />
            }
        }
    }, [pageSummary])

    const deviceSummaryTabs = useMemo(() => {
        return {
            device: {
                title: <div className="flex items-center gap-2">Top Device <ClarityModeTooltip content="See which types of devices (mobile, desktop, tablet) your visitors use. A high percentage of mobile users might indicate a need for mobile-friendly design and optimization."/></div>,
                triggerText: 'Device',
                content: <DeviceSummaryTable {...deviceSummary} />
            },
            browser: {
                title: <div className="flex items-center gap-2">Top Browsers <ClarityModeTooltip content="Find out which web browsers (like Chrome, Safari, or Firefox) your visitors use. Ensuring compatibility with the most popular browsers helps improve the user experience on your site."/></div>,
                triggerText: 'Browsers',
                content: <BrowserSummaryTable {...browserSummary} />
            },
            os: {
                title: <div className="flex items-center gap-2">Top Operating Systems <ClarityModeTooltip content="Check which operating systems (Windows, macOS, iOS, Android) your visitors use. This can be useful for optimizing your site's performance across different platforms."/></div>,
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

    useEffect(() => {
        setPageTitle("")
    }, [])

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