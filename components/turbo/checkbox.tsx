"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { cn } from "@/lib/utils"

interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  className?: string
}

function Checkbox({ checked, defaultChecked, onCheckedChange, disabled, label, className }: CheckboxProps) {
  return (
    <label className={cn("inline-flex items-center gap-2 cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed", className)}>
      <CheckboxPrimitive.Root
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "size-[18px] shrink-0 rounded-[3px] border border-[rgba(0,0,0,0.25)] bg-white outline-none transition-colors",
          "data-[checked]:bg-[#1160e1] data-[checked]:border-[#1160e1]",
          "focus-visible:ring-2 focus-visible:ring-[#1160e1]/40",
        )}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
          <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
            <path d="M1 3.5L4 6.5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && <span className="text-[14px] text-[#3f3f3f]">{label}</span>}
    </label>
  )
}

export { Checkbox }
