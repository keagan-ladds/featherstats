"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@repo/ui/components/ui/button"
import { Calendar } from "@repo/ui/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/ui/popover"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select"

interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    onDateSelect?: (date: DateRange | undefined) => void;
}

export function CalendarDateRangePicker({ className, onDateSelect }: CalendarDateRangePickerProps) {

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: addDays(new Date(), -7),
        to: new Date(),
    })

    const presets = {
        today: {
            label: "Today",
            range: {from: new Date()}
        },
        last_7_days: {
            label: "Last 7 days",
            range: {from: addDays(new Date(), -7), to: new Date()}
        }
    }

    const onPresetSelect = (value: string) => {
        const preset = presets[value as keyof typeof presets]
        onDateSelect?.(preset.range);
    }

    return (
        <Select defaultValue="last_7_days" onValueChange={onPresetSelect}>
            <SelectTrigger className="ui-w-[180px]">
                <SelectValue placeholder="Select Time Range" />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(presets).map(([key, preset], i) => <SelectItem value={key} key={key}>{preset.label}</SelectItem>)}
            </SelectContent>
        </Select>
    )
}