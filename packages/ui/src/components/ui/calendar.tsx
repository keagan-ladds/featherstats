import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@repo/ui/lib/utils"
import { buttonVariants } from "@repo/ui/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("ui:p-3", className)}
      classNames={{
        months: "ui:flex ui:flex-col ui:sm:flex-row ui:space-y-4 ui:sm:space-x-4 ui:sm:space-y-0",
        month: "ui:space-y-4",
        caption: "ui:flex ui:justify-center ui:pt-1 ui:relative ui:items-center",
        caption_label: "ui:text-sm ui:font-medium",
        nav: "ui:space-x-1 ui:flex ui:items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "ui:h-7 ui:w-7 ui:bg-transparent ui:p-0 ui:opacity-50 ui:hover:opacity-100"
        ),
        nav_button_previous: "ui:absolute ui:left-1",
        nav_button_next: "ui:absolute ui:right-1",
        table: "ui:w-full ui:border-collapse ui:space-y-1",
        head_row: "ui:flex",
        head_cell:
          "ui:text-muted-foreground ui:rounded-md ui:w-8 ui:font-normal ui:text-[0.8rem]",
        row: "ui:flex ui:w-full ui:mt-2",
        cell: cn(
          "ui:relative ui:p-0 ui:text-center ui:text-sm ui:focus-within:relative ui:focus-within:z-20 ui:[&:has([aria-selected])]:bg-accent ui:[&:has([aria-selected].day-outside)]:bg-accent/50 ui:[&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "ui:[&:has(>.day-range-end)]:rounded-r-md ui:[&:has(>.day-range-start)]:rounded-l-md ui:first:[&:has([aria-selected])]:rounded-l-md ui:last:[&:has([aria-selected])]:rounded-r-md"
            : "ui:[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "ui:h-8 ui:w-8 ui:p-0 ui:font-normal ui:aria-selected:opacity-100"
        ),
        day_range_start: "ui-day-range-start",
        day_range_end: "ui-day-range-end",
        day_selected:
          "ui:bg-primary ui:text-primary-foreground ui:hover:bg-primary ui:hover:text-primary-foreground ui:focus:bg-primary ui:focus:text-primary-foreground",
        day_today: "ui:bg-accent ui:text-accent-foreground",
        day_outside:
          "ui-day-outside ui:text-muted-foreground ui:aria-selected:bg-accent/50 ui:aria-selected:text-muted-foreground",
        day_disabled: "ui:text-muted-foreground ui:opacity-50",
        day_range_middle:
          "ui:aria-selected:bg-accent ui:aria-selected:text-accent-foreground",
        day_hidden: "ui:invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("ui:h-4 ui:w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("ui:h-4 ui:w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
