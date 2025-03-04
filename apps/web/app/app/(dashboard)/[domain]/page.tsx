'use client'

import TopPagesCard, { TopPagesCardProps } from "@repo/ui/components/dashboard/top-pages-card";
import TopSourcesCard from "@repo/ui/components/dashboard/top-sources-card";
import TopLocationsCard from "@repo/ui/components/dashboard/top-locations-card";
import DashboardMetricsCard from "@repo/ui/components/dashboard/dashboard-metrics-card";
import { useAnalytics, TopPagesResponse } from "hooks/use-analytics";
import { useCallback, useEffect, useState } from "react";
import {CalendarDateRangePicker} from "@repo/ui/components/dashboard/date-range-picker";
import { Button } from "@repo/ui/components/ui/button";
import { DateRange } from "react-day-picker";



export default function DomainDashboardPage() {
    const { refreshAllData, topLocations, topPages, keyMetrics, dateRange, setDateRange } = useAnalytics();

    useEffect(() => {
        refreshAllData();
    }, [dateRange])

    const setDate = useCallback((date: DateRange | undefined) => {
        if (date) {
            if (date.from) {
                console.log('Updating date range: ', date)
                setDateRange(prev => ({...prev, start: date.from!, end: date.to ?? date.from!}))
            } 
        }
    }, [])

    return <>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <CalendarDateRangePicker onDateSelect={setDate}/>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DashboardMetricsCard {...keyMetrics} className="col-span-full"/>
                <TopPagesCard {...topPages}/>
                <TopLocationsCard {...topLocations}/>
                <TopSourcesCard />
                
            </div>
        </div>

    </>
}