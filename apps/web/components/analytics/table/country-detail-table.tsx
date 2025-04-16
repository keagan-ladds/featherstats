import { ChannelDetailsData, CountryDetailsData } from "types/analytics";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { formatDuration } from "lib/utils";
import { formatCountryCode } from "lib/format-utils";
import { DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: CountryDetailsData
}


export default function CountryDetailTable({ data, className }: Props) {
    return <>
    <DataTable columns={columns} data={data} className={className} />
    </>
}

export const columns: ColumnDef<CountryDetailsData[number]>[] = [
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
    ...DefaultSessionDetailsColumns<CountryDetailsData[number]>()
]