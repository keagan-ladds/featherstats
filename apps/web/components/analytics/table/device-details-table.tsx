import { Monitor, MonitorSmartphone, Smartphone, Tablet } from "lucide-react";
import { DeviceDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import DeviceTypeIcon from "components/icon/device-type-icon";
import { DefaultConversionDetailsColumns, DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: DeviceDetailsData
    showConversions?: boolean,
    currency?: string;
}
export default function DeviceDetailsTable({ className, data, showConversions, currency }: Props) {
    const columns: ColumnDef<DeviceDetailsData[number]>[] = [
        {
            accessorKey: "device",
            header: () => <div>Device</div>,
            cell: ({ row }) => {
                const device = row.getValue("device") as string;
                return <div className="font-medium whitespace-nowrap capitalize flex items-center gap-2"><DeviceTypeIcon deviceType={device}/>{device}</div>
            },
        },
        ...DefaultPageDetailsColumns<DeviceDetailsData[number]>(),
        ...DefaultSessionDetailsColumns<DeviceDetailsData[number]>(),
        ...DefaultConversionDetailsColumns<DeviceDetailsData[number]>(showConversions, currency)
    ]

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