'use client'

import BrowserDetailsTable from "components/analytics/table/browser-details-table"
import BounceRateChart from "components/analytics/chart/bounce-rate-chart"
import PageViewsChart from "components/analytics/chart/pageviews-chart"
import SessionDurationChart from "components/analytics/chart/session-duration-chart"
import VisitsChart from "components/analytics/chart/visits-chart"
import { useAnalytics } from "hooks/use-analytics"
import { useEffect } from "react"
import useDomain from "hooks/use-domain"

export default function BrowsersDashboardPage() {

    const { dateRange, browserDetails, refreshBrowserDetails } = useAnalytics()
    const { showConversions, currency} = useDomain()

    useEffect(() => {
        refreshBrowserDetails()
    }, [dateRange])

    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <VisitsChart {...browserDetails} groupKey={"browser"}/>
            <PageViewsChart {...browserDetails} groupKey={"browser"}/>
            <BounceRateChart {...browserDetails} groupKey={"browser"}/>
            <SessionDurationChart {...browserDetails} groupKey={"browser"}/>
            <BrowserDetailsTable {...browserDetails} className="col-span-full" showConversions={showConversions} currency={currency} />
        </div>

    </>
}