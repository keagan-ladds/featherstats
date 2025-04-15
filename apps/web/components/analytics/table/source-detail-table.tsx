import { SourceDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: SourceDetailsData
}


export default function SourceDetailTable({ data, className }: Props) {
    return <>
        <DataTable columns={columns} data={data} className={className} />
    </>
}

export const columns: ColumnDef<SourceDetailsData[number]>[] = [
    {
        accessorKey: "source",
        header: () => <div>Source</div>,
        cell: ({ row }) => {
            return <div className="font-medium whitespace-nowrap">{row.getValue("source")}</div>
        },
    },
    ...DefaultPageDetailsColumns<SourceDetailsData[number]>(),
    ...DefaultSessionDetailsColumns<SourceDetailsData[number]>()
]