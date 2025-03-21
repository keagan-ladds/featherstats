import {  DeviceSummaryData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { cn } from "lib/utils";


interface Props {
    data: DeviceSummaryData
    className?: string;
}

export default function DeviceSummaryTable({data, className}: Props) {
    return <DataTable columns={columns} data={data} className={cn(className, "border-none")} />
}

export const columns: ColumnDef<DeviceSummaryData[number]>[] = [
    {
        accessorKey: "device",
        header: () => <div>Device</div>,
        cell: ({ row }) => {
            return <div className="font-medium whitespace-nowrap">{row.getValue("device")}</div>
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