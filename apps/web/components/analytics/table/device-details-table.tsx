import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown, Monitor, MonitorSmartphone, Smartphone, Tablet } from "lucide-react";
import { DeviceDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { formatDistance } from "date-fns";
import { formatDuration } from "lib/utils";
import DeviceTypeIcon from "components/icon/device-type-icon";

interface Props {
    className?: string;
    data: DeviceDetailsData
    loading?: boolean
}
export default function DeviceDetailsTable({ className, data }: Props) {
    return <DataTable columns={columns} data={data} className={className} />
}

const deviceIcon = (function(device: string) {
    switch(device) {
        case "desktop":
            return <Monitor className="inline size-4 mr-2"/>
        case "mobile":
            return <Smartphone className="inline size-4 mr-2"/>
        case "tablet":
            return <Tablet className="inline size-4 mr-2"/>
        default:
            return <MonitorSmartphone className="inline size-4 mr-2"/>
    }
})

export const columns: ColumnDef<DeviceDetailsData[number]>[] = [
    {
        accessorKey: "device",
        header: () => <div>Device</div>,
        cell: ({ row }) => {
            const device = row.getValue("device") as string;
            return <div className="font-medium whitespace-nowrap capitalize flex items-center gap-2"><DeviceTypeIcon deviceType={device}/>{device}</div>
        },
    },
    {
        accessorKey: "visits",
        header: ({ column }) => {
            return <div className="text-right">
                <Button
                    variant="ghost"
                    className=""
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Visits
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        },
        cell: ({ row }) => {
            return <div className="text-right">{row.getValue("visits")}</div>
        },
    },
    {
        accessorKey: "pageviews",
        header: () => <div className="text-right">Page Views</div>,
        cell: ({ row }) => {
            return <div className="text-right">{row.getValue("pageviews")}</div>
        },
    },
    {
        accessorKey: "bounce_rate",
        header: () => <div className="text-right">Bounce Rate</div>,
        cell: ({ row }) => {
            const bounce_rate = parseFloat(row.getValue("bounce_rate"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "percent"
            }).format(bounce_rate)
            return <div className="text-right">{formatted}</div>
        },
    },

    {
        accessorKey: "avg_session_sec",
        header: () => <div className="text-right">Average Session Duration</div>,
        cell: ({ row }) => {
            const avg_session_sec = parseFloat(row.getValue("avg_session_sec"));
            const formatted = formatDuration(avg_session_sec as number)
            return <div className="text-right whitespace-nowrap">{formatted}</div>
        },
    },
]