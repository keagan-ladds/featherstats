'use client'

import TopPagesCard, { TopPagesCardProps } from "@repo/ui/components/dashboard/top-pages-card";
import TopSourcesCard from "@repo/ui/components/dashboard/top-sources-card";
import TopLocationsCard from "@repo/ui/components/dashboard/top-locations-card";
import { useAnalytics, TopPagesResponse } from "hooks/use-analytics";
import { useEffect, useState } from "react";
import {CalendarDateRangePicker} from "@repo/ui/components/dashboard/date-range-picker";
import { Button } from "@repo/ui/components/ui/button";



export default function DomainDashboardPage() {
    const { fetchTopPages, refreshAllData, topLocations, topPagesData, loading } = useAnalytics();

    useEffect(() => {
        refreshAllData();
    }, [])

    return <>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <CalendarDateRangePicker />
                    <Button>Download</Button> 
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <TopPagesCard data={topPagesData} loading={loading}/>
                <TopSourcesCard />
                <TopLocationsCard {...topLocations}/>
            </div>
        </div>

    </>
}