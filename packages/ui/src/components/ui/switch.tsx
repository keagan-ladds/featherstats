import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@repo/ui/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "ui:peer ui:inline-flex ui:h-5 ui:w-9 ui:shrink-0 ui:cursor-pointer ui:items-center ui:rounded-full ui:border-2 ui:border-transparent ui:shadow-sm ui:transition-colors ui:focus-visible:outline-hidden ui:focus-visible:ring-2 ui:focus-visible:ring-ring ui:focus-visible:ring-offset-2 ui:focus-visible:ring-offset-background ui:disabled:cursor-not-allowed ui:disabled:opacity-50 ui:data-[state=checked]:bg-primary ui:data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "ui:pointer-events-none ui:block ui:h-4 ui:w-4 ui:rounded-full ui:bg-background ui:shadow-lg ui:ring-0 ui:transition-transform ui:data-[state=checked]:translate-x-4 ui:data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
