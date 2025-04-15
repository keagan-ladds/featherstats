import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { OsDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { formatDistance } from "date-fns";
import { formatDuration } from "lib/utils";
import OsIcon from "components/icon/os-type-icon";
import { DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: OsDetailsData
    loading?: boolean
}
export default function OsDetailsTable({ className, data }: Props) {
    return <DataTable columns={columns} data={data} className={className} />
}


export const columns: ColumnDef<OsDetailsData[number]>[] = [
    {
        accessorKey: "os",
        header: () => <div>Operating System</div>,
        cell: ({ row }) => {
            const osName = row.getValue("os") as string;
            return <div className="font-medium whitespace-nowrap flex items-center gap-2"><OsIcon osName={osName}/>{osName || 'Unknown'}</div>
        },
    },
    ...DefaultPageDetailsColumns<OsDetailsData[number]>(),
    ...DefaultSessionDetailsColumns<OsDetailsData[number]>()
]