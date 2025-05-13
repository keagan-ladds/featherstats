import { CountryDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { formatCountryCode } from "lib/format-utils";
import { DefaultConversionDetailsColumns, DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: CountryDetailsData
    showConversions?: boolean,
    currency?: string;
}


export default function CountryDetailTable({ data, className, showConversions, currency }: Props) {
    const columns: ColumnDef<CountryDetailsData[number]>[] = [
        {
            accessorKey: "country",
            header: () => <div>Country</div>,
            cell: ({ row }) => {
                const countryCode = row.getValue("country") as string;
                return <div className="font-medium whitespace-nowrap flex items-center gap-2">
                    <span className="text-muted-foreground">{countryCode}</span>
                    {formatCountryCode(countryCode)}
                </div>
            },
        },
        ...DefaultPageDetailsColumns<CountryDetailsData[number]>(),
        ...DefaultSessionDetailsColumns<CountryDetailsData[number]>(),
        ...DefaultConversionDetailsColumns<CountryDetailsData[number]>(showConversions, currency)
    ]

    return <>
        <DataTable columns={columns} data={data} className={className} />
    </>
}