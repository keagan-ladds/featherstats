'use client'

import { useAnalytics } from "hooks/use-analytics";
import { useCallback, useEffect } from "react";
import { CalendarDateRangePicker } from "@repo/ui/components/dashboard/date-range-picker";
import { DateRange } from "react-day-picker";
import TopPagesCard from "components/analytics/top-pages-card";
import DashboardMetricsCard from "components/analytics/dashboard-metrics-card";
import TopLocationsCard from "components/analytics/top-locations-card";
import TopSourcesCard from "components/analytics/top-sources-card";
import TopDevicesCard from "components/analytics/top-devices-card";

export default function DomainDashboardPage() {
    const { refreshAllData, topLocations, topSources, topPages, keyMetrics, dateRange, setDateRange } = useAnalytics();

    useEffect(() => {
        refreshAllData();
    }, [dateRange])

    const setDate = useCallback((date: DateRange | undefined) => {
        if (date) {
            if (date.from) {
                console.log('Updating date range: ', date)
                setDateRange({ start: date.from!, end: date.to ?? date.from! })
            }
        }
    }, [])

    return <>
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
                <CalendarDateRangePicker onDateSelect={setDate} />
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DashboardMetricsCard className="col-span-full" />
            <TopPagesCard {...topPages} />
            <TopLocationsCard {...topLocations} />
            <TopSourcesCard {...topSources} />
            <TopDevicesCard />
        </div>
    </>
}