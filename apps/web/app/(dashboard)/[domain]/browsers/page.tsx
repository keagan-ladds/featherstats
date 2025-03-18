'use client'

import BrowserBounceRateChart from "components/analytics/browser/browser-bounce-rate-chart"
import BrowserDetailsTable from "components/analytics/browser/browser-details-table"
import BrowserPageViewsChart from "components/analytics/browser/browser-pageviews-chart"
import BrowserSessionDurationChart from "components/analytics/browser/browser-session-duration-chart"
import BrowserSessionsChart from "components/analytics/browser/browser-sessions-chart"
import { useAnalytics } from "hooks/use-analytics"
import { useEffect } from "react"

export default function BrowsersDashboardPage() {

    const { dateRange, browserDetails, refreshBrowserDetails } = useAnalytics()

    useEffect(() => {
        refreshBrowserDetails()
    }, [dateRange])

    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <BrowserSessionsChart {...browserDetails}/>
            <BrowserPageViewsChart {...browserDetails}/>
            <BrowserBounceRateChart {...browserDetails}/>
            <BrowserSessionDurationChart {...browserDetails}/>
            <BrowserDetailsTable {...browserDetails} className="col-span-full" />
        </div>

    </>
}