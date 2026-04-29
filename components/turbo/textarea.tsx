import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-[rgba(0,0,0,0.1)] bg-white px-2.5 py-1.5 text-[14px] text-[#3f3f3f] placeholder:text-[#868686] outline-none resize-none",
        "focus:border-[#1160e1] focus:ring-2 focus:ring-[#1160e1]/20",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
