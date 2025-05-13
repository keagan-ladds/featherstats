import { OsDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import OsIcon from "components/icon/os-type-icon";
import { DefaultConversionDetailsColumns, DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: OsDetailsData
    showConversions?: boolean,
    currency?: string;
}
export default function OsDetailsTable({ className, data, showConversions, currency }: Props) {
    const columns: ColumnDef<OsDetailsData[number]>[] = [
        {
            accessorKey: "os",
            header: () => <div>Operating System</div>,
            cell: ({ row }) => {
                const osName = row.getValue("os") as string;
                return <div className="font-medium whitespace-nowrap flex items-center gap-2"><OsIcon osName={osName}/>{osName || 'Unknown'}</div>
            },
        },
        ...DefaultPageDetailsColumns<OsDetailsData[number]>(),
        ...DefaultSessionDetailsColumns<OsDetailsData[number]>(),
        ...DefaultConversionDetailsColumns<OsDetailsData[number]>(showConversions, currency)
    ]

    return <DataTable columns={columns} data={data} className={className} />
}