import { SourceDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { DefaultConversionDetailsColumns, DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: SourceDetailsData,
    showConversions?: boolean,
    currency?: string;
}


export default function SourceDetailTable({ data, className, showConversions, currency }: Props) {
    const columns: ColumnDef<SourceDetailsData[number]>[] = [
        {
            accessorKey: "source",
            header: () => <div>Source</div>,
            cell: ({ row }) => {
                return <div className="font-medium whitespace-nowrap">{row.getValue("source")}</div>
            },
        },
        ...DefaultPageDetailsColumns<SourceDetailsData[number]>(),
        ...DefaultSessionDetailsColumns<SourceDetailsData[number]>(),
        ...DefaultConversionDetailsColumns<SourceDetailsData[number]>(showConversions, currency)
    ]

    return <>
        <DataTable columns={columns} data={data} className={className} />
    </>
}