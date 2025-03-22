import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table"
import { CityDetailsData } from "types/analytics";
import { DataTable } from "@repo/ui/components/ui/data-table";
import { formatDuration } from "lib/utils";

interface Props {
    className?: string;
    data: CityDetailsData
}

export default function CityDetailTable({ data, className }: Props) {
    return <DataTable columns={columns} data={data} className={className} />
}

export const columns: ColumnDef<CityDetailsData[number]>[] = [
    {
        accessorKey: "city",
        header: () => <div>City</div>,
        cell: ({ row }) => {
            const countryCode = row.original.country;
            const city = row.getValue("city") as string
            return <div className="font-medium whitespace-nowrap flex items-center gap-2">
                <span className="text-muted-foreground">{countryCode}</span>
                {city}
            </div>
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
            const formatted = formatDuration(avg_session_sec as number)
            return <div className="text-right whitespace-nowrap">{formatted}</div>
        },
    },
]