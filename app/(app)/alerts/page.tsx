"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"

const STAT_CARDS = [
  {
    label:    "Critical Issues",
    count:    5,
    color:    "#e7000b",
    sub:      "Requires immediate action",
    icon:     "material-symbols:error-outline",
    iconColor:"#e7000b",
  },
  {
    label:    "Warnings",
    count:    2,
    color:    "#d08700",
    sub:      "Needs attention soon",
    icon:     "material-symbols:warning-outline",
    iconColor:"#d08700",
  },
  {
    label:    "Info",
    count:    1,
    color:    "#155dfc",
    sub:      "Keep track of these",
    icon:     "material-symbols:info-outline",
    iconColor:"#155dfc",
  },
  {
    label:    "Total Alerts",
    count:    7,
    color:    "#101828",
    sub:      "Unresolved items",
    icon:     "material-symbols:notifications-outline",
    iconColor:"#6a7282",
  },
]

const FILTER_CHIPS = [
  { label: "All (7)",      key: "all"      },
  { label: "Critical (5)", key: "critical" },
  { label: "Warning (2)",  key: "warning"  },
  { label: "Info (2)",     key: "info"     },
]

const ALERTS = [
  {
    id:          1,
    alert:       "Account At Risk -\nNo Response",
    status:      "at-risk",
    company:     "Acme Logistics",
    contact:     "Bryan Daniels",
    health:      20,
    value:       "$12,000",
    lastContact: "5 days overdue",
    avatarSrc:   "https://i.pravatar.cc/80?img=11",
  },
  {
    id:          2,
    alert:       "Overdue Follow-Up Task",
    status:      "at-risk",
    company:     "Global Retail Co",
    contact:     "Rachel Goldman",
    health:      23,
    value:       "$12,000",
    lastContact: "5 days overdue",
    avatarSrc:   "https://i.pravatar.cc/80?img=12",
  },
  {
    id:          3,
    alert:       "Account At Risk -\nNo Response",
    status:      "at-risk",
    company:     "Acme Logistics",
    contact:     "Bryan Daniels",
    health:      29,
    value:       "$12,000",
    lastContact: "5 days overdue",
    avatarSrc:   "https://i.pravatar.cc/80?img=13",
  },
  {
    id:          4,
    alert:       "Account At Risk -\nNo Response",
    status:      "at-risk",
    company:     "Acme Logistics",
    contact:     "Bryan Daniels",
    health:      15,
    value:       "$12,000",
    lastContact: "5 days overdue",
    avatarSrc:   "https://i.pravatar.cc/80?img=14",
  },
  {
    id:          5,
    alert:       "Account At Risk -\nNo Response",
    status:      "at-risk",
    company:     "Acme Logistics",
    contact:     "Bryan Daniels",
    health:      5,
    value:       "$12,000",
    lastContact: "5 days overdue",
    avatarSrc:   "https://i.pravatar.cc/80?img=15",
  },
]

function StatusPill({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ffe2e2] text-[12px] text-[#c10007]">
      <Icon icon="material-symbols:error-outline" className="text-[12px] text-[#c10007]" />
      {status}
    </span>
  )
}

function QuickActions() {
  return (
    <div className="flex items-center gap-1">
      <button className="size-7 rounded flex items-center justify-center bg-[#dbeafe] hover:bg-blue-200 transition-colors">
        <Icon icon="material-symbols:calendar-today-outline" className="text-[16px] text-[#1160e1]" />
      </button>
      <button className="size-7 rounded flex items-center justify-center bg-[#eaeaff] hover:bg-indigo-100 transition-colors">
        <Icon icon="material-symbols:mail-outline" className="text-[16px] text-[#4040c0]" />
      </button>
      <button className="size-7 rounded flex items-center justify-center bg-[#eee] hover:bg-[#e0e0e0] transition-colors">
        <Icon icon="material-symbols:open-in-new" className="text-[16px] text-[#3f3f3f]" />
      </button>
    </div>
  )
}

export default function AlertsPage() {
  const [activeFilter, setActiveFilter] = useState("critical")
  const [selected, setSelected]         = useState<number[]>([])

  function toggleRow(id: number) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function toggleAll() {
    setSelected((prev) => (prev.length === ALERTS.length ? [] : ALERTS.map((a) => a.id)))
  }

  const allSelected = selected.length === ALERTS.length

  return (
    <div className="min-h-full bg-[#f3f5f5] pb-32">
      {/* Page header */}
      <div className="px-7 pt-9 flex items-center justify-between">
        <h1 className="text-[20px] font-semibold text-black">Alert and Action</h1>
        <div className="relative size-[36px] rounded-[10px] bg-[#eee] flex items-center justify-center shrink-0">
          <Icon icon="material-symbols:notifications-outline" className="text-[20px] text-[#3f3f3f]" />
          <span className="absolute top-1 left-[18px] size-[16px] rounded-full bg-[#fb2c36] flex items-center justify-center text-white text-[10px] leading-none">2</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="px-7 mt-8 grid grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.label} className="bg-white border border-[#e5e7eb] rounded-[10px] pt-[17px] pb-px px-[17px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] text-[#6a7282] tracking-[-0.15px]">{card.label}</p>
                <p className="text-[24px] tracking-[0.07px] mt-1" style={{ color: card.color }}>
                  {card.count}
                </p>
              </div>
              <Icon icon={card.icon} className="text-[32px]" style={{ color: card.iconColor }} />
            </div>
            <p className="text-[12px] text-[#6a7282] mt-2 pb-[1px]">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Chip filter + show resolved */}
      <div className="px-7 mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setActiveFilter(chip.key)}
              className={cn(
                "px-3 py-[5px] rounded text-[12px] transition-colors",
                activeFilter === chip.key
                  ? "bg-[rgba(43,141,254,0.15)] border border-[#1d7ad6] text-[#3f3f3f]"
                  : "bg-white text-[#3f3f3f]"
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <button className="text-[10px] font-medium text-[#3f3f3f] px-2 py-1">
          Show Resolved
        </button>
      </div>

      {/* Table */}
      <div className="px-7 mt-4">
        <div className="bg-white">
          {/* Table header */}
          <div className="flex items-center gap-6 px-5 py-2.5 border-b border-[rgba(0,0,0,0.06)]">
            <div className="w-[20px] shrink-0">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="size-[18px] cursor-pointer accent-[#1160e1]"
              />
            </div>
            {[
              { label: "Alert",         w: "w-[140px]" },
              { label: "Status",        w: "w-[104px]" },
              { label: "Account",       w: "w-[180px]" },
              { label: "Health",        w: "w-[140px]" },
              { label: "Value",         w: "w-[140px]" },
              { label: "Last Contact",  w: "w-[140px]" },
              { label: "Quick Actions", w: "flex-1"    },
            ].map((col) => (
              <div key={col.label} className={cn("px-1 py-2.5 shrink-0", col.w)}>
                <span className="text-[12px] font-bold text-[#6a7282]">{col.label}</span>
              </div>
            ))}
          </div>

          {/* Table rows */}
          {ALERTS.map((row) => (
            <div
              key={row.id}
              className={cn(
                "flex items-center gap-6 px-5 py-2.5 border-b border-[rgba(0,0,0,0.1)] hover:bg-[#fafafa] transition-colors",
                selected.includes(row.id) && "bg-[#eff6fe]"
              )}
            >
              {/* Checkbox */}
              <div className="w-[20px] shrink-0">
                <input
                  type="checkbox"
                  checked={selected.includes(row.id)}
                  onChange={() => toggleRow(row.id)}
                  className="size-[18px] cursor-pointer accent-[#1160e1]"
                />
              </div>

              {/* Alert */}
              <div className="w-[140px] shrink-0 p-[10px]">
                <p className="text-[14px] text-[#101828] tracking-[-0.15px] whitespace-pre-line leading-5">
                  {row.alert}
                </p>
              </div>

              {/* Status */}
              <div className="w-[104px] shrink-0 p-[10px]">
                <StatusPill status={row.status} />
              </div>

              {/* Account */}
              <div className="w-[180px] shrink-0 p-[10px]">
                <div className="flex items-center gap-2">
                  <img
                    src={row.avatarSrc}
                    alt={row.contact}
                    className="size-10 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="text-[14px] text-[#101828] tracking-[-0.15px]">{row.company}</p>
                    <p className="text-[12px] text-[#6a7282] mt-0.5">{row.contact}</p>
                  </div>
                </div>
              </div>

              {/* Health */}
              <div className="w-[140px] shrink-0 px-1 py-[10px]">
                <span className="text-[14px] text-[#fb2c36] tracking-[0.09px]">{row.health}%</span>
              </div>

              {/* Value */}
              <div className="w-[140px] shrink-0 px-1 py-[10px]">
                <span className="text-[14px] text-[#3f3f3f] tracking-[0.09px]">{row.value}</span>
              </div>

              {/* Last Contact */}
              <div className="w-[140px] shrink-0 px-1 py-[10px]">
                <div className="flex items-center gap-2.5">
                  <Icon icon="material-symbols:schedule-outline" className="text-[12px] text-[#e7000b] shrink-0" />
                  <span className="text-[12px] text-[#e7000b]">{row.lastContact}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex-1 py-[10px]">
                <QuickActions />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk action toolbar */}
      {selected.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded shadow-[0_4px_8px_rgba(139,142,146,0.29)] px-5 py-4 flex items-center gap-10 z-50">
          <div className="flex items-center gap-2.5">
            <span className="size-[26px] rounded-[13px] bg-[#1160e1] flex items-center justify-center text-white text-[12px] font-semibold shrink-0">
              {selected.length}
            </span>
            <span className="text-[12px] font-semibold text-[#3f3f3f]">Request Selected</span>
          </div>

          <div className="flex items-center gap-8">
            <button className="flex flex-col items-center gap-2">
              <Icon icon="material-symbols:person-add-outline" className="text-[14px] text-[#3f3f3f]" />
              <span className="text-[12px] text-[#3f3f3f]">Assign to</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <Icon icon="material-symbols:check-circle-outline" className="text-[14px] text-[#3f3f3f]" />
              <span className="text-[12px] text-[#3f3f3f]">Resolved</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <Icon icon="material-symbols:archive-outline" className="text-[14px] text-[#3f3f3f]" />
              <span className="text-[12px] text-[#3f3f3f]">Archive</span>
            </button>
          </div>

          <div className="w-px h-[26px] bg-[#f0f0f0]" />

          <button onClick={() => setSelected([])} className="text-[#3f3f3f] hover:text-black transition-colors">
            <Icon icon="material-symbols:close" className="text-[24px]" />
          </button>
        </div>
      )}
    </div>
  )
}
