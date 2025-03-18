'use client'

import SessionDurationChart from "components/analytics/chart/session-duration-chart"
import PageViewsChart from "components/analytics/chart/pageviews-chart"
import VisitsChart from "components/analytics/chart/visits-chart"
import { useAnalytics } from "hooks/use-analytics"
import { useEffect } from "react"
import BounceRateChart from "components/analytics/chart/bounce-rate-chart"

export default function DevicesDashboardPage() {

    const { dateRange, deviceDetails, refreshDeviceDetails } = useAnalytics()
    useEffect(() => {
        refreshDeviceDetails();
    }, [dateRange])

    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <VisitsChart {...deviceDetails} groupKey={"device"}/>
            <PageViewsChart {...deviceDetails} groupKey={"device"}/>
            <BounceRateChart {...deviceDetails} groupKey={"device"}/>
            <SessionDurationChart {...deviceDetails} groupKey={"device"}/>
        </div>

    </>
}