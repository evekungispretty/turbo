"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "@/lib/utils"

interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  className?: string
}

function Switch({ checked, defaultChecked, onCheckedChange, disabled, label, className }: SwitchProps) {
  return (
    <label className={cn("inline-flex items-center gap-2 cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed", className)}>
      <SwitchPrimitive.Root
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "relative h-[20px] w-[36px] shrink-0 rounded-full border-2 border-transparent bg-[rgba(0,0,0,0.15)] outline-none transition-colors",
          "data-[checked]:bg-[#1160e1]",
          "focus-visible:ring-2 focus-visible:ring-[#1160e1]/40"
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "block size-[16px] rounded-full bg-white shadow-sm transition-transform duration-100",
            "translate-x-0 data-[checked]:translate-x-[16px]"
          )}
        />
      </SwitchPrimitive.Root>
      {label && <span className="text-[14px] text-[#3f3f3f]">{label}</span>}
    </label>
  )
}

export { Switch }
