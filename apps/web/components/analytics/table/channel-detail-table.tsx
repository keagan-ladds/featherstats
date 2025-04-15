import { ChannelDetailsData, CountryDetailsData, SourceDetailsData } from "types/analytics";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { formatDuration } from "lib/utils";
import { formatCountryCode } from "lib/format-utils";
import ClarityModeTooltip from "components/clarity-mode/clarity-tooltip";
import { DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: ChannelDetailsData
}


export default function ChannelDetailTable({ data, className }: Props) {
    return <>
    <DataTable columns={columns} data={data} className={className} />
    </>
}

export const columns: ColumnDef<ChannelDetailsData[number]>[] = [
    {
        accessorKey: "channel",
        header: () => <div>Channel</div>,
        cell: ({ row }) => {
            return <div className="font-medium whitespace-nowrap">{row.getValue("channel")}</div>
        },
    },
    ...DefaultPageDetailsColumns<ChannelDetailsData[number]>(),
    ...DefaultSessionDetailsColumns<ChannelDetailsData[number]>()
]