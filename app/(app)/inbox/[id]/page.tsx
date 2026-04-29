"use client"

import { use, useState } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/turbo/avatar"
import { AccountDrawer } from "@/components/turbo/account-drawer"
import { MOCK_ACCOUNTS } from "@/lib/accounts-data"

/* ---- Mock conversation data ---- */

type ChannelLabel = "LinkedIn" | "Email" | "SMS" | "WhatsApp"

interface Message {
  id: string
  from: "contact" | "user"
  channel: ChannelLabel
  text: string
  time: string
}

interface Separator {
  id: string
  type: "separator"
  label: string
  date: string
  time: string
}

type ChatItem = Message | Separator

const CHAT_ITEMS: ChatItem[] = [
  {
    id: "m1",
    from: "contact",
    channel: "LinkedIn",
    text: "Hi Sarah,\nInteresting timing - we actually just missed Q3 targets and prospecting efficiency is definitely a concern. Our reps are using a mix of LinkedIn Sales Nav and ZoomInfo but still spending way too much time qualifying leads. What does your solution do differently?",
    time: "10:20 AM",
  },
  {
    id: "m2",
    from: "user",
    channel: "LinkedIn",
    text: "Appreciate the honesty, Olivia! And yes, that's exactly the pattern we see - great tools, but the reps still have to manually piece everything together.\nQuick version: We use AI to cross-reference multiple data sources and automatically surface your exact ICP with verified contact info, then integrate directly with your existing sales stack (CRM, sequences, etc.) so there's zero manual data entry.\nBut rather than me just pitching features, would love to understand more about your specific workflow. Are you free for a quick call Thursday or Friday? I can share how we helped a similar-sized SaaS company (45 reps, similar ICP) go from 800 to 1,200 qualified conversations per quarter.",
    time: "10:20 AM",
  },
  {
    id: "sep1",
    type: "separator",
    label: "Conversation moved to Email",
    date: "May 30th",
    time: "13:34",
  },
  {
    id: "m3",
    from: "user",
    channel: "Email",
    text: "Hey Olivia, thanks for making time! How's your week going? What does your solution do differently?",
    time: "10:20 AM",
  },
]

function isSeparator(item: ChatItem): item is Separator {
  return "type" in item && item.type === "separator"
}

/* ---- Channel label chip ---- */

const CHANNEL_STYLE: Record<ChannelLabel, { bg: string; text: string }> = {
  LinkedIn:  { bg: "#eef0ff", text: "#4f6ef5" },
  Email:     { bg: "#f3eeff", text: "#8b5cf6" },
  SMS:       { bg: "#ecfdf5", text: "#16a34a" },
  WhatsApp:  { bg: "#ecfdf5", text: "#16a34a" },
}

function ChannelChip({ channel }: { channel: ChannelLabel }) {
  const { bg, text } = CHANNEL_STYLE[channel]
  return (
    <span
      className="inline-flex px-2 py-0.5 rounded-[4px] text-[11px] font-medium"
      style={{ backgroundColor: bg, color: text }}
    >
      {channel}
    </span>
  )
}

/* ---- Message actions ---- */

function MessageActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 mt-1.5", className)}>
      {[
        { icon: "material-symbols:reply-rounded", label: "Reply" },
        { icon: "material-symbols:forward-rounded", label: "Forward" },
        { icon: "material-symbols:content-copy-outline", label: "Copy" },
      ].map((action) => (
        <button
          key={action.label}
          className="flex items-center gap-1 text-[11px] text-[#6a7282] hover:text-[#3f3f3f] transition-colors"
        >
          <Icon icon={action.icon} className="text-[13px]" />
          {action.label}
        </button>
      ))}
    </div>
  )
}

/* ---- Page ---- */

const OLIVIA_ACCOUNT = MOCK_ACCOUNTS.find((a) => a.id === "4")!

export default function InboxThreadPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [composerText, setComposerText] = useState("")

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Page header */}
      <div className="px-6 py-4 flex items-center justify-between shrink-0 border-b border-[#f0f0f3]">
        <h1 className="text-[20px] font-bold text-[#101828]">Inbox</h1>
        <div className="relative size-[36px] rounded-[10px] bg-[#eee] flex items-center justify-center shrink-0">
          <Icon icon="material-symbols:notifications-outline" className="text-[20px] text-[#3f3f3f]" />
          <span className="absolute top-1 left-[18px] size-[16px] rounded-full bg-[#fb2c36] flex items-center justify-center text-white text-[10px] leading-none">
            2
          </span>
        </div>
      </div>

      {/* Conversation header */}
      <div className="px-4 py-3 flex items-center justify-between shrink-0 border-b border-[#f0f0f3]">
        {/* Left: back + contact info */}
        <div className="flex items-center gap-3">
          <Link
            href="/inbox"
            className="flex items-center gap-1 text-[13px] text-[#6a7282] hover:text-[#3f3f3f] transition-colors"
          >
            <Icon icon="material-symbols:arrow-back-rounded" className="text-[16px]" />
            Back
          </Link>
          <div className="w-px h-5 bg-[#f0f0f3]" />
          <Avatar type="initials" initials="OR" color="purple" size="md" />
          <div>
            <p className="text-[13px] font-semibold text-[#101828]">Acme Logistics</p>
            <p className="text-[11px] text-[#6a7282]">Olivia Robles</p>
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-2">
          {[
            { icon: "material-symbols:call-outline",        label: "Call Now"           },
            { icon: "material-symbols:calendar-month-outline", label: "Schedule"        },
            { icon: "material-symbols:edit-note-outline",   label: "Log Activity"       },
          ].map((btn) => (
            <button
              key={btn.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[#d9d9d9] bg-white text-[12px] text-[#3f3f3f] hover:bg-[#f9f9f9] transition-colors"
            >
              <Icon icon={btn.icon} className="text-[14px]" />
              {btn.label}
            </button>
          ))}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[#d9d9d9] bg-white text-[12px] text-[#3f3f3f] hover:bg-[#f9f9f9] transition-colors"
          >
            <Icon icon="material-symbols:visibility-outline" className="text-[14px]" />
            View Account Detail
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
        {CHAT_ITEMS.map((item) => {
          if (isSeparator(item)) {
            return (
              <div key={item.id} className="flex flex-col items-center gap-0.5 my-2">
                <span className="px-3 py-1 rounded-[4px] border border-[#e5e7eb] text-[11px] text-[#6a7282] bg-white">
                  {item.label}
                </span>
                <span className="text-[11px] text-[#6a7282]">{item.date}</span>
                <span className="text-[11px] text-[#6a7282]">{item.time}</span>
              </div>
            )
          }

          const isUser = item.from === "user"

          return (
            <div
              key={item.id}
              className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}
            >
              <ChannelChip channel={item.channel} />
              <div className={cn("flex items-end gap-2", isUser && "flex-row-reverse")}>
                <Avatar
                  type="initials"
                  initials={isUser ? "SJ" : "OR"}
                  color={isUser ? "blue" : "purple"}
                  size="md"
                />
                <div
                  className={cn(
                    "max-w-[580px] px-4 py-3 rounded-[10px] text-[13px] leading-[1.6]",
                    isUser
                      ? "bg-[#1160e1] text-white rounded-br-[4px]"
                      : "bg-white border border-[#f0f0f3] shadow-[0_1px_3px_rgba(0,0,0,0.06)] text-[#3f3f3f] rounded-bl-[4px]"
                  )}
                >
                  {item.text.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < item.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
              <div className={cn("flex items-center gap-3", isUser ? "flex-row-reverse" : "pl-10")}>
                <span className="text-[11px] text-[#9ca3af]">{item.time}</span>
                <MessageActions />
              </div>
            </div>
          )
        })}
      </div>

      {/* Composer */}
      <div className="px-4 py-3 border-t border-[#f0f0f3] bg-white shrink-0">
        <div className="flex items-center gap-3">
          {/* Attachment controls */}
          <div className="flex items-center gap-1.5">
            {[
              "material-symbols:attach-file-rounded",
              "material-symbols:sentiment-satisfied-outline",
              "material-symbols:image-outline",
            ].map((icon) => (
              <button
                key={icon}
                className="size-8 flex items-center justify-center rounded-[6px] text-[#6a7282] hover:bg-[#f3f4f6] transition-colors"
              >
                <Icon icon={icon} className="text-[18px]" />
              </button>
            ))}
          </div>

          {/* Input */}
          <input
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            placeholder="Type '/' to use template message"
            className="flex-1 text-[13px] text-[#3f3f3f] placeholder:text-[#9ca3af] outline-none bg-transparent"
          />

          {/* Send */}
          <button
            disabled={!composerText.trim()}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-[6px] text-[13px] font-medium transition-colors",
              composerText.trim()
                ? "bg-[#1160e1] text-white hover:bg-[#0e52c1]"
                : "bg-[#f3f4f6] text-[#9ca3af] cursor-not-allowed"
            )}
          >
            Send
            <Icon icon="material-symbols:send-rounded" className="text-[14px]" />
          </button>
        </div>
      </div>

      {/* Account drawer */}
      {drawerOpen && (
        <AccountDrawer account={OLIVIA_ACCOUNT} onClose={() => setDrawerOpen(false)} />
      )}
    </div>
  )
}
