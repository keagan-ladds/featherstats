import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table"
import { cn, formatDuration } from "lib/utils";

export function DefaultPageDetailsColumns<T>(): ColumnDef<T>[] {
    return [
        {
            accessorKey: "visits",
            header: ({ column }) => {
                return <div className="text-right">
                    <Button
                        variant="ghost"
                        className=""
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Visits
                        <ArrowUpDown className={cn("ml-2 h-4 w-4", column.getIsSorted() && "text-foreground")} />
                    </Button>
                </div>
            },
            cell: ({ row }) => {
                return <div className="text-right mr-4">{row.getValue("visits")}</div>
            },
        },
        {
            accessorKey: "pageviews",
            header: ({ column }) => {
                return <div className="text-right">
                    <Button
                        variant="ghost"
                        className=""
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Page Views
                        <ArrowUpDown className={cn("ml-2 h-4 w-4", column.getIsSorted() && "text-foreground")} />
                    </Button>
                </div>
            },
            cell: ({ row }) => {
                return <div className="text-right mr-4">{row.getValue("pageviews")}</div>
            },
        },
    ]
}

export function DefaultSessionDetailsColumns<T>(): ColumnDef<T>[] {
    return [

        {
            accessorKey: "bounce_rate",
            header: ({ column }) => {
                return <div className="text-right">
                    <Button
                        variant="ghost"
                        className=""
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Bounce Rate
                        <ArrowUpDown className={cn("ml-2 h-4 w-4", column.getIsSorted() && "text-foreground")} />
                    </Button>
                </div>
            },
            cell: ({ row }) => {
                const bounce_rate = parseFloat(row.getValue("bounce_rate"));
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "percent"
                }).format(bounce_rate)
                return <div className="text-right mr-4">{formatted}</div>
            },
        },

        {
            accessorKey: "avg_session_sec",
            header: ({ column }) => {
                return <div className="text-right">
                    <Button
                        variant="ghost"
                        className=""
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Avg. Session Duration
                        <ArrowUpDown className={cn("ml-2 h-4 w-4", column.getIsSorted() && "text-foreground")} />
                    </Button>
                </div>
            },
            cell: ({ row }) => {
                const avg_session_sec = parseFloat(row.getValue("avg_session_sec"));
                const formatted = formatDuration(avg_session_sec as number)
                return <div className="text-right whitespace-nowrap mr-4">{formatted}</div>
            },
        },


    ]
}

