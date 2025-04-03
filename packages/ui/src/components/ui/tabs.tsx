import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@repo/ui/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "ui:inline-flex ui:h-9 ui:items-center ui:justify-center ui:rounded-lg ui:bg-muted ui:p-1 ui:text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "ui:inline-flex ui:items-center ui:justify-center ui:whitespace-nowrap ui:rounded-md ui:px-3 ui:py-1 ui:text-sm ui:font-medium ui:ring-offset-background ui:transition-all ui:focus-visible:outline-hidden ui:focus-visible:ring-2 ui:focus-visible:ring-ring ui:focus-visible:ring-offset-2 ui:disabled:pointer-events-none ui:disabled:opacity-50 ui:data-[state=active]:bg-background ui:data-[state=active]:text-foreground ui:data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ui:mt-2 ui:ring-offset-background ui:focus-visible:outline-hidden ui:focus-visible:ring-2 ui:focus-visible:ring-ring ui:focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
