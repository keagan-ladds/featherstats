import { CountrySummaryData, SourceSummaryData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { cn } from "lib/utils";
import SourceIcon from "components/icon/source-icon";


interface Props {
    data: SourceSummaryData
    className?: string;
}

export default function SourceSummaryTable({ data, className }: Props) {
    return <DataTable columns={columns} data={data} className={cn(className, "border-none")} />
}

export const columns: ColumnDef<SourceSummaryData[number]>[] = [
    {
        accessorKey: "source",
        header: () => <div>Source</div>,
        cell: ({ row }) => {
            const source = row.getValue("source") as string;
            return <div className="font-medium whitespace-nowrap flex items-center gap-2">
                <SourceIcon source={source} />
                {source}
            </div>
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