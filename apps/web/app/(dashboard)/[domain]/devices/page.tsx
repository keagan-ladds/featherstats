'use client'

import DeviceBounceRateChart from "components/analytics/device/device-bounce-rate-chart"
import DeviceDetailsTable from "components/analytics/device/device-details-table"
import DevicePageViewsChart from "components/analytics/device/device-pageviews-chart"
import DeviceSessionDurationChart from "components/analytics/device/device-session-duration-chart"
import DeviceSessionsChart from "components/analytics/device/device-sessions-chart"
import { useAnalytics } from "hooks/use-analytics"
import { useEffect } from "react"

export default function DevicesDashboardPage() {

    const { dateRange, deviceDetails, refreshDeviceDetails } = useAnalytics()
    useEffect(() => {
        refreshDeviceDetails();
    }, [dateRange])

    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DeviceSessionsChart {...deviceDetails} />
            <DevicePageViewsChart {...deviceDetails} />
            <DeviceBounceRateChart {...deviceDetails} />
            <DeviceSessionDurationChart {...deviceDetails} />
            <DeviceDetailsTable {...deviceDetails} className="col-span-full"/>
        </div>

    </>
}