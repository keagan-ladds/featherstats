import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { BrowserDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { formatDistance } from "date-fns";
import BrowserIcon from "components/icon/browser-type-icon";
import { DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: BrowserDetailsData
    loading?: boolean
}
export default function BrowserDetailsTable({ className, data }: Props) {
    return <DataTable columns={columns} data={data} className={className} />
}


export const columns: ColumnDef<BrowserDetailsData[number]>[] = [
    {
        accessorKey: "browser",
        header: () => <div>Browser</div>,
        cell: ({ row }) => {
            const browser = row.getValue("browser") as string;
            return <div className="font-medium whitespace-nowrap flex items-center gap-2"><BrowserIcon browserName={browser}/>{browser}</div>
        },
    },
    ...DefaultPageDetailsColumns<BrowserDetailsData[number]>(),
    ...DefaultSessionDetailsColumns<BrowserDetailsData[number]>()
]