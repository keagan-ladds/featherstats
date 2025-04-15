'use client'

import SessionDurationChart from "components/analytics/chart/session-duration-chart"
import PageViewsChart from "components/analytics/chart/pageviews-chart"
import VisitsChart from "components/analytics/chart/visits-chart"
import { useAnalytics } from "hooks/use-analytics"
import { useEffect } from "react"
import BounceRateChart from "components/analytics/chart/bounce-rate-chart"
import CountryDetailTable from "components/analytics/table/country-detail-table"
import { formatCountryCode } from "lib/format-utils"

export default function DevicesDashboardPage() {

    const { dateRange, countryDetails, refreshCountryDetails } = useAnalytics()
    useEffect(() => {
        refreshCountryDetails();
    }, [dateRange])

    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <VisitsChart {...countryDetails} groupKey={"country"} groupFormatter={formatCountryCode}/>
            <PageViewsChart {...countryDetails} groupKey={"country"} groupFormatter={formatCountryCode}/>
            <BounceRateChart {...countryDetails} groupKey={"country"} groupFormatter={formatCountryCode}/>
            <SessionDurationChart {...countryDetails} groupKey={"country"} groupFormatter={formatCountryCode}/>
            <CountryDetailTable {...countryDetails} className="col-span-full"/>
        </div>

    </>
}