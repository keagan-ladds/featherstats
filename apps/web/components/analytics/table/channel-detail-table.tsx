import { ChannelDetailsData } from "types/analytics";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@repo/ui/components/ui/data-table";
import { DefaultConversionDetailsColumns, DefaultPageDetailsColumns, DefaultSessionDetailsColumns } from ".";

interface Props {
    className?: string;
    data: ChannelDetailsData;
    showConversions?: boolean,
    currency?: string;
}


export default function ChannelDetailTable({ data, className, showConversions, currency }: Props) {
    const columns: ColumnDef<ChannelDetailsData[number]>[] = [
        {
            accessorKey: "channel",
            header: () => <div>Channel</div>,
            cell: ({ row }) => {
                return <div className="font-medium whitespace-nowrap">{row.getValue("channel")}</div>
            },
        },
        ...DefaultPageDetailsColumns<ChannelDetailsData[number]>(),
        ...DefaultSessionDetailsColumns<ChannelDetailsData[number]>(),
        ...DefaultConversionDetailsColumns<ChannelDetailsData[number]>(showConversions, currency)
    ]

    return <>
        <DataTable columns={columns} data={data} className={className} />
    </>
}