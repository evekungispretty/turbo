import { cn } from "@/lib/utils"

type StatusBadgeStatus =
  | "no-response"
  | "qualified"
  | "interested"
  | "nurture"
  | "meeting-scheduled"
  | "not-interested"
  | "proposal-sent"
  | "closed-won"
  | "negotiation"
  | "demo-completed"
  | "new"
  | "contacted"
  | "in-progress"

interface StatusBadgeProps {
  status: StatusBadgeStatus
  className?: string
}

const statusConfig: Record<
  StatusBadgeStatus,
  { label: string; bg: string; border: string; text: string }
> = {
  "no-response":       { label: "No Response",       bg: "#fef9c2", border: "#fff085", text: "#894b00" },
  "qualified":         { label: "Qualified",          bg: "#fdc8e1", border: "#ff85b0", text: "#a90237" },
  "interested":        { label: "Interested",         bg: "#dbeafe", border: "#bedbff", text: "#193cb8" },
  "nurture":           { label: "Nurture",            bg: "#dfdfdf", border: "#adadad", text: "#363636" },
  "meeting-scheduled": { label: "Meeting Scheduled",  bg: "#dcfce7", border: "#b9f8cf", text: "#016630" },
  "not-interested":    { label: "Not Interested",     bg: "#fcdcf8", border: "#f5b7f8", text: "#66015c" },
  "proposal-sent":     { label: "Proposal Sent",      bg: "#f9fcdc", border: "#f8e9b7", text: "#665c01" },
  "closed-won":        { label: "Closed Won",         bg: "#dcfcfa", border: "#b7f8f0", text: "#016655" },
  "negotiation":       { label: "Negotiation",        bg: "#e9fcdc", border: "#cdf8b7", text: "#01660d" },
  "demo-completed":    { label: "Demo Completed",     bg: "#fce9dc", border: "#f8c9b7", text: "#663201" },
  "new":               { label: "New",                bg: "#fcdcdc", border: "#f8b7b7", text: "#660101" },
  "contacted":         { label: "Contacted",          bg: "#e8dcfc", border: "#d6b7f8", text: "#320166" },
  "in-progress":       { label: "In Progress",        bg: "#dce6fc", border: "#b7c3f8", text: "#010466" },
}

function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, bg, border, text } = statusConfig[status]
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2.5 py-1 rounded-[8px] border text-[10.5px] leading-[14px] tracking-[0.09px] whitespace-nowrap font-normal",
        className
      )}
      style={{ backgroundColor: bg, borderColor: border, color: text }}
    >
      {label}
    </span>
  )
}

export { StatusBadge }
export type { StatusBadgeStatus }
