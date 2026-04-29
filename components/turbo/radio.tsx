"use client"

import { RadioGroup } from "@base-ui/react/radio-group"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { cn } from "@/lib/utils"

interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  options: RadioOption[]
  className?: string
}

function Radio({ value, defaultValue, onValueChange, options, className }: RadioGroupProps) {
  return (
    <RadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={cn("flex flex-col gap-2", className)}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            "inline-flex items-center gap-2 cursor-pointer select-none text-[14px] text-[#3f3f3f]",
            opt.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <RadioPrimitive.Root
            value={opt.value}
            disabled={opt.disabled}
            className={cn(
              "size-[18px] shrink-0 rounded-full border border-[rgba(0,0,0,0.25)] bg-white outline-none transition-all",
              "data-[checked]:border-[#1160e1] data-[checked]:border-[5px]",
              "focus-visible:ring-2 focus-visible:ring-[#1160e1]/40"
            )}
          >
            <RadioPrimitive.Indicator className="hidden" />
          </RadioPrimitive.Root>
          {opt.label}
        </label>
      ))}
    </RadioGroup>
  )
}

export { Radio }
