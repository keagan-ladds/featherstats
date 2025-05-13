'use client'
import BounceRateChart from "components/analytics/chart/bounce-rate-chart";
import PageViewsChart from "components/analytics/chart/pageviews-chart";
import SessionDurationChart from "components/analytics/chart/session-duration-chart";
import VisitsChart from "components/analytics/chart/visits-chart";
import ChannelDetailTable from "components/analytics/table/channel-detail-table";
import { useAnalytics } from "hooks/use-analytics";
import useDomain from "hooks/use-domain";
import { useEffect } from "react";

export default function ChannelDetailsPage() {
    const { fetchChannelDetails, channelDetails, dateRange} = useAnalytics()
    const { showConversions, currency} = useDomain()

    useEffect(() => {
        fetchChannelDetails();
    }, [dateRange, fetchChannelDetails])

    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <VisitsChart {...channelDetails} groupKey={"channel"}/>
            <PageViewsChart {...channelDetails} groupKey={"channel"}/>
            <BounceRateChart {...channelDetails} groupKey={"channel"}/>
            <SessionDurationChart {...channelDetails} groupKey={"channel"}/>
            <ChannelDetailTable {...channelDetails} className="col-span-full" showConversions={showConversions} currency={currency} />
        </div>
    </>
}