import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CountryDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { formatDistance } from "date-fns";

interface Props {
    className?: string;
    data: CountryDetailsData
    loading?: boolean
}
export default function OsDetailsTable({ className, data }: Props) {
    return <DataTable columns={columns} data={data} className={className} />
}


export const columns: ColumnDef<CountryDetailsData[number]>[] = [
    {
        accessorKey: "country",
        header: () => <div>Country</div>,
        cell: ({ row }) => {
            return <div className="font-medium whitespace-nowrap capitalize">{row.getValue("country") }</div>
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
        accessorKey: "pageviews",
        header: () => <div className="text-right">Page Views</div>,
        cell: ({ row }) => {
            return <div className="text-right">{row.getValue("pageviews")}</div>
        },
    },
    {
        accessorKey: "bounce_rate",
        header: () => <div className="text-right">Bounce Rate</div>,
        cell: ({ row }) => {
            const bounce_rate = parseFloat(row.getValue("bounce_rate"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "percent"
            }).format(bounce_rate)
            return <div className="text-right">{formatted}</div>
        },
    },

    {
        accessorKey: "avg_session_sec",
        header: () => <div className="text-right">Average Session Duration</div>,
        cell: ({ row }) => {
            const avg_session_sec = parseFloat(row.getValue("avg_session_sec"));
            const formatted = formatDistance(0, avg_session_sec * 1000, { includeSeconds: true })
            return <div className="text-right whitespace-nowrap">{formatted}</div>
        },
    },
]