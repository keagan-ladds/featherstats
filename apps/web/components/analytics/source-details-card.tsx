import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@repo/ui/components/ui/table";
import { Tabs, TabsContent } from "@repo/ui/components/ui/tabs";
import { cn } from "lib/utils";
import { DataTable } from "@repo/ui/components/ui/data-table"
import { SourceDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { formatDistance } from "date-fns"
import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface SourceDetailsCardProps extends React.HTMLAttributes<HTMLDivElement> {
    data: SourceDetailsData
}

export const columns: ColumnDef<SourceDetailsData[number]>[] = [
    {
        accessorKey: "referrer",
        header: () => <div>Source</div>,
        cell: ({ row }) => {
            return <div className="font-medium whitespace-nowrap">{row.getValue("referrer") || 'Direct'}</div>
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


export default function SourceDetailsCard({ className, data }: SourceDetailsCardProps) {
    return <>
        <DataTable className={className} columns={columns} data={data}></DataTable>
    </>
}