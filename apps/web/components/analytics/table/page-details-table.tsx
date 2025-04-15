import { PageDetailsData } from "types/analytics";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { cn, formatDuration } from "lib/utils";
import { DefaultPageDetailsColumns } from ".";

interface Props {
    className?: string;
    data: PageDetailsData
}


export default function PageDetailsTable({ data, className }: Props) {
    return <>
        <DataTable columns={columns} data={data} className={className} paginate pageSize={15} filterColumn="pathname" filterInputPlaceholder="Find Page..."/>
    </>
}

export const columns: ColumnDef<PageDetailsData[number]>[] = [
    {
        accessorKey: "pathname",
        header: () => <div>Page</div>,
        cell: ({ row }) => {
            return <div className="font-medium whitespace-nowrap">{row.getValue("pathname")}</div>
        },
    },
    ...DefaultPageDetailsColumns<PageDetailsData[number]>(),
    {
        accessorKey: "avg_duration",
        header: ({ column }) => {
            return <div className="text-right">
                <Button
                    variant="ghost"
                    className=""
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Avg. Duration
                    <ArrowUpDown className={cn("ml-2 h-4 w-4", column.getIsSorted() && "text-foreground")} />
                </Button>
            </div>
        },
        cell: ({ row }) => {
            const duration = row.getValue("avg_duration") as number;
            return <div className="text-right mr-4">{formatDuration(duration)}</div>
        },
    }
]