'use client'
import CityDetailTable from "components/analytics/location/city-details-table";
import CountryDetailTable from "components/analytics/location/country-detail-table";

export default function LocationsDashboardPage() {
    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CountryDetailTable data={[]} />
            <CityDetailTable data={[]}/>
        </div>
    </>
}