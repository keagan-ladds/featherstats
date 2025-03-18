import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table"
import { BrowserDetailsData, CityDetailsData } from "types/analytics";
import { DataTable } from "@repo/ui/components/ui/data-table";

interface Props {
    className?: string
    data: BrowserDetailsData;
}

export default function BrowserDetailTable({ data, className }: Props) {
    return <DataTable columns={columns} data={data} className={className} />
}

export const columns: ColumnDef<BrowserDetailsData[number]>[] = [
    {
        accessorKey: "browser",
        header: () => <div>Browser</div>,
        cell: ({ row }) => {
            return <div className="font-medium whitespace-nowrap">{row.getValue("browser")}</div>
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
        accessorKey: "hits",
        header: () => <div className="text-right">Hits</div>,
        cell: ({ row }) => {
            return <div className="text-right">{row.getValue("hits")}</div>
        },
    },
]