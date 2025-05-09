import {  DeviceSummaryData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { cn } from "lib/utils";
import DeviceTypeIcon from "components/icon/device-type-icon";


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
            const device = row.getValue("device") as string;
            return <div className="font-medium whitespace-nowrap flex items-center gap-2 capitalize"><DeviceTypeIcon deviceType={device}/>{device}</div>
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