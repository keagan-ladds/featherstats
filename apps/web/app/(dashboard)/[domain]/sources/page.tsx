'use client'
import { CalendarDateRangePicker } from "@repo/ui/components/dashboard/date-range-picker";
import SourceDetailsCard from "components/analytics/source-details-card";
import { useAnalytics } from "hooks/use-analytics";
import { useCallback, useEffect } from "react";
import { DateRange } from "react-day-picker";

export default function SourcesDashboardPage() {
    const {setDateRange, refreshSourceDetailsData, sourceDetails, dateRange} = useAnalytics()

    useEffect(() => {
        refreshSourceDetailsData();
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
            <h2 className="text-3xl font-bold tracking-tight">Sources</h2>
            <div className="flex items-center space-x-2">
                <CalendarDateRangePicker onDateSelect={setDate} />
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SourceDetailsCard {...sourceDetails}  className="col-span-full"/>
        </div>
    </>
}