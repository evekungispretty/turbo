import { cn } from "@/lib/utils"

type AvatarSize = "sm" | "md" | "lg"
type AvatarColor = "blue" | "purple" | "green"

interface AvatarImageProps {
  type: "image"
  src: string
  alt?: string
  size?: AvatarSize
  notification?: boolean
  className?: string
}

interface AvatarInitialsProps {
  type: "initials"
  initials: string
  color?: AvatarColor
  size?: AvatarSize
  notification?: boolean
  className?: string
}

type AvatarProps = AvatarImageProps | AvatarInitialsProps

const sizeMap: Record<AvatarSize, string> = {
  sm: "size-5",
  md: "size-8",
  lg: "size-[45px]",
}

const dotSizeMap: Record<AvatarSize, string> = {
  sm: "size-[5px]",
  md: "size-2",
  lg: "size-[11px]",
}

const textSizeMap: Record<AvatarSize, string> = {
  sm: "text-[8px]",
  md: "text-[12px]",
  lg: "text-[16px]",
}

const colorMap: Record<AvatarColor, { bg: string; text: string }> = {
  blue:   { bg: "bg-[#c8eef5]", text: "text-[#137c88]" },
  purple: { bg: "bg-[#f0d4f0]", text: "text-[#881388]" },
  green:  { bg: "bg-[#e8f5c8]", text: "text-[#778521]" },
}

function Avatar(props: AvatarProps) {
  const size = props.size ?? "md"
  const notification = props.notification ?? false

  return (
    <div className={cn("relative inline-flex shrink-0", props.className)}>
      {props.type === "image" ? (
        <img
          src={props.src}
          alt={props.alt ?? ""}
          className={cn("rounded-full object-cover", sizeMap[size])}
        />
      ) : (
        <div
          className={cn(
            "rounded-full flex items-center justify-center font-medium",
            sizeMap[size],
            textSizeMap[size],
            colorMap[props.color ?? "blue"].bg,
            colorMap[props.color ?? "blue"].text
          )}
        >
          {props.initials}
        </div>
      )}

      {notification && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-[#ff4d4f] ring-1 ring-white",
            dotSizeMap[size]
          )}
        />
      )}
    </div>
  )
}

export { Avatar }
export type { AvatarSize, AvatarColor }
