import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@repo/ui/lib/utils"

const buttonVariants = cva(
  "ui:inline-flex ui:items-center ui:justify-center ui:gap-2 ui:whitespace-nowrap ui:rounded-md ui:text-sm ui:font-medium ui:transition-colors ui:focus-visible:outline-hidden ui:focus-visible:ring-1 ui:focus-visible:ring-ring ui:disabled:pointer-events-none ui:disabled:opacity-50 ui:[&_svg]:pointer-events-none ui:[&_svg]:size-4 ui:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "ui:bg-primary ui:text-primary-foreground ui:shadow ui:hover:bg-primary/90",
        destructive:
          "ui:bg-destructive ui:text-destructive-foreground ui:shadow-sm ui:hover:bg-destructive/90",
        outline:
          "ui:border ui:border-input ui:bg-background ui:shadow-sm ui:hover:bg-accent ui:hover:text-accent-foreground",
        secondary:
          "ui:bg-secondary ui:text-secondary-foreground ui:shadow-sm ui:hover:bg-secondary/80",
        ghost: "ui:hover:bg-accent ui:hover:text-accent-foreground",
        link: "ui:text-primary ui:underline-offset-4 ui:hover:underline",
      },
      size: {
        default: "ui:h-9 ui:px-4 ui:py-2",
        sm: "ui:h-8 ui:rounded-md ui:px-3 ui:text-xs",
        lg: "ui:h-10 ui:rounded-md ui:px-8",
        icon: "ui:h-9 ui:w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
) 

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
