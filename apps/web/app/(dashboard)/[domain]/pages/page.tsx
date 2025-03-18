'use client'
import { CalendarDateRangePicker } from "@repo/ui/components/dashboard/date-range-picker";
import PageDetailsTable from "components/analytics/page-details-table";
import { useAnalytics } from "hooks/use-analytics";
import { useCallback } from "react";
import { DateRange } from "react-day-picker";

export default function PagesDashboardPage() {
    const {setDateRange} = useAnalytics()


    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PageDetailsTable data={[]} className="col-span-full"/>
        </div>
    </>
}