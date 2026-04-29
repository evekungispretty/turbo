"use client"

import { useState, useRef, useEffect } from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/* ---- App data ---- */

interface AppItem {
  id: string
  name: string
  icon: string
  iconBg: string
  iconColor: string
  shortDesc: string
  fullDesc: string
  features: string[]
  categories: string[]
  isYourApp: boolean
  connected: boolean
  statusBadge: string | null
}

const APPS: AppItem[] = [
  {
    id: "google-drive",
    name: "Google Drive",
    icon: "mdi:google-drive",
    iconBg: "#fef9f0",
    iconColor: "#fbbc04",
    shortDesc: "Access files and share with team members",
    fullDesc:
      "Access and share files with your team directly from Turbo. Attach relevant documents to accounts, share proposals, and collaborate on sales materials without leaving the platform.",
    features: [
      "Access shared team files instantly",
      "Attach files directly to account records",
      "Share proposals with one click",
      "Sync folders with account activities",
      "Collaborate on documents in real-time",
    ],
    categories: ["Productivity"],
    isYourApp: true,
    connected: true,
    statusBadge: null,
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    icon: "simple-icons:pipedrive",
    iconBg: "#f0fff8",
    iconColor: "#25b372",
    shortDesc: "Send leads straight to your Pipedrive pipeline. Keep...",
    fullDesc:
      "Send leads straight to your Pipedrive pipeline. Keep your sales process organized and track every interaction with your prospects.",
    features: [
      "Automatically sync leads to Pipedrive",
      "Track deal progress and pipeline stages",
      "Log all customer interactions automatically",
      "Get real-time notifications on deal updates",
      "Create custom fields and workflows",
    ],
    categories: ["Customer Relationship Management"],
    isYourApp: true,
    connected: true,
    statusBadge: null,
  },
  {
    id: "monday-crm",
    name: "Monday Sales CRM",
    icon: "simple-icons:monday",
    iconBg: "#fff8f0",
    iconColor: "#f2ae11",
    shortDesc: "monday.com is a flexible Work OS for sales teams to...",
    fullDesc:
      "monday.com is a flexible Work OS for sales teams to manage leads, track pipelines, and collaborate on deals in one unified platform.",
    features: [
      "Manage leads in customizable boards",
      "Automate repetitive sales tasks",
      "Collaborate with your team on deals",
      "Get insights with sales dashboards",
      "Integrate with 200+ tools",
    ],
    categories: ["Sales & Marketing"],
    isYourApp: false,
    connected: false,
    statusBadge: null,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    icon: "simple-icons:salesforce",
    iconBg: "#f0f8ff",
    iconColor: "#00a1e0",
    shortDesc:
      "Sync your leads directly to Salesforce. Automatically create contacts, log activities, and update deal stages without switching platforms.",
    fullDesc:
      "Sync your leads directly to Salesforce. Automatically create contacts, log activities, and update deal stages without switching platforms.",
    features: [
      "Two-way sync with Salesforce CRM",
      "Auto-create contacts and opportunities",
      "Log activities and calls automatically",
      "Update deal stages in real-time",
      "Advanced reporting and analytics",
    ],
    categories: ["Customer Relationship Management"],
    isYourApp: false,
    connected: false,
    statusBadge: null,
  },
  {
    id: "hubspot",
    name: "Hubspot CRM",
    icon: "simple-icons:hubspot",
    iconBg: "#fff5f0",
    iconColor: "#ff7a59",
    shortDesc:
      "Push qualified leads to HubSpot instantly. Track email opens, calls, and meetings all in one place with two-way sync.",
    fullDesc:
      "Push qualified leads to HubSpot instantly. Track email opens, calls, and meetings all in one place with two-way sync.",
    features: [
      "Push leads to HubSpot in one click",
      "Track email opens and link clicks",
      "Log calls and meetings automatically",
      "Two-way contact sync",
      "Connect HubSpot workflows",
    ],
    categories: ["Sales & Marketing"],
    isYourApp: false,
    connected: false,
    statusBadge: null,
  },
  {
    id: "outreach",
    name: "Outreach",
    icon: "material-symbols:send-outline",
    iconBg: "#f3f0ff",
    iconColor: "#7c3aed",
    shortDesc:
      "Automate your outreach sequences. Sends leads to Outreach and trigger multi-channel campaigns across email, phone, and LinkedIn.",
    fullDesc:
      "Automate your outreach sequences. Send leads to Outreach and trigger multi-channel campaigns across email, phone, and LinkedIn.",
    features: [
      "Enroll contacts in automated sequences",
      "Multi-channel outreach (email, phone, LinkedIn)",
      "A/B test messaging at scale",
      "Track engagement and responses",
      "Analyze sequence performance",
    ],
    categories: ["Sales & Marketing"],
    isYourApp: false,
    connected: false,
    statusBadge: null,
  },
  {
    id: "salesloft",
    name: "SalesLoft",
    icon: "material-symbols:forum-outline",
    iconBg: "#f0f6ff",
    iconColor: "#2f84fb",
    shortDesc:
      "Power your sales cadences with Turbo leads. Automatically enroll contacts in sequences and track engagement across all touchpoints.",
    fullDesc:
      "Power your sales cadences with Turbo leads. Automatically enroll contacts in sequences and track engagement across all touchpoints.",
    features: [
      "Automatically enroll Turbo leads in cadences",
      "Track engagement across all touchpoints",
      "Personalize outreach at scale",
      "Get coaching insights from calls",
      "Sync with your CRM automatically",
    ],
    categories: ["Sales & Marketing"],
    isYourApp: false,
    connected: false,
    statusBadge: null,
  },
  {
    id: "slack",
    name: "Slack",
    icon: "mdi:slack",
    iconBg: "#fdf4ff",
    iconColor: "#4a154b",
    shortDesc:
      "Get real-time notifications when leads engage. Share hot prospects with your team and collaborate on deals without switching apps.",
    fullDesc:
      "Send leads straight to your Pipedrive pipeline. Keep your sales process organized and track every interaction with your prospects.",
    features: [
      "Automatically sync leads to Pipedrive",
      "Track deal progress and pipeline stages",
      "Log all customer interactions automatically",
      "Get real-time notifications on deal updates",
      "Create custom fields and workflows",
    ],
    categories: ["Communication"],
    isYourApp: false,
    connected: true,
    statusBadge: "Called",
  },
]

const CATEGORIES = [
  "All apps",
  "Analytics",
  "Productivity",
  "Customer Relationship Management",
  "Sales & Marketing",
  "Communication",
]

const SYNC_FREQ_OPTIONS = [
  "Every 15 minutes",
  "Every 30 minutes",
  "Every hour",
  "Every 6 hours",
  "Every day",
]

/* ---- App icon component ---- */

function AppIcon({ app, size = "md" }: { app: AppItem; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "sm" ? "size-8" : size === "lg" ? "size-[52px]" : "size-[40px]"
  const iconSize = size === "sm" ? "text-[18px]" : size === "lg" ? "text-[28px]" : "text-[22px]"
  return (
    <div
      className={cn("rounded-[10px] flex items-center justify-center shrink-0", sizeClass)}
      style={{ backgroundColor: app.iconBg }}
    >
      <Icon icon={app.icon} className={iconSize} style={{ color: app.iconColor }} />
    </div>
  )
}

/* ---- Right panel ---- */

function AppPanel({ app, onClose }: { app: AppItem; onClose: () => void }) {
  const [syncFreq, setSyncFreq] = useState("Every hour")
  const [syncFreqOpen, setSyncFreqOpen] = useState(false)
  const [notifications, setNotifications] = useState({
    newLeads: false,
    statusChanges: false,
    dailySummary: false,
  })
  const syncRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (syncRef.current && !syncRef.current.contains(e.target as Node)) {
        setSyncFreqOpen(false)
      }
    }
    if (syncFreqOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [syncFreqOpen])

  return (
    <div className="fixed inset-y-0 right-0 w-[380px] bg-white shadow-[var(--shadow-sidebar)] z-50 flex flex-col overflow-hidden border-l border-[#f0f0f3]">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[#f0f0f3] shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <AppIcon app={app} size="lg" />
            <div>
              <h2 className="text-[16px] font-semibold text-[#101828]">{app.name}</h2>
              <p className="text-[12px] text-[#6a7282]">Description</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-7 flex items-center justify-center rounded-[6px] text-[#6a7282] hover:bg-[#f3f4f6] transition-colors"
          >
            <Icon icon="material-symbols:close-rounded" className="text-[18px]" />
          </button>
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#3f3f3f] leading-[1.6] mb-4">{app.fullDesc}</p>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {app.connected ? (
            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-[6px] bg-[#fef2f2] border border-[#fca5a5] text-[#dc2626] text-[13px] font-medium hover:bg-[#fee2e2] transition-colors">
              <Icon icon="material-symbols:link-off-rounded" className="text-[14px]" />
              Disconnect
            </button>
          ) : (
            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-[6px] bg-[#1160e1] text-white text-[13px] font-medium hover:bg-[#0e52c1] transition-colors">
              <Icon icon="material-symbols:lock-open-outline" className="text-[14px]" />
              Connect Account
            </button>
          )}
          <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-[6px] border border-[#d9d9d9] bg-white text-[13px] text-[#3f3f3f] hover:bg-[#f9f9f9] transition-colors">
            <Icon icon="material-symbols:open-in-new-rounded" className="text-[12px]" />
            App Website
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* Features */}
        <div className="px-5 py-4 border-b border-[#f0f0f3]">
          <p className="text-[12px] font-semibold text-[#101828] mb-3">Features & Capabilities</p>
          <ul className="flex flex-col gap-2">
            {app.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-[12px] text-[#3f3f3f]">
                <span className="size-[5px] rounded-full bg-[#6a7282] shrink-0 mt-[6px]" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="px-5 py-4 border-b border-[#f0f0f3]">
          <p className="text-[12px] font-semibold text-[#101828] mb-3">Categories</p>
          <div className="flex flex-wrap gap-2">
            {app.categories.map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-1 rounded-[6px] bg-[#f3f4f6] text-[12px] text-[#3f3f3f]"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div className="px-5 py-4">
          <p className="text-[12px] font-semibold text-[#101828] mb-4">Configuration</p>

          {/* Sync Frequency */}
          <div className="mb-4">
            <p className="text-[11px] text-[#6a7282] mb-2">Sync Frequency</p>
            <div className="relative" ref={syncRef}>
              <button
                onClick={() => setSyncFreqOpen((o) => !o)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-[6px] border border-[#d9d9d9] bg-white text-[13px] text-[#3f3f3f] hover:bg-[#f9f9f9] transition-colors"
              >
                <span>{syncFreq}</span>
                <Icon icon="material-symbols:keyboard-arrow-down" className="text-[14px] text-[#6a7282]" />
              </button>
              {syncFreqOpen && (
                <div className="absolute left-0 right-0 top-full mt-1 z-10 bg-white rounded-[8px] border border-[rgba(0,0,0,0.1)] shadow-[var(--shadow-card)] py-1">
                  {SYNC_FREQ_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSyncFreq(opt); setSyncFreqOpen(false) }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-[13px] hover:bg-[#f3f4f6] transition-colors",
                        opt === syncFreq ? "text-[#1160e1] font-medium" : "text-[#3f3f3f]"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-5">
            <p className="text-[11px] text-[#6a7282] mb-2">Notification Settings</p>
            <div className="flex flex-col gap-2">
              {[
                { key: "newLeads" as const,       label: "Notify on new leads"    },
                { key: "statusChanges" as const,  label: "Notify on status changes" },
                { key: "dailySummary" as const,   label: "Daily summary email"    },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={(e) => setNotifications((n) => ({ ...n, [key]: e.target.checked }))}
                    className="size-[14px] rounded accent-[#1160e1]"
                  />
                  <span className="text-[12px] text-[#3f3f3f]">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full py-2 rounded-[6px] bg-white border border-[#d9d9d9] text-[13px] text-[#3f3f3f] font-medium hover:bg-[#f9f9f9] transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---- Page ---- */

export default function ToolsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All apps")
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null)
  const categoryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryOpen(false)
      }
    }
    if (categoryOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [categoryOpen])

  function matchesFilter(app: AppItem) {
    const matchSearch =
      !search || app.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      category === "All apps" || app.categories.some((c) => c === category)
    return matchSearch && matchCategory
  }

  const yourApps = APPS.filter((a) => a.isYourApp && matchesFilter(a))
  const browseApps = APPS.filter((a) => !a.isYourApp && matchesFilter(a))

  return (
    <div className="min-h-full bg-[#f3f5f5]">
      {/* Page header */}
      <div className="px-7 pt-9 flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-semibold text-black">Integrated Tools</h1>
          <div className="flex items-center gap-1.5 mt-1 text-[13px]">
            <span className="text-[rgba(0,0,0,0.45)]">Home</span>
            <span className="text-[rgba(0,0,0,0.3)]">/</span>
            <span className="text-[#3f3f3f]">Integrated Tools</span>
          </div>
        </div>
        <div className="relative size-[36px] rounded-[10px] bg-[#eee] flex items-center justify-center shrink-0">
          <Icon icon="material-symbols:notifications-outline" className="text-[20px] text-[#3f3f3f]" />
          <span className="absolute top-1 left-[18px] size-[16px] rounded-full bg-[#fb2c36] flex items-center justify-center text-white text-[10px] leading-none">
            2
          </span>
        </div>
      </div>

      <div className="h-px bg-[rgba(0,0,0,0.1)] mt-6" />

      {/* Content */}
      <div className="px-7 py-6">
        {/* Apps section header */}
        <h2 className="text-[16px] font-semibold text-black mb-4">Apps</h2>

        {/* Search + filter row */}
        <div className="flex items-center gap-3 mb-6">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 rounded-[8px] border border-[#d9d9d9] bg-white px-3 py-2 max-w-[600px]">
            <Icon icon="material-symbols:search-rounded" className="text-[16px] text-[#9ca3af] shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by app name or category..."
              className="flex-1 text-[13px] bg-transparent outline-none text-[#3f3f3f] placeholder:text-[#9ca3af]"
            />
          </div>

          {/* Category dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setCategoryOpen((o) => !o)}
              className="flex items-center gap-2 px-3 py-2 rounded-[8px] border border-[#d9d9d9] bg-white text-[13px] text-[#3f3f3f] hover:bg-[#f9f9f9] transition-colors min-w-[130px]"
            >
              <span className="flex-1 text-left">{category}</span>
              <Icon icon="material-symbols:keyboard-arrow-down" className="text-[14px] text-[#6a7282] shrink-0" />
            </button>
            {categoryOpen && (
              <div className="absolute left-0 top-full mt-1 z-20 w-[260px] bg-white rounded-[8px] border border-[rgba(0,0,0,0.1)] shadow-[var(--shadow-card)] py-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); setCategoryOpen(false) }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-[13px] hover:bg-[#f3f4f6] transition-colors",
                      cat === category ? "text-[#1160e1] font-medium" : "text-[#3f3f3f]"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Your Apps */}
        {yourApps.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[14px] font-semibold text-black mb-3">Your Apps</h3>
            <div className="grid grid-cols-2 gap-3 max-w-[640px]">
              {yourApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-[10px] border bg-white text-left transition-colors",
                    selectedApp?.id === app.id
                      ? "border-[#1160e1] ring-1 ring-[#1160e1]/20"
                      : "border-[#f0f0f3] hover:border-[#d9d9d9]"
                  )}
                >
                  <AppIcon app={app} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#101828]">{app.name}</p>
                    <p className="text-[11px] text-[#6a7282] mt-0.5 line-clamp-2">{app.shortDesc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Browse Apps */}
        {browseApps.length > 0 && (
          <div>
            <h3 className="text-[14px] font-semibold text-black mb-3">Browse Apps</h3>
            <div className="bg-white rounded-[10px] border border-[#f0f0f3] overflow-hidden divide-y divide-[#f3f4f6]">
              {browseApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
                  className={cn(
                    "w-full flex items-center gap-3 px-5 py-4 text-left transition-colors",
                    selectedApp?.id === app.id
                      ? "bg-[#f0f6ff]"
                      : "hover:bg-[#fafafa]"
                  )}
                >
                  <AppIcon app={app} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[13px] font-medium text-[#101828]">{app.name}</span>
                      {app.statusBadge && (
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#dcfce7] border border-[#86efac] text-[11px] text-[#16a34a] font-medium">
                          {app.statusBadge}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#6a7282] leading-[1.4] truncate pr-4">
                      {app.shortDesc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {yourApps.length === 0 && browseApps.length === 0 && (
          <p className="text-[13px] text-[#6a7282] text-center py-10">
            No apps match your search.
          </p>
        )}
      </div>

      {/* App detail panel */}
      {selectedApp && (
        <AppPanel app={selectedApp} onClose={() => setSelectedApp(null)} />
      )}
    </div>
  )
}
