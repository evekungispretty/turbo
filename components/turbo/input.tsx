import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
}

function Input({ className, leftIcon, ...props }: InputProps) {
  if (leftIcon) {
    return (
      <div className="relative w-full">
        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#868686] [&_svg]:size-[17px]">
          {leftIcon}
        </span>
        <input
          className={cn(
            "w-full rounded-lg border border-[rgba(0,0,0,0.1)] bg-white py-1.5 pl-8 pr-2.5 text-[14px] text-[#3f3f3f] placeholder:text-[#868686] outline-none",
            "focus:border-[#1160e1] focus:ring-2 focus:ring-[#1160e1]/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
      </div>
    )
  }

  return (
    <input
      className={cn(
        "w-full rounded-lg border border-[rgba(0,0,0,0.1)] bg-white px-2.5 py-1.5 text-[14px] text-[#3f3f3f] placeholder:text-[#868686] outline-none",
        "focus:border-[#1160e1] focus:ring-2 focus:ring-[#1160e1]/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export { Input }
