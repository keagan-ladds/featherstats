import { DataTable } from "@repo/ui/components/ui/data-table"
import { PageDetailsData } from "types/analytics"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@repo/ui/components/ui/button"
import { ArrowUpDown } from "lucide-react"

interface Props {
    data: PageDetailsData
    loading?: boolean
    className?: string;
}


export default function PageDetailsTable({ className, data }: Props) {
    return <>
        <DataTable className={className} columns={columns} data={data}></DataTable>
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