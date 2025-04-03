'use client'

import { CalendarDateRangePicker } from "@repo/ui/components/dashboard/date-range-picker"
import { Button } from "@repo/ui/components/ui/button";
import { useAnalytics } from "hooks/use-analytics";
import useAppShell from "hooks/use-app-shell";
import useDialog from "hooks/use-dialog";
import {  Waypoints } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import { DateRange } from "react-day-picker";

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { pageTitle, setHeaderContent } = useAppShell();
    const { open: openDomainIntegrate } = useDialog("dialog_integrate")
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
            <div className="ml-auto flex grow items-center justify-end space-y-2 px-4">

                <div className="ml-auto flex items-center space-x-2">

                    <Button variant={"ghost"} onClick={() => openDomainIntegrate()}>
                        <Waypoints className="size-4" />
                    </Button>
                    <CalendarDateRangePicker onDateSelect={setDate} />
                </div>
            </div>

        </>
    }, [openDomainIntegrate])

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