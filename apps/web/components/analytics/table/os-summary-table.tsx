import {  OperatingSystemSummaryData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { cn } from "lib/utils";


interface Props {
    data: OperatingSystemSummaryData
    className?: string;
}

export default function OsSummaryTable({data, className}: Props) {
    return <DataTable columns={columns} data={data} className={cn(className, "border-none")} />
}

export const columns: ColumnDef<OperatingSystemSummaryData[number]>[] = [
    {
        accessorKey: "os",
        header: () => <div>Operating System</div>,
        cell: ({ row }) => {
            return <div className="font-medium whitespace-nowrap">{row.getValue("os")}</div>
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