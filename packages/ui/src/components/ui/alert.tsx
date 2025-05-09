import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@repo/ui/lib/utils"

const alertVariants = cva(
  "ui:relative ui:w-full ui:rounded-lg ui:border ui:px-4 ui:py-3 ui:text-sm ui:[&>svg+div]:translate-y-[-3px] ui:[&>svg]:absolute ui:[&>svg]:left-4 ui:[&>svg]:top-4 ui:[&>svg]:text-foreground ui:[&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "ui:bg-background ui:text-foreground",
        destructive:
          "ui:border-destructive/50 ui:text-destructive ui:dark:border-destructive ui:[&>svg]:text-destructive",
        warning:" ui:bg-linear-to-r ui:from-amber-500/25 ui:from-5% ui:to-25% ui:to-border/25",
        danger:" ui:bg-linear-to-r ui:from-red-600/25 ui:from-5% ui:to-25% ui:to-border/25",
        success:"ui:border-green-700/75 ui:bg-linear-to-r ui:from-green-700/50 ui:from-10% ui:to-background"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("ui:mb-1 ui:font-medium ui:leading-none ui:tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ui:text-sm ui:[&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
