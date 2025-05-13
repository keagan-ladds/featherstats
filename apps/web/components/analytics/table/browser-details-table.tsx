import { BrowserDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import BrowserIcon from "components/icon/browser-type-icon";
import { DefaultConversionDetailsColumns, DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: BrowserDetailsData
    showConversions?: boolean,
    currency?: string;
}
export default function BrowserDetailsTable({ className, data, showConversions, currency }: Props) {
    const columns: ColumnDef<BrowserDetailsData[number]>[] = [
        {
            accessorKey: "browser",
            header: () => <div>Browser</div>,
            cell: ({ row }) => {
                const browser = row.getValue("browser") as string;
                return <div className="font-medium whitespace-nowrap flex items-center gap-2"><BrowserIcon browserName={browser}/>{browser}</div>
            },
        },
        ...DefaultPageDetailsColumns<BrowserDetailsData[number]>(),
        ...DefaultSessionDetailsColumns<BrowserDetailsData[number]>(),
        ...DefaultConversionDetailsColumns<BrowserDetailsData[number]>(showConversions, currency)
    ]

    return <DataTable columns={columns} data={data} className={className} />
}
 