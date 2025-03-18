'use client'

import OsBounceRateChart from "components/analytics/operating-system/os-bounce-rate-chart"
import OsDetailsTable from "components/analytics/operating-system/os-details-table"
import OsPageViewsChart from "components/analytics/operating-system/os-pageviews-chart"
import OsSessionDurationChart from "components/analytics/operating-system/os-session-duration-chart"
import OsSessionsChart from "components/analytics/operating-system/os-sessions-chart"
import { useAnalytics } from "hooks/use-analytics"
import { useEffect } from "react"

export default function OsDashboardPage() {

    const { dateRange, operatingSystemDetails, refreshOperatingSystemDetails } = useAnalytics()

    useEffect(() => {
        refreshOperatingSystemDetails()
    }, [dateRange])

    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <OsSessionsChart {...operatingSystemDetails} />
            <OsPageViewsChart {...operatingSystemDetails} />
            <OsBounceRateChart {...operatingSystemDetails} />
            <OsSessionDurationChart {...operatingSystemDetails} />
            <OsDetailsTable {...operatingSystemDetails} className="col-span-full" />
        </div>

    </>
}