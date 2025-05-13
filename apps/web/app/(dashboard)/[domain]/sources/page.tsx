'use client'
import BounceRateChart from "components/analytics/chart/bounce-rate-chart";
import PageViewsChart from "components/analytics/chart/pageviews-chart";
import SessionDurationChart from "components/analytics/chart/session-duration-chart";
import VisitsChart from "components/analytics/chart/visits-chart";
import SourceDetailTable from "components/analytics/table/source-detail-table";
import { useAnalytics } from "hooks/use-analytics";
import useDomain from "hooks/use-domain";
import { useEffect } from "react";

export default function SourcesDashboardPage() {
    const { setDateRange, refreshSourceDetailsData, sourceDetails, dateRange } = useAnalytics()
    const { showConversions, currency} = useDomain()

    useEffect(() => {
        refreshSourceDetailsData();
    }, [dateRange])

    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <VisitsChart {...sourceDetails} groupKey={"source"} />
            <PageViewsChart {...sourceDetails} groupKey={"source"} />
            <BounceRateChart {...sourceDetails} groupKey={"source"} />
            <SessionDurationChart {...sourceDetails} groupKey={"source"} />
            <SourceDetailTable {...sourceDetails} className="col-span-full" showConversions={showConversions} currency={currency} />
        </div>
    </>
}