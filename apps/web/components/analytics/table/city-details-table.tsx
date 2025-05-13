import { ColumnDef } from "@tanstack/react-table"
import { CityDetailsData } from "types/analytics";
import { DataTable } from "@repo/ui/components/ui/data-table";
import { DefaultConversionDetailsColumns, DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: CityDetailsData;
    showConversions?: boolean,
    currency?: string;
}

export default function CityDetailTable({ data, className, showConversions, currency }: Props) {
    const columns: ColumnDef<CityDetailsData[number]>[] = [
        {
            accessorKey: "city",
            header: () => <div>City</div>,
            cell: ({ row }) => {
                const countryCode = row.original.country;
                const city = row.getValue("city") as string
                return <div className="font-medium whitespace-nowrap flex items-center gap-2">
                    <span className="text-muted-foreground">{countryCode}</span>
                    {city}
                </div>
            },
        },
        ...DefaultPageDetailsColumns<CityDetailsData[number]>(),
        ...DefaultSessionDetailsColumns<CityDetailsData[number]>(),
        ...DefaultConversionDetailsColumns<CityDetailsData[number]>(showConversions, currency)
    ]

    return <DataTable columns={columns} data={data} className={className} />
}