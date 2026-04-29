"use client"

import { cn } from "@/lib/utils"

interface ChipProps {
  children: React.ReactNode
  selected?: boolean
  onClick?: () => void
  className?: string
}

function Chip({ children, selected = false, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center px-3 py-[5px] rounded-[4px] text-[12px] leading-[16px] text-[#3f3f3f] transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#1160e1]/40",
        selected
          ? "bg-[rgba(43,141,254,0.15)] border border-[#1d7ad6]"
          : "bg-white hover:bg-[var(--color-surface-muted)]",
        className
      )}
    >
      {children}
    </button>
  )
}

export { Chip }
