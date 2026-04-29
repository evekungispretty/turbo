"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/turbo/status-badge"
import { Avatar } from "@/components/turbo/avatar"
import type { StatusBadgeStatus } from "@/components/turbo/status-badge"

interface InboxContact {
  id: string
  name: string
  company: string
  preview: string
  status: StatusBadgeStatus
  lastSeen: string
  externalId: string
  unreadCount: number
  initials: string
}

const INBOX_CONTACTS: InboxContact[] = [
  {
    id: "1",
    name: "Liam Choi",
    company: "Acme Logistics",
    preview: "Does Tuesday work for yo...",
    status: "qualified",
    lastSeen: "708d ago",
    externalId: "MBP2024001",
    unreadCount: 10,
    initials: "LC",
  },
  {
    id: "2",
    name: "Olivia Robles",
    company: "Acme Logistics",
    preview: "Does Tuesday work for yo...",
    status: "new",
    lastSeen: "708d ago",
    externalId: "MBP2024001",
    unreadCount: 2,
    initials: "OR",
  },
  {
    id: "3",
    name: "Elana O'Maliey",
    company: "Acme Logistics",
    preview: "Does Tuesday work for yo...",
    status: "nurture",
    lastSeen: "708d ago",
    externalId: "MBP2024001",
    unreadCount: 0,
    initials: "EO",
  },
  {
    id: "4",
    name: "Jason Loius",
    company: "Acme Logistics",
    preview: "Does Tuesday work for yo...",
    status: "demo-completed",
    lastSeen: "708d ago",
    externalId: "MBP2024001",
    unreadCount: 0,
    initials: "JL",
  },
  {
    id: "5",
    name: "Anna Luisa",
    company: "Acme Logistics",
    preview: "Does Tuesday work for yo...",
    status: "new",
    lastSeen: "708d ago",
    externalId: "MBP2024001",
    unreadCount: 0,
    initials: "AL",
  },
]

const CHANNEL_FILTERS = [
  { key: "sms",       label: "SMS",       icon: "material-symbols:sms-outline",      count: 23 },
  { key: "whatsapp",  label: "WhatsApp",  icon: "mdi:whatsapp",                      count: 12 },
  { key: "linkedin",  label: "LinkedIn",  icon: "mdi:linkedin",                      count: 15 },
  { key: "email",     label: "Email",     icon: "material-symbols:mail-outline",     count: 6  },
]

const STATUS_FILTERS = [
  { key: "need-response",  label: "Need Response",       color: "#ef4444", count: 8 },
  { key: "interested",     label: "Interested",          color: "#f59e0b", count: 8 },
  { key: "active",         label: "Active Conversations",color: "#22c55e", count: 8 },
  { key: "awaiting",       label: "Awaiting Reply",      color: "#f59e0b", count: 8 },
  { key: "paused",         label: "Paused",              color: "#6b7280", count: 8 },
  { key: "closed",         label: "Closed",              color: "#6b7280", count: 8 },
]

export default function InboxPage() {
  const router = useRouter()
  const [channelOpen, setChannelOpen] = useState(true)
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = INBOX_CONTACTS.filter(
    (c) => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-full bg-white">
      {/* Filter sidebar */}
      <div className="w-[220px] shrink-0 border-r border-[#f0f0f3] flex flex-col">
        {/* Search */}
        <div className="px-3 pt-4 pb-3 shrink-0">
          <div className="flex items-center gap-2 rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-2">
            <Icon icon="material-symbols:search-rounded" className="text-[16px] text-[#9ca3af] shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat"
              className="flex-1 text-[12px] bg-transparent outline-none text-[#3f3f3f] placeholder:text-[#9ca3af]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <p className="px-3 pt-1 pb-2 text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">
            Filters
          </p>

          {/* All */}
          <button
            onClick={() => setChannelOpen((o) => !o)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-[13px] transition-colors",
              !activeChannel ? "text-[#1160e1] font-medium" : "text-[#3f3f3f] hover:bg-[#f9fafb]"
            )}
          >
            <div className="flex items-center gap-1.5">
              <Icon
                icon={channelOpen ? "material-symbols:keyboard-arrow-down" : "material-symbols:chevron-right"}
                className="text-[14px] text-[#6a7282]"
              />
              <span>All</span>
            </div>
            <span className="text-[12px] text-[#6a7282]">58</span>
          </button>

          {/* Channel sub-filters */}
          {channelOpen && (
            <div className="pl-5 flex flex-col">
              {CHANNEL_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveChannel(activeChannel === f.key ? null : f.key)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-[12px] transition-colors rounded-[4px] mx-1",
                    activeChannel === f.key
                      ? "text-[#1160e1] bg-[#eff6ff]"
                      : "text-[#3f3f3f] hover:bg-[#f9fafb]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon icon={f.icon} className="text-[14px] text-[#6a7282]" />
                    <span>{f.label}</span>
                  </div>
                  <span className="text-[11px] text-[#6a7282]">{f.count}</span>
                </button>
              ))}
            </div>
          )}

          {/* Status filters */}
          <div className="mt-1 flex flex-col">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.key}
                className="flex items-center justify-between px-3 py-2 text-[12px] text-[#3f3f3f] hover:bg-[#f9fafb] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols:chevron-right" className="text-[12px] text-[#6a7282]" />
                  <span
                    className="size-[7px] rounded-full shrink-0"
                    style={{ backgroundColor: f.color }}
                  />
                  <span>{f.label}</span>
                </div>
                <span className="text-[11px] text-[#6a7282]">{f.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Filter bar */}
        <div className="px-4 py-3 border-b border-[#f0f0f3] flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-1.5 text-[13px] text-[#6a7282] hover:text-[#3f3f3f] transition-colors">
            <Icon icon="material-symbols:search-rounded" className="text-[16px]" />
            Search
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[#d9d9d9] bg-white text-[13px] text-[#3f3f3f] hover:bg-[#f9f9f9] transition-colors">
            <Icon icon="material-symbols:filter-list" className="text-[14px]" />
            Filter
            <Icon icon="material-symbols:keyboard-arrow-down" className="text-[12px]" />
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-[#f3f4f6]">
                {["Account", "Status", "Last Seen", "ID", "Actions"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2.5 text-left text-[11px] font-medium text-[#6a7282] whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => (
                <tr
                  key={contact.id}
                  onClick={() => router.push(`/inbox/${contact.id}`)}
                  className="border-b border-[#f3f4f6] hover:bg-[#fafafa] cursor-pointer transition-colors group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar type="initials" initials={contact.initials} color="blue" size="md" />
                      <div>
                        <p className="text-[13px] font-medium text-[#101828]">{contact.name}</p>
                        <p className="text-[11px] text-[#6a7282]">{contact.preview}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={contact.status} />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[12px] text-[#6a7282]">{contact.lastSeen}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[12px] text-[#3f3f3f]">{contact.externalId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover:opacity-100 transition-opacity size-6 flex items-center justify-center rounded-[4px] text-[#6a7282] hover:bg-[#f3f4f6]"
                      >
                        <Icon icon="material-symbols:more-vert" className="text-[16px]" />
                      </button>
                      {contact.unreadCount > 0 && (
                        <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#fb2c36] flex items-center justify-center text-white text-[10px] font-medium leading-none shrink-0">
                          {contact.unreadCount > 9 ? "9+" : contact.unreadCount}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
