import { CountrySummaryData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { cn } from "lib/utils";
import { formatCountryCode } from "lib/format-utils";


interface Props {
    data: CountrySummaryData
    className?: string;
}

export default function CountrySummaryTable({data, className}: Props) {
    return <DataTable columns={columns} data={data} className={cn(className, "border-none")} />
}

export const columns: ColumnDef<CountrySummaryData[number]>[] = [
    {
        accessorKey: "country",
        header: () => <div>Country</div>,
        cell: ({ row }) => {
            const countryCode = row.getValue("country") as string;
            return <div className="font-medium whitespace-nowrap">{formatCountryCode(countryCode)}</div>
        },
    },
    {
        accessorKey: "visits",
        header: () => <div>Visits</div>,
        cell: ({ row }) => {
            return <div className="text-right">{row.getValue("visits")}</div>
        },
    }
]