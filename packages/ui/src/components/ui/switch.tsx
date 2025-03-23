import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@repo/ui/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "ui-peer ui-inline-flex ui-h-5 ui-w-9 ui-shrink-0 ui-cursor-pointer ui-items-center ui-rounded-full ui-border-2 ui-border-transparent ui-shadow-sm ui-transition-colors focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-ring focus-visible:ui-ring-offset-2 focus-visible:ui-ring-offset-background disabled:ui-cursor-not-allowed disabled:ui-opacity-50 data-[state=checked]:ui-bg-primary data-[state=unchecked]:ui-bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "ui-pointer-events-none ui-block ui-h-4 ui-w-4 ui-rounded-full ui-bg-background ui-shadow-lg ui-ring-0 ui-transition-transform data-[state=checked]:ui-translate-x-4 data-[state=unchecked]:ui-translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
