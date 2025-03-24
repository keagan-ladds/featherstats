'use client'

import { CalendarDateRangePicker } from "@repo/ui/components/dashboard/date-range-picker"
import { useAnalytics } from "hooks/use-analytics";
import useAppShell from "hooks/use-app-shell";
import { useCallback, useEffect, useMemo } from "react";
import { DateRange } from "react-day-picker";

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { pageTitle, setHeaderContent } = useAppShell();
    const { setDateRange } = useAnalytics();

    const setDate = useCallback((date: DateRange | undefined) => {
        if (date) {
            if (date.from) {
                console.log('Updating date range: ', date)
                setDateRange({ start: date.from!, end: date.to ?? date.from! })
            }
        }
    }, [])

    const headerContent = useMemo<React.ReactElement>(() => {
        return <>
            <div className="ml-auto flex flex-grow items-center justify-end space-y-2 px-4">
                <div className="ml-auto flex items-center space-x-2">
                    <CalendarDateRangePicker onDateSelect={setDate} />
                </div>
            </div>

        </>
    }, [])

    useEffect(() => {
        setHeaderContent(headerContent)
    }, [])

    return <>
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2>
        </div>
        {children}
    </>
}