import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CountryDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { formatDistance } from "date-fns";
import { formatDuration } from "lib/utils";
import { DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

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
    ...DefaultPageDetailsColumns<CountryDetailsData[number]>(),
    ...DefaultSessionDetailsColumns<CountryDetailsData[number]>()
]