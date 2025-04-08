'use client'

import { CalendarDateRangePicker } from "@repo/ui/components/dashboard/date-range-picker"
import { Button } from "@repo/ui/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/ui/tooltip";
import { useAnalytics } from "hooks/use-analytics";
import useAppShell from "hooks/use-app-shell";
import useDialog from "hooks/use-dialog";
import { Plug } from "lucide-react";
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
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={"ghost"} onClick={() => openDomainIntegrate()}>
                                    <Plug className="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Connect Your Domain</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <CalendarDateRangePicker onDateSelect={setDate} />
                </div>
            </div>

        </>
    }, [openDomainIntegrate])

    useEffect(() => {
        setHeaderContent(headerContent)
    }, [])

    return <>
        {pageTitle && (
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2>
            </div>)}
        {children}
    </>
}