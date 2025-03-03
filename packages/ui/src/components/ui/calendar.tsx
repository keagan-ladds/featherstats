import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
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
      className={cn("ui-p-3", className)}
      classNames={{
        months: "ui-flex ui-flex-col sm:ui-flex-row ui-space-y-4 sm:ui-space-x-4 sm:ui-space-y-0",
        month: "ui-space-y-4",
        caption: "ui-flex ui-justify-center ui-pt-1 ui-relative ui-items-center",
        caption_label: "ui-text-sm ui-font-medium",
        nav: "ui-space-x-1 ui-flex ui-items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "ui-h-7 ui-w-7 ui-bg-transparent ui-p-0 ui-opacity-50 hover:ui-opacity-100"
        ),
        nav_button_previous: "ui-absolute ui-left-1",
        nav_button_next: "ui-absolute ui-right-1",
        table: "ui-w-full ui-border-collapse ui-space-y-1",
        head_row: "ui-flex",
        head_cell:
          "ui-text-muted-foreground ui-rounded-md ui-w-8 ui-font-normal ui-text-[0.8rem]",
        row: "ui-flex ui-w-full ui-mt-2",
        cell: cn(
          "ui-relative ui-p-0 ui-text-center ui-text-sm focus-within:ui-relative focus-within:ui-z-20 [&:has([aria-selected])]:ui-bg-accent [&:has([aria-selected].day-outside)]:ui-bg-accent/50 [&:has([aria-selected].day-range-end)]:ui-rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:ui-rounded-r-md [&:has(>.day-range-start)]:ui-rounded-l-md first:[&:has([aria-selected])]:ui-rounded-l-md last:[&:has([aria-selected])]:ui-rounded-r-md"
            : "[&:has([aria-selected])]:ui-rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "ui-h-8 ui-w-8 ui-p-0 ui-font-normal aria-selected:ui-opacity-100"
        ),
        day_range_start: "ui-day-range-start",
        day_range_end: "ui-day-range-end",
        day_selected:
          "ui-bg-primary ui-text-primary-foreground hover:ui-bg-primary hover:ui-text-primary-foreground focus:ui-bg-primary focus:ui-text-primary-foreground",
        day_today: "ui-bg-accent ui-text-accent-foreground",
        day_outside:
          "ui-day-outside ui-text-muted-foreground aria-selected:ui-bg-accent/50 aria-selected:ui-text-muted-foreground",
        day_disabled: "ui-text-muted-foreground ui-opacity-50",
        day_range_middle:
          "aria-selected:ui-bg-accent aria-selected:ui-text-accent-foreground",
        day_hidden: "ui-invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("ui-h-4 ui-w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("ui-h-4 ui-w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
