"use client"

import { use, useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/turbo/avatar"
import { HealthScoreBadge } from "@/components/turbo/health-score-badge"
import { AccountDrawer } from "@/components/turbo/account-drawer"
import {
  PROMPTS,
  MOCK_ACCOUNTS,
  ACTIVITY_STATUS_CONFIG,
  type AccountData,
} from "@/lib/accounts-data"
import {
  QuickFilterPopup,
  FILTER_LABELS,
  STATUS_OPTIONS,
  ACTIVITY_LEVEL_OPTIONS,
  LAST_CONTACTED_OPTIONS,
} from "@/components/turbo/quick-filter-popup"

/* ---- Communication tool icons ---- */

const COMM_TOOLS = [
  { icon: "mdi:linkedin",      bg: "#eef0ff", color: "#4f6ef5", shape: "square" as const },
  { icon: "mdi:message-text",  bg: "#f3eeff", color: "#8b5cf6", shape: "circle" as const },
  { icon: "mdi:email-outline", bg: "#f3eeff", color: "#8b5cf6", shape: "circle" as const },
  { icon: "mdi:phone",         bg: "#ecfdf5", color: "#16a34a", shape: "circle" as const },
]

function CommTools() {
  return (
    <div className="flex items-center gap-1.5">
      {COMM_TOOLS.map((tool, i) => (
        <button
          key={i}
          className="size-7 flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
          style={{
            backgroundColor: tool.bg,
            borderRadius: tool.shape === "square" ? "6px" : "50%",
          }}
        >
          <Icon icon={tool.icon} className="text-[14px]" style={{ color: tool.color }} />
        </button>
      ))}
    </div>
  )
}

/* ---- Table row ---- */

function AccountRow({
  account,
  isSelected,
  onClick,
}: {
  account: AccountData
  isSelected: boolean
  onClick: () => void
}) {
  const { bg, border, text } = ACTIVITY_STATUS_CONFIG[account.activityStatus]

  return (
    <tr
      onClick={onClick}
      className={cn(
        "border-b border-[#f3f4f6] cursor-pointer transition-colors group",
        isSelected ? "bg-[#f0f6ff]" : "hover:bg-[#fafafa]"
      )}
    >
      {/* Account + Contact */}
      <td className="px-4 py-3">
        <p className="text-[13px] font-medium text-[#101828]">{account.accountName}</p>
        <p className="text-[12px] text-[#6a7282]">{account.contactName}</p>
      </td>

      {/* Contact info */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Avatar
            type="initials"
            initials={account.contactInitials}
            color={account.contactColor}
            size="md"
          />
          <div>
            <p className="text-[12px] text-[#3f3f3f] flex items-center gap-1">
              <Icon icon="mdi:email-outline" className="text-[12px] text-[#9ca3af]" />
              {account.email}
            </p>
            <p className="text-[12px] text-[#3f3f3f] flex items-center gap-1 mt-0.5">
              <Icon icon="mdi:phone-outline" className="text-[12px] text-[#9ca3af]" />
              {account.phone}
            </p>
          </div>
        </div>
      </td>

      {/* Communication tools */}
      <td className="px-4 py-3">
        <CommTools />
      </td>

      {/* Timezone / Location */}
      <td className="px-4 py-3">
        <p className="text-[12px] text-[#3f3f3f] flex items-center gap-1">
          <Icon icon="material-symbols:schedule-outline" className="text-[12px] text-[#9ca3af]" />
          {account.timezone}
        </p>
        <p className="text-[12px] text-[#3f3f3f] flex items-center gap-1 mt-0.5">
          <Icon icon="material-symbols:location-on-outline" className="text-[12px] text-[#9ca3af]" />
          {account.location}
        </p>
      </td>

      {/* Activity status */}
      <td className="px-4 py-3">
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-[6px] border text-[11px] font-medium whitespace-nowrap"
          style={{ backgroundColor: bg, borderColor: border, color: text }}
        >
          {ACTIVITY_STATUS_CONFIG[account.activityStatus].label}
        </span>
      </td>

      {/* Value */}
      <td className="px-4 py-3">
        <p className="text-[13px] font-medium text-[#101828]">
          ${account.value.toLocaleString()}
        </p>
      </td>

      {/* Health Score */}
      <td className="px-4 py-3">
        <span
          className="text-[13px] font-semibold"
          style={{
            color:
              account.healthLevel === "great" ? "#00a63e"
              : account.healthLevel === "medium" ? "#b45309"
              : "#b91c1c",
          }}
        >
          {account.healthScore}%
        </span>
      </td>

      {/* Kebab */}
      <td className="px-3 py-3 w-8">
        <button
          className="opacity-0 group-hover:opacity-100 transition-opacity size-6 flex items-center justify-center rounded-[4px] text-[#6a7282] hover:bg-[#f3f4f6]"
          onClick={(e) => e.stopPropagation()}
        >
          <Icon icon="material-symbols:more-vert" className="text-[16px]" />
        </button>
      </td>
    </tr>
  )
}

/* ---- Page ---- */

const TABLE_TABS = ["Main table", "Group 1", "Group 2"]

export default function AccountResultsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const prompt = PROMPTS.find((p) => p.id === Number(id))

  const [activeTableTab, setActiveTableTab] = useState("Main table")
  const [activeFilters, setActiveFilters] = useState<string[]>(["new", "in-progress"])
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)

  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false)
      }
    }
    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [filterOpen])

  function toggleFilter(key: string) {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    )
  }

  function removeFilter(key: string) {
    setActiveFilters((prev) => prev.filter((f) => f !== key))
  }

  const statusFilters = activeFilters.filter((f) =>
    ["new", "in-progress", "qualified", "interested", "contacted"].includes(f)
  )

  const filteredAccounts =
    statusFilters.length === 0
      ? MOCK_ACCOUNTS
      : MOCK_ACCOUNTS.filter((a) => statusFilters.includes(a.activityStatus))

  const selectedAccount = MOCK_ACCOUNTS.find((a) => a.id === selectedAccountId) ?? null

  const promptText = prompt?.text ?? "Account results"

  return (
    <div className="min-h-full bg-[#f3f5f5]">
      {/* Header */}
      <div className="px-7 pt-9 flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-semibold text-black truncate max-w-[680px]">{promptText}</h1>
          <div className="flex items-center gap-1.5 mt-1 text-[13px]">
            <Link href="/accounts" className="text-[rgba(0,0,0,0.45)] hover:text-[#1160e1]">
              Account Selection
            </Link>
            <span className="text-[rgba(0,0,0,0.3)]">/</span>
            <span className="text-[#3f3f3f] truncate max-w-[500px]">{promptText}</span>
          </div>
        </div>
        <div className="relative size-[36px] rounded-[10px] bg-[#eee] flex items-center justify-center shrink-0">
          <Icon icon="material-symbols:notifications-outline" className="text-[20px] text-[#3f3f3f]" />
          <span className="absolute top-1 left-[18px] size-[16px] rounded-full bg-[#fb2c36] flex items-center justify-center text-white text-[10px] leading-none">2</span>
        </div>
      </div>

      <div className="h-px bg-[rgba(0,0,0,0.1)] mt-6" />

      {/* Content */}
      <div className="px-7 py-6">
        {/* Prompt card */}
        <div className="bg-white rounded-[10px] border border-[#f0f0f3] px-5 py-4 mb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold text-[#101828] mb-1">Prompt</p>
              <p className="text-[13px] text-[#3f3f3f]">{promptText}</p>
            </div>
            <Link
              href={`/accounts/${id}/edit`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#eff6ff] border border-[#bedbff] text-[#1160e1] text-[12px] font-medium hover:bg-[#dbeafe] transition-colors shrink-0"
            >
              <Icon icon="material-symbols:edit-outline" className="text-[14px]" />
              Edit
            </Link>
          </div>
        </div>

        {/* Table tabs */}
        <div className="flex items-center gap-1 mb-0 border-b border-[#f0f0f3] bg-white rounded-t-[10px] px-4">
          {TABLE_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTableTab(tab)}
              className={cn(
                "px-3 py-3 text-[13px] whitespace-nowrap transition-colors border-b-2 -mb-px",
                activeTableTab === tab
                  ? "text-[#1160e1] border-[#1160e1] font-medium"
                  : "text-[#6a7282] border-transparent hover:text-[#3f3f3f]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white border-b border-[#f0f0f3]">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <button className="flex items-center gap-1.5 px-2 py-1.5 text-[#6a7282] hover:text-[#3f3f3f] transition-colors">
              <Icon icon="material-symbols:search-rounded" className="text-[18px]" />
              <span className="text-[13px]">Search</span>
            </button>

            {/* Filter button */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen((o) => !o)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border text-[13px] transition-colors",
                  filterOpen
                    ? "border-[#1160e1] text-[#1160e1] bg-[#eff6ff]"
                    : "border-[#d9d9d9] text-[#3f3f3f] bg-white hover:bg-[#f9f9f9]"
                )}
              >
                <Icon icon="material-symbols:filter-list" className="text-[14px]" />
                Filter{activeFilters.length > 0 ? `/${activeFilters.length}` : ""}
                <Icon icon="material-symbols:keyboard-arrow-down" className="text-[12px]" />
              </button>
              {filterOpen && (
                <QuickFilterPopup
                  activeFilters={activeFilters}
                  onToggle={toggleFilter}
                  onClearAll={() => setActiveFilters([])}
                />
              )}
            </div>

            {/* Active filter chips */}
            {activeFilters.map((f) => (
              <div
                key={f}
                className="flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-white border border-[#d9d9d9] text-[12px] text-[#3f3f3f]"
              >
                <span>{FILTER_LABELS[f] ?? f}</span>
                <button
                  onClick={() => removeFilter(f)}
                  className="text-[#9ca3af] hover:text-[#3f3f3f] transition-colors"
                >
                  <Icon icon="material-symbols:close-rounded" className="text-[12px]" />
                </button>
              </div>
            ))}
          </div>

          {/* Sort by */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#d9d9d9] rounded-[6px] bg-white text-[13px] text-[#3f3f3f] hover:bg-[#f9f9f9] shrink-0">
            <span className="text-[#6a7282]">Sort by</span>
            Date created
            <Icon icon="material-symbols:keyboard-arrow-down" className="text-[14px]" />
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-[10px] overflow-hidden">
          <div className="px-4 py-2.5 border-b border-[#f3f4f6]">
            <p className="text-[12px] font-medium text-[#101828]">Results</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f3f4f6]">
                {[
                  "Account",
                  "Contact",
                  "Communication Tools",
                  "Time zone / Location",
                  "Activity",
                  "Value",
                  "Health Score",
                  "",
                ].map((col) => (
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
              {filteredAccounts.map((account) => (
                <AccountRow
                  key={account.id}
                  account={account}
                  isSelected={selectedAccountId === account.id}
                  onClick={() =>
                    setSelectedAccountId(
                      selectedAccountId === account.id ? null : account.id
                    )
                  }
                />
              ))}
              {filteredAccounts.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-[13px] text-[#6a7282]">
                    No accounts match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account drawer */}
      {selectedAccount && (
        <AccountDrawer
          account={selectedAccount}
          onClose={() => setSelectedAccountId(null)}
        />
      )}
    </div>
  )
}
