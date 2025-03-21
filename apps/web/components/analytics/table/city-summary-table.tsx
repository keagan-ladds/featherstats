import { CitySummaryData, CountrySummaryData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { cn } from "lib/utils";


interface Props {
    data: CitySummaryData
    className?: string;
}

export default function CitySummaryTable({data, className}: Props) {
    return <DataTable columns={columns} data={data} className={cn(className, "border-none")} />
}

export const columns: ColumnDef<CitySummaryData[number]>[] = [
    {
        accessorKey: "city",
        header: () => <div>City</div>,
        cell: ({ row }) => {
            return <div className="font-medium whitespace-nowrap">{row.getValue("city")}</div>
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