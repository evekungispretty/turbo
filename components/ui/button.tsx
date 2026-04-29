import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-[#1160e1]/40 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[#1160e1] text-white rounded-[var(--radius-btn)] hover:bg-[#0e52c1] active:translate-y-px",
        secondary:
          "bg-white border border-[rgba(43,141,254,0.15)] text-[#3f3f3f] rounded-[var(--radius-btn)] hover:bg-[var(--color-surface-nav-active)]",
        tertiary:
          "bg-transparent text-[#3f3f3f] rounded-[var(--radius-btn)] hover:bg-[#eeeeee]",
        danger:
          "bg-[rgba(241,80,37,0.4)] border border-[#c94927] text-[#3f3f3f] rounded-[var(--radius-btn)] hover:bg-[rgba(241,80,37,0.55)]",
      },
      size: {
        sm: "h-5 px-2.5 text-[10px] [&_svg:not([class*='size-'])]:size-3",
        md: "h-[31px] px-4 text-[12px] [&_svg:not([class*='size-'])]:size-[14px]",
        lg: "h-12 px-6 text-[16px] rounded-[10px] [&_svg:not([class*='size-'])]:size-4",
        icon: "size-7 rounded-[var(--radius-btn)] [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
