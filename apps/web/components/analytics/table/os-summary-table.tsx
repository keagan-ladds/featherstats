import {  OperatingSystemSummaryData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { cn } from "lib/utils";
import OsIcon from "components/icon/os-type-icon";


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
            const osName = row.getValue("os") as string;
            return <div className="font-medium whitespace-nowrap flex items-center gap-2"><OsIcon osName={osName}/>{osName || 'Unknown'}</div>
        },
    },
    {
        accessorKey: "visits",
        header: () => <div className="text-right">Visits</div>,
        cell: ({ row }) => {
            return <div className="text-right">{row.getValue("visits")}</div>
        },
    },
    {
        accessorKey: "conversions",
        header: () => <div className="text-right">Conversions</div>,
        cell: ({ row }) => {
            return <div className="text-right">{row.getValue("conversions")}</div>
        },
    }
]