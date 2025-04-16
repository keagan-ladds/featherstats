import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table"
import { CityDetailsData } from "types/analytics";
import { DataTable } from "@repo/ui/components/ui/data-table";
import { formatDuration } from "lib/utils";
import { DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: CityDetailsData
}

export default function CityDetailTable({ data, className }: Props) {
    return <DataTable columns={columns} data={data} className={className} />
}

export const columns: ColumnDef<CityDetailsData[number]>[] = [
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
    ...DefaultSessionDetailsColumns<CityDetailsData[number]>()
]