'use client'

import PageDetailsTable from "components/analytics/table/page-details-table";
import { useAnalytics } from "hooks/use-analytics";
import { useEffect } from "react";

export default function PagesDashboardPage() {
    const {dateRange, fetchPageDetails, pageDetails} = useAnalytics()

    useEffect(() => {
        fetchPageDetails();
    }, [dateRange, fetchPageDetails])

    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PageDetailsTable {...pageDetails} className="col-span-full"/>
        </div>
    </>
}