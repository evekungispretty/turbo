"use client"

import { useState, useRef, useEffect, type RefObject } from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/turbo/input"
import { StatusBadge, type StatusBadgeStatus } from "@/components/turbo/status-badge"
import { QuickFilterPopup, FILTER_LABELS } from "@/components/turbo/quick-filter-popup"

/* ---- Static data ---- */

const LEAD_SOURCES = [
  { label: "Email Campaigns",  value: 22.0, display: "$22.0k", color: "#4096ff" },
  { label: "Direct Sales",     value: 8.4,  display: "$8.4k",  color: "#52c41a" },
  { label: "Offline Channels", value: 18.6, display: "$18.6k", color: "#9254de" },
  { label: "Other Channels",   value: 15.3, display: "$15.3k", color: "#ff7a45" },
]

const PIPELINE = [
  { label: "Prospect",  count: 122 },
  { label: "Qualified", count: 50  },
  { label: "Proposal",  count: 34  },
  { label: "Closed",    count: 12  },
]

type ProjectStatus = "at-risk" | "prospecting" | "active"

interface AccountItem {
  id: number
  company: string
  contact: string
  status: StatusBadgeStatus
  value: string
  health: number
  avatar: string
}

interface ProjectAccount {
  id: number
  company: string
  contact: string
  projectStatus: ProjectStatus
  value: string
  health: number
  avatar: string
}

interface Project {
  id: number
  name: string
  description: string
  accountCount: number
  totalValue: string
  daysActive: number
  avgHealth: number
  collaboratorAvatars: string[]
  accounts: ProjectAccount[]
}

const MY_ACCOUNTS: AccountItem[] = [
  { id: 1, company: "Acme Logistics", contact: "Bryan Daniels",  status: "no-response",   value: "$145,000", health: 85, avatar: "https://i.pravatar.cc/80?img=11" },
  { id: 2, company: "Snap",           contact: "George Smith",   status: "proposal-sent", value: "$145,000", health: 24, avatar: "https://i.pravatar.cc/80?img=12" },
  { id: 3, company: "Meta",           contact: "Robert Miller",  status: "interested",    value: "$145,000", health: 85, avatar: "https://i.pravatar.cc/80?img=13" },
  { id: 4, company: "Estee Lauder",   contact: "Emma Steinfield", status: "no-response",  value: "$145,000", health: 49, avatar: "https://i.pravatar.cc/80?img=14" },
  { id: 5, company: "Oracle Cloud",   contact: "Yucheng Fang",   status: "qualified",     value: "$145,000", health: 80, avatar: "https://i.pravatar.cc/80?img=15" },
]

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Enterprise Logistics Initiative",
    description: "Target Fortune 500 logistics and supply chain companies",
    accountCount: 5,
    totalValue: "$348,000",
    daysActive: 27,
    avgHealth: 65,
    collaboratorAvatars: [
      "https://i.pravatar.cc/40?img=31",
      "https://i.pravatar.cc/40?img=32",
    ],
    accounts: [
      { id: 1, company: "Acme Logistics",   contact: "Bryan Daniels",  projectStatus: "at-risk",     value: "$145,000", health: 17, avatar: "https://i.pravatar.cc/80?img=21" },
      { id: 2, company: "Snap",             contact: "Laura Williams",  projectStatus: "prospecting", value: "$145,000", health: 85, avatar: "https://i.pravatar.cc/80?img=22" },
      { id: 3, company: "Meta",             contact: "Casey Johnson",   projectStatus: "at-risk",     value: "$145,000", health: 25, avatar: "https://i.pravatar.cc/80?img=23" },
      { id: 4, company: "Quincy Solutions", contact: "Chris Lener",     projectStatus: "active",      value: "$145,000", health: 91, avatar: "https://i.pravatar.cc/80?img=24" },
    ],
  },
  {
    id: 2,
    name: "Tech Startup Accelerator",
    description: "Series A/B SaaS companies in high-growth markets",
    accountCount: 8,
    totalValue: "$512,000",
    daysActive: 14,
    avgHealth: 72,
    collaboratorAvatars: [
      "https://i.pravatar.cc/40?img=33",
      "https://i.pravatar.cc/40?img=34",
      "https://i.pravatar.cc/40?img=35",
    ],
    accounts: [
      { id: 5, company: "Intuit",     contact: "Mark Thompson", projectStatus: "at-risk",     value: "$145,000", health: 30, avatar: "https://i.pravatar.cc/80?img=25" },
      { id: 6, company: "Salesforce", contact: "Amy Chen",      projectStatus: "active",      value: "$145,000", health: 88, avatar: "https://i.pravatar.cc/80?img=26" },
      { id: 7, company: "HubSpot",    contact: "David Park",    projectStatus: "prospecting", value: "$145,000", health: 62, avatar: "https://i.pravatar.cc/80?img=27" },
      { id: 8, company: "Notion",     contact: "Sarah Lee",     projectStatus: "active",      value: "$145,000", health: 94, avatar: "https://i.pravatar.cc/80?img=28" },
    ],
  },
]

/* ---- Helpers ---- */

function healthBarColor(pct: number) {
  if (pct >= 70) return "#00c950"
  if (pct >= 45) return "#f0b100"
  return "#fb2c36"
}

/* ---- Sub-components ---- */

function DonutChart() {
  const total = LEAD_SOURCES.reduce((s, d) => s + d.value, 0)
  let cumulative = 0
  const stops = LEAD_SOURCES.map((s) => {
    const start = (cumulative / total) * 100
    cumulative += s.value
    const end = (cumulative / total) * 100
    return `${s.color} ${start.toFixed(1)}% ${end.toFixed(1)}%`
  }).join(", ")

  return (
    <div className="relative flex items-center justify-center w-[190px] h-[190px] shrink-0">
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: `conic-gradient(from -90deg, ${stops})` }}
      />
      <div className="absolute w-[115px] h-[115px] rounded-full bg-white flex items-center justify-center">
        <span className="text-[28px] font-bold text-[#1c1d21]">$85k</span>
      </div>
    </div>
  )
}

function AccountCard({ company, contact, status, value, health, avatar }: AccountItem) {
  const barColor = healthBarColor(health)
  return (
    <div className="bg-white rounded-[10px] p-4 border border-[#f0f0f3] shadow-sm">
      <div className="flex items-center gap-2.5 mb-3">
        <img src={avatar} alt={contact} className="size-9 rounded-full object-cover shrink-0" />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#1c1d21] truncate">{company}</p>
          <p className="text-[11px] text-[#6a7282] truncate">{contact}</p>
        </div>
      </div>
      <div className="mb-3">
        <StatusBadge status={status} />
      </div>
      <div className="flex items-center gap-0.5 mb-3">
        <Icon icon="material-symbols:attach-money" className="text-[14px] text-[#6a7282]" />
        <span className="text-[13px] text-[#1c1d21]">{value}</span>
      </div>
      <div className="border-t border-[#f3f4f6] pt-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[12px] text-[#6a7282]">Health Score</span>
          <span className="text-[12px] font-medium" style={{ color: barColor }}>{health}%</span>
        </div>
        <div className="h-[6px] bg-[#f0f0f3] rounded-full">
          <div className="h-full rounded-full" style={{ width: `${health}%`, backgroundColor: barColor }} />
        </div>
      </div>
    </div>
  )
}

const projectStatusConfig: Record<ProjectStatus, { icon: string; color: string; bg: string; label: string }> = {
  "at-risk":     { icon: "material-symbols:error-circle-rounded", color: "#fb2c36", bg: "#fff1f1", label: "at-risk"     },
  "prospecting": { icon: "material-symbols:trending-up-rounded",  color: "#1160e1", bg: "#eff6ff", label: "prospecting" },
  "active":      { icon: "material-symbols:check-circle-rounded", color: "#16a34a", bg: "#f0fdf4", label: "active"      },
}

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const { icon, color, bg, label } = projectStatusConfig[status]
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ backgroundColor: bg, color }}
    >
      <Icon icon={icon} className="text-[12px]" />
      {label}
    </span>
  )
}

function ProjectAccountCard({ company, contact, projectStatus, value, health, avatar }: ProjectAccount) {
  const barColor = healthBarColor(health)
  return (
    <div className="bg-[#f9fafb] rounded-[8px] p-3 border border-[#f0f0f3] min-w-[168px] max-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <img src={avatar} alt={contact} className="size-8 rounded-full object-cover shrink-0" />
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-[#1c1d21] truncate">{company}</p>
          <p className="text-[10px] text-[#6a7282] truncate">{contact}</p>
        </div>
      </div>
      <div className="mb-2">
        <ProjectStatusBadge status={projectStatus} />
      </div>
      <div className="flex items-center gap-0.5 mb-2">
        <Icon icon="material-symbols:attach-money" className="text-[12px] text-[#6a7282]" />
        <span className="text-[11px] text-[#1c1d21]">{value}</span>
      </div>
      <div className="border-t border-[#f3f4f6] pt-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-[#6a7282]">Health Score</span>
          <span className="text-[10px] font-medium" style={{ color: barColor }}>{health}%</span>
        </div>
        <div className="h-[4px] bg-[#f0f0f3] rounded-full">
          <div className="h-full rounded-full" style={{ width: `${health}%`, backgroundColor: barColor }} />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ name, description, accountCount, totalValue, daysActive, avgHealth, collaboratorAvatars, accounts }: Project) {
  const avgHealthColor = healthBarColor(avgHealth)
  return (
    <div className="bg-white rounded-[10px] p-6 border border-[#f0f0f3]">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="size-10 rounded-[8px] bg-[#dbeafe] flex items-center justify-center shrink-0">
            <Icon icon="material-symbols:ballot-outline" className="text-[20px] text-[#1160e1]" />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#1c1d21]">{name}</p>
            <p className="text-[12px] text-[#6a7282] mt-0.5">{description}</p>
          </div>
        </div>
        <Button variant="primary" size="md" className="shrink-0">
          Go to Account Selection Results
          <Icon icon="material-symbols:arrow-forward-rounded" />
        </Button>
      </div>

      <div className="flex items-center gap-8 mb-5 pb-5 border-b border-[#f3f4f6]">
        <div>
          <p className="text-[11px] text-[#8181a5]">Accounts</p>
          <p className="text-[15px] font-semibold text-[#1c1d21] mt-0.5">{accountCount}</p>
        </div>
        <div>
          <p className="text-[11px] text-[#8181a5]">Total Value</p>
          <p className="text-[15px] font-semibold text-[#1c1d21] mt-0.5">{totalValue}</p>
        </div>
        <div>
          <p className="text-[11px] text-[#8181a5]">Days Active</p>
          <p className="text-[15px] font-semibold text-[#1c1d21] mt-0.5">{daysActive}</p>
        </div>
        <div>
          <p className="text-[11px] text-[#8181a5]">Avg Health</p>
          <p className="text-[15px] font-semibold mt-0.5" style={{ color: avgHealthColor }}>{avgHealth}%</p>
        </div>
        <div>
          <p className="text-[11px] text-[#8181a5]">Collaborators ({collaboratorAvatars.length})</p>
          <div className="flex items-center mt-1">
            {collaboratorAvatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="size-6 rounded-full object-cover border-2 border-white"
                style={{ marginLeft: i > 0 ? "-6px" : 0 }}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="text-[12px] text-[#8181a5] mb-3">Accounts in this Project</p>
      <div className="flex items-start gap-3 flex-wrap">
        {accounts.map((acc) => (
          <ProjectAccountCard key={acc.id} {...acc} />
        ))}
      </div>
    </div>
  )
}

function ContentToolbar({
  search, onSearch,
  activeFilters, onToggleFilter, onRemoveFilter, onClearAllFilters,
  filterOpen, onFilterOpenToggle, filterRef,
}: {
  search: string
  onSearch: (v: string) => void
  activeFilters: string[]
  onToggleFilter: (key: string) => void
  onRemoveFilter: (f: string) => void
  onClearAllFilters: () => void
  filterOpen: boolean
  onFilterOpenToggle: () => void
  filterRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="w-[260px]">
        <Input
          leftIcon={<Icon icon="material-symbols:search-rounded" />}
          placeholder="Search ID numbers, companies or names..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="relative" ref={filterRef}>
        <button
          onClick={onFilterOpenToggle}
          className={cn(
            "flex items-center gap-1.5 h-[29px] px-2 py-1.5 rounded border text-[12px] text-[#3f3f3f] transition-colors",
            filterOpen || activeFilters.length > 0
              ? "border-[#1d7ad6] bg-[rgba(43,141,254,0.15)]"
              : "border-[#d9d9d9] bg-white"
          )}
        >
          <Icon icon="material-symbols:filter-list" className="text-[12px]" />
          Filter{activeFilters.length > 0 ? `/${activeFilters.length}` : ""}
          <Icon icon="material-symbols:keyboard-arrow-down" className="text-[14px]" />
        </button>
        {filterOpen && (
          <QuickFilterPopup
            activeFilters={activeFilters}
            onToggle={onToggleFilter}
            onClearAll={onClearAllFilters}
          />
        )}
      </div>
      {activeFilters.map((f) => (
        <button
          key={f}
          onClick={() => onRemoveFilter(f)}
          className="flex items-center gap-2 h-[29px] px-2 py-1.5 rounded-[6px] border border-[#1d7ad6] bg-[#eff6fe] text-[12px] font-semibold text-[#3f3f3f]"
        >
          {FILTER_LABELS[f] ?? f}
          <Icon icon="material-symbols:close" className="text-[12px]" />
        </button>
      ))}
      <div className="flex-1" />
      <span className="text-[13px] text-black">Sort by</span>
      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#d9d9d9] rounded bg-white text-[13px] text-[rgba(0,0,0,0.85)]">
        Date created
        <Icon icon="material-symbols:keyboard-arrow-down" className="text-[12px]" />
      </button>
    </div>
  )
}

/* ---- Page ---- */

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Overview")
  const [viewMode, setViewMode] = useState<"grid" | "kanban">("grid")
  const [accountSearch, setAccountSearch] = useState("")
  const [accountFilters, setAccountFilters] = useState<string[]>([])
  const [accountFilterOpen, setAccountFilterOpen] = useState(false)
  const accountFilterRef = useRef<HTMLDivElement>(null)
  const [projectSearch, setProjectSearch] = useState("")
  const [projectFilters, setProjectFilters] = useState<string[]>([])
  const [projectFilterOpen, setProjectFilterOpen] = useState(false)
  const projectFilterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountFilterRef.current && !accountFilterRef.current.contains(e.target as Node)) {
        setAccountFilterOpen(false)
      }
    }
    if (accountFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [accountFilterOpen])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (projectFilterRef.current && !projectFilterRef.current.contains(e.target as Node)) {
        setProjectFilterOpen(false)
      }
    }
    if (projectFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [projectFilterOpen])

  function toggleAccountFilter(key: string) {
    setAccountFilters((prev) => prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key])
  }

  function toggleProjectFilter(key: string) {
    setProjectFilters((prev) => prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key])
  }

  return (
    <div className="min-h-full bg-[#f3f5f5]">
      {/* Page header */}
      <div className="px-7 pt-9">
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-semibold text-black">Home</h1>
          <div className="relative size-[36px] rounded-[10px] bg-[#eee] flex items-center justify-center shrink-0">
            <Icon icon="material-symbols:notifications-outline" className="text-[20px] text-[#3f3f3f]" />
            <span className="absolute top-1 left-[18px] size-[16px] rounded-full bg-[#fb2c36] flex items-center justify-center text-white text-[10px] leading-none">2</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-end gap-8 mt-12">
          {["Overview", "My Accounts", "Projects"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-[14px] relative whitespace-nowrap",
                activeTab === tab ? "text-[#1160e1]" : "text-[rgba(0,0,0,0.85)]"
              )}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1160e1] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-[rgba(0,0,0,0.1)]" />

      {/* Alert banner */}
      <div className="mx-7 mt-6">
        <div className="bg-white rounded-[8px] shadow-[0_4px_8px_rgba(139,142,146,0.29)] px-8 py-[18px] flex items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <Icon icon="material-symbols:info-outline" className="text-[22px] text-[#faad14] shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-semibold text-[rgba(0,0,0,0.85)]">Alert</p>
              <p className="text-[14px] text-[rgba(0,0,0,0.85)] mt-1 leading-[1.935]">
                3 leads require immediate attention • 2 accounts overdue for follow-up
              </p>
            </div>
          </div>
          <Button variant="primary" size="sm" className="shrink-0">View All</Button>
        </div>
      </div>

      {/* ---- Overview tab ---- */}
      {activeTab === "Overview" && (
        <>
          <div className="mx-7 mt-4 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-[12px] px-6 pt-[14px] pb-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-[#1c1d21]">Account Health Score</p>
                  <p className="text-[14px] text-[#8181a5] mt-1">Week comparison</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[30px] font-medium text-[rgba(0,0,0,0.85)] leading-10">89</span>
                  <Icon icon="material-symbols:arrow-upward-rounded" className="text-[16px] text-[#7ce7ac]" />
                </div>
              </div>
              <div className="mt-4 h-[6px] bg-[#f0f0f3] rounded-full">
                <div className="h-full bg-[#1160e1] rounded-full" style={{ width: "83.5%" }} />
              </div>
            </div>

            <div className="bg-white rounded-[12px] px-6 pt-[14px] pb-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-[#1c1d21]">Active Leads Count</p>
                  <p className="text-[14px] text-[#8181a5] mt-1">Week comparison</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[30px] font-medium text-[rgba(0,0,0,0.85)] leading-10">1,268</span>
                  <Icon icon="material-symbols:arrow-upward-rounded" className="text-[16px] text-[#7ce7ac]" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <p className="text-[14px] text-[rgba(0,0,0,0.85)]">+5% from last week</p>
                <Icon icon="material-symbols:arrow-upward-rounded" className="text-[14px] text-[#7ce7ac]" />
              </div>
            </div>

            <div className="bg-white rounded-[12px] px-6 pt-[14px] pb-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-[#1c1d21]">Conversion Rate Trend</p>
                  <p className="text-[14px] text-[#8181a5] mt-1">Week comparison</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[30px] font-medium text-[rgba(0,0,0,0.85)] leading-10">24.5%</span>
                  <Icon icon="material-symbols:arrow-upward-rounded" className="text-[16px] text-[#7ce7ac]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mx-7 mt-4 mb-8 bg-white rounded-[10px] overflow-hidden">
            <div className="flex divide-x divide-[#f3f4f6]">
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[18px] font-semibold text-[#1c1d21]">Lead Source Overview</p>
                  <div className="flex items-center gap-4">
                    <button className="text-[14px] font-bold text-[#1c1d21] bg-white border border-[#ececf2] rounded-[8px] px-3 py-1">Day</button>
                    <button className="text-[14px] text-[#8181a5]">Week</button>
                    <button className="text-[14px] text-[#8181a5]">Month</button>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <DonutChart />
                  <div className="flex flex-col gap-3 flex-1">
                    {LEAD_SOURCES.map((s) => (
                      <div key={s.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="size-3 rounded-full shrink-0" style={{ background: s.color }} />
                          <span className="text-[12px] font-medium text-[#1c1d21]">{s.label}</span>
                        </div>
                        <span className="text-[14px] font-bold text-[#1c1d21]">{s.display}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-[14px] text-[#7b7b7b] mt-6">Lead Source Breakdown</p>
              </div>

              <div className="flex-1 p-6">
                <p className="text-[14px] text-[#7b7b7b] mb-6">Lead Pipeline Status Overview</p>
                <div className="flex flex-col gap-5">
                  {PIPELINE.map((item) => (
                    <div key={item.label} className="flex flex-col gap-4">
                      <div className="flex items-center justify-between text-[12px] font-medium">
                        <span className="text-[#3f3f3f]">{item.label}</span>
                        <span className="text-black">{item.count}</span>
                      </div>
                      <div className="h-1 bg-[#f0f0f3] rounded-full">
                        <div
                          className="h-full bg-[#1160e1] rounded-full"
                          style={{ width: `${(item.count / 122) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ---- My Accounts tab ---- */}
      {activeTab === "My Accounts" && (
        <div className="mx-7 mt-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-[16px] font-semibold text-[#1c1d21]">My Accounts</h2>
              <p className="text-[13px] text-[#8181a5] mt-0.5">Manage your account ownership and workload distribution</p>
            </div>
            <div className="flex border border-[#d9d9d9] rounded overflow-hidden bg-white text-[13px]">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("px-4 py-1.5", viewMode === "grid" ? "bg-[#f0f0f3] font-medium" : "text-[#6a7282]")}
              >Grid</button>
              <button
                onClick={() => setViewMode("kanban")}
                className={cn("px-4 py-1.5 border-l border-[#d9d9d9]", viewMode === "kanban" ? "bg-[#f0f0f3] font-medium" : "text-[#6a7282]")}
              >Kanban</button>
            </div>
          </div>

          <ContentToolbar
            search={accountSearch}
            onSearch={setAccountSearch}
            activeFilters={accountFilters}
            onToggleFilter={toggleAccountFilter}
            onRemoveFilter={(f) => setAccountFilters((prev) => prev.filter((x) => x !== f))}
            onClearAllFilters={() => setAccountFilters([])}
            filterOpen={accountFilterOpen}
            onFilterOpenToggle={() => setAccountFilterOpen((o) => !o)}
            filterRef={accountFilterRef}
          />

          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="material-symbols:person-outline" className="text-[15px] text-[#6a7282]" />
              <span className="text-[13px] font-medium text-[#3f3f3f]">Your Accounts ({MY_ACCOUNTS.length})</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {MY_ACCOUNTS.map((account) => (
                <AccountCard key={account.id} {...account} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---- Projects tab ---- */}
      {activeTab === "Projects" && (
        <div className="mx-7 mt-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-[16px] font-semibold text-[#1c1d21]">All Projects</h2>
              <p className="text-[13px] text-[#8181a5] mt-0.5">View your team&apos;s project</p>
            </div>
            <div className="flex border border-[#d9d9d9] rounded overflow-hidden bg-white text-[13px]">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("px-4 py-1.5", viewMode === "grid" ? "bg-[#f0f0f3] font-medium" : "text-[#6a7282]")}
              >Grid</button>
              <button
                onClick={() => setViewMode("kanban")}
                className={cn("px-4 py-1.5 border-l border-[#d9d9d9]", viewMode === "kanban" ? "bg-[#f0f0f3] font-medium" : "text-[#6a7282]")}
              >Kanban</button>
            </div>
          </div>

          <ContentToolbar
            search={projectSearch}
            onSearch={setProjectSearch}
            activeFilters={projectFilters}
            onToggleFilter={toggleProjectFilter}
            onRemoveFilter={(f) => setProjectFilters((prev) => prev.filter((x) => x !== f))}
            onClearAllFilters={() => setProjectFilters([])}
            filterOpen={projectFilterOpen}
            onFilterOpenToggle={() => setProjectFilterOpen((o) => !o)}
            filterRef={projectFilterRef}
          />

          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              <Icon icon="material-symbols:folder-outline" className="text-[15px] text-[#6a7282]" />
              <span className="text-[13px] font-medium text-[#3f3f3f]">All Projects ({PROJECTS.length})</span>
            </div>
            <div className="flex flex-col gap-4">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
