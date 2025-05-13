'use client'

import SessionDurationChart from "components/analytics/chart/session-duration-chart"
import PageViewsChart from "components/analytics/chart/pageviews-chart"
import VisitsChart from "components/analytics/chart/visits-chart"
import { useAnalytics } from "hooks/use-analytics"
import { useEffect } from "react"
import BounceRateChart from "components/analytics/chart/bounce-rate-chart"
import { formatCountryCode } from "lib/format-utils"
import CityDetailTable from "components/analytics/table/city-details-table"
import useDomain from "hooks/use-domain"

export default function CityDetailsPage() {

    const { dateRange, cityDetails, fetchCityDetails } = useAnalytics()
    const { showConversions, currency} = useDomain()
    
    useEffect(() => {
        fetchCityDetails()
    }, [dateRange, fetchCityDetails])

    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <VisitsChart {...cityDetails} groupKey={"city"} groupFormatter={formatCountryCode} />
            <PageViewsChart {...cityDetails} groupKey={"city"} />
            <BounceRateChart {...cityDetails} groupKey={"city"} />
            <SessionDurationChart {...cityDetails} groupKey={"city"} />
            <CityDetailTable {...cityDetails} className="col-span-full" showConversions={showConversions} currency={currency} />
        </div>

    </>
}