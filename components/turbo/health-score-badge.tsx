import { cn } from "@/lib/utils"

type HealthLevel = "great" | "medium" | "bad"
type HealthSize = "long" | "short"

interface HealthScoreBadgeProps {
  health: HealthLevel
  score: string
  size?: HealthSize
  className?: string
}

const healthConfig: Record<
  HealthLevel,
  { text: string; bar: string; track: string }
> = {
  great:  { text: "#00a63e", bar: "#00c950", track: "#f3f4f6" },
  medium: { text: "#f0b100", bar: "#f0b100", track: "#f3f4f6" },
  bad:    { text: "#fb2c36", bar: "#fb2c36", track: "#f3f4f6" },
}

const barWidthMap: Record<HealthLevel, Record<HealthSize, string>> = {
  great:  { long: "100%",  short: "100%" },
  medium: { long: "66%",   short: "66%"  },
  bad:    { long: "40%",   short: "40%"  },
}

function HealthScoreBadge({ health, score, size = "long", className }: HealthScoreBadgeProps) {
  const { text, bar, track } = healthConfig[health]
  const barWidth = barWidthMap[health][size]

  return (
    <div
      className={cn(
        "flex flex-col gap-1 pt-[13px] border-t border-[#f3f4f6]",
        size === "long" ? "w-full" : "w-[117px]",
        className
      )}
    >
      <div className="flex items-center justify-between h-4">
        <span className="text-[12px] leading-4 text-[#6a7282]">Health Score</span>
        <span className="text-[12px] leading-4 font-normal" style={{ color: text }}>
          {score}
        </span>
      </div>

      <div
        className="h-[6px] w-full rounded-full"
        style={{ backgroundColor: track }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: barWidth, backgroundColor: bar }}
        />
      </div>
    </div>
  )
}

export { HealthScoreBadge }
export type { HealthLevel, HealthSize }
