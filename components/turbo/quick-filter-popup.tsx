import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

export const STATUS_OPTIONS = [
  { key: "new",         label: "New",        dot: "#fb2c36" },
  { key: "qualified",   label: "Qualified",   dot: "#ff4d8a" },
  { key: "interested",  label: "Interested",  dot: "#3b82f6" },
  { key: "contacted",   label: "Contacted",   dot: "#8b5cf6" },
  { key: "in-progress", label: "In Progress", dot: "#3b82f6" },
]

export const ACTIVITY_LEVEL_OPTIONS = [
  { key: "high",   label: "High Activity"   },
  { key: "medium", label: "Medium Activity" },
  { key: "low",    label: "Low Activity"    },
  { key: "none",   label: "No Activity"     },
]

export const LAST_CONTACTED_OPTIONS = [
  { key: "today",  label: "Today"           },
  { key: "7days",  label: "Last 7 days"     },
  { key: "30days", label: "Last 30 days"    },
  { key: "90days", label: "Last 90 days"    },
  { key: "never",  label: "Never Contacted" },
]

export const FILTER_LABELS: Record<string, string> = {
  "new":         "New",
  "in-progress": "In Progress",
  "qualified":   "Qualified",
  "interested":  "Interested",
  "contacted":   "Contacted",
  "high":        "High Activity",
  "medium":      "Medium Activity",
  "low":         "Low Activity",
  "none":        "No Activity",
  "today":       "Today",
  "7days":       "Last 7 days",
  "30days":      "Last 30 days",
  "90days":      "Last 90 days",
  "never":       "Never Contacted",
}

interface QuickFilterPopupProps {
  activeFilters: string[]
  onToggle: (key: string) => void
  onClearAll: () => void
}

export function QuickFilterPopup({ activeFilters, onToggle, onClearAll }: QuickFilterPopupProps) {
  return (
    <div className="absolute left-0 top-full mt-1.5 z-50 bg-white rounded-[10px] border border-[rgba(0,0,0,0.1)] shadow-[var(--shadow-card)] p-5 w-[500px]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[14px] font-semibold text-[#101828]">Quick Filters</span>
        <button onClick={onClearAll} className="text-[12px] text-[#1160e1] hover:text-[#0e52c1]">
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div>
          <p className="text-[11px] font-medium text-[#6a7282] uppercase tracking-wide mb-2">Status</p>
          <div className="flex flex-col gap-1">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => onToggle(opt.key)}
                className={cn(
                  "flex items-center gap-2 px-3 py-[6px] rounded-[6px] text-[13px] w-full text-left transition-colors",
                  activeFilters.includes(opt.key)
                    ? "border border-[#1160e1] text-[#101828]"
                    : "text-[#3f3f3f] hover:bg-[#f3f4f6]"
                )}
              >
                <span className="size-[7px] rounded-full shrink-0" style={{ backgroundColor: opt.dot }} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-medium text-[#6a7282] uppercase tracking-wide mb-2">Activity Level</p>
          <div className="flex flex-col gap-1">
            {ACTIVITY_LEVEL_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => onToggle(opt.key)}
                className={cn(
                  "flex items-center px-3 py-[6px] rounded-[6px] text-[13px] w-full text-left transition-colors",
                  activeFilters.includes(opt.key)
                    ? "border border-[#1160e1] text-[#101828]"
                    : "text-[#3f3f3f] hover:bg-[#f3f4f6]"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-medium text-[#6a7282] uppercase tracking-wide mb-2">Last Contacted</p>
          <div className="flex flex-col gap-1">
            {LAST_CONTACTED_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => onToggle(opt.key)}
                className={cn(
                  "flex items-center px-3 py-[6px] rounded-[6px] text-[13px] w-full text-left transition-colors",
                  activeFilters.includes(opt.key)
                    ? "border border-[#1160e1] text-[#101828]"
                    : "text-[#3f3f3f] hover:bg-[#f3f4f6]"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4 pt-3 border-t border-[#f3f4f6]">
        <button className="text-[12px] text-[#1160e1] hover:text-[#0e52c1]">
          Switch to advanced filter
        </button>
      </div>
    </div>
  )
}
