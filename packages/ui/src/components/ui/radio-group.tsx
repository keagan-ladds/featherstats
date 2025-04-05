import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@repo/ui/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("ui-grid ui-gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "ui-border-input ui-text-primary focus-visible:ui-border-ring focus-visible:ui-ring-ring/50 aria-invalid:ui-ring-destructive/20 dark:aria-invalid:ui-ring-destructive/40 aria-invalid:ui-border-destructive dark:ui-bg-input/30 ui-aspect-square ui-size-4 ui-shrink-0 ui-rounded-full ui-border ui-shadow-xs ui-transition-[color,box-shadow] ui-outline-none focus-visible:ui-ring-[3px] disabled:ui-cursor-not-allowed disabled:ui-opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="ui-relative ui-flex ui-items-center ui-justify-center"
      >
        <CircleIcon className="ui-fill-primary ui-absolute ui-top-1/2 ui-left-1/2 ui-size-2 ui--translate-x-1/2 ui--translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
