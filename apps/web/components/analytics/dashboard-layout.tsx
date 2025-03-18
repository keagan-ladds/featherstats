'use client'

import { CalendarDateRangePicker } from "@repo/ui/components/dashboard/date-range-picker"
import { useAnalytics } from "hooks/use-analytics";
import { useCallback, useEffect } from "react";
import { DateRange } from "react-day-picker";

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { setDateRange } = useAnalytics();

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
        {children}
    </>
}