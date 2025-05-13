'use client'

import BounceRateChart from "components/analytics/chart/bounce-rate-chart"
import PageViewsChart from "components/analytics/chart/pageviews-chart"
import SessionDurationChart from "components/analytics/chart/session-duration-chart"
import VisitsChart from "components/analytics/chart/visits-chart"
import OsDetailsTable from "components/analytics/table/os-details-table"
import { useAnalytics } from "hooks/use-analytics"
import useDomain from "hooks/use-domain"
import { useEffect } from "react"

export default function OsDashboardPage() {

    const { dateRange, operatingSystemDetails, refreshOperatingSystemDetails } = useAnalytics()
    const { showConversions, currency} = useDomain()

    useEffect(() => {
        refreshOperatingSystemDetails()
    }, [dateRange])

    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <VisitsChart {...operatingSystemDetails} groupKey={"os"}/>
            <PageViewsChart {...operatingSystemDetails} groupKey={"os"}/>
            <BounceRateChart {...operatingSystemDetails} groupKey={"os"}/>
            <SessionDurationChart {...operatingSystemDetails} groupKey={"os"}/>
            <OsDetailsTable {...operatingSystemDetails} className="col-span-full" showConversions={showConversions} currency={currency} />
        </div>

    </>
}