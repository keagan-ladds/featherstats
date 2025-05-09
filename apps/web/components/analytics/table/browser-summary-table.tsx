import {  BrowserSummaryData, OperatingSystemSummaryData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { cn } from "lib/utils";
import BrowserIcon from "components/icon/browser-type-icon";


interface Props {
    data: BrowserSummaryData
    className?: string;
}

export default function BrowserSummaryTable({data, className}: Props) {
    return <DataTable columns={columns} data={data} className={cn(className, "border-none")} />
}

export const columns: ColumnDef<BrowserSummaryData[number]>[] = [
    {
        accessorKey: "browser",
        header: () => <div>Browser</div>,
        cell: ({ row }) => {
            const browser = row.getValue("browser") as string;
            return <div className="font-medium whitespace-nowrap flex items-center gap-2"><BrowserIcon browserName={browser}/>{browser}</div>
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