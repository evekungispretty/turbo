"use client"

import { useState, useRef, useEffect } from "react"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/turbo/status-badge"
import { Avatar } from "@/components/turbo/avatar"
import type { AccountData } from "@/lib/accounts-data"

type Tab = "updates" | "activity-log" | "files" | "account-detail"

const TABS: { id: Tab; label: string }[] = [
  { id: "updates",        label: "Updates" },
  { id: "activity-log",  label: "Activity Log" },
  { id: "files",         label: "Files" },
  { id: "account-detail", label: "Account Detail" },
]

const MORE_ACTIONS = ["Assign to", "Log activity", "Change Strategy"]

/* ---- Updates tab ---- */

function UpdatesTab({ account }: { account: AccountData }) {
  const [strategyOpen, setStrategyOpen] = useState(true)
  const [updateText, setUpdateText] = useState("")

  return (
    <div className="flex flex-col gap-0">
      {/* Value + Health Score */}
      <div className="px-4 pt-4 pb-3 border-b border-[#f3f4f6]">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-[11px] text-[#6a7282] mb-1">Account Value</p>
            <div className="flex items-center gap-1.5">
              <span className="text-[18px] font-semibold text-[#101828]">
                ${account.value.toLocaleString()}
              </span>
              <span className="flex items-center gap-0.5 text-[11px] text-[#00a63e]">
                <Icon icon="material-symbols:trending-up-rounded" className="text-[14px]" />
                {account.valueChange}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <p className="text-[11px] text-[#6a7282]">Health Score</p>
              <Icon icon="material-symbols:info-outline" className="text-[11px] text-[#9ca3af]" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-[6px] rounded-full bg-[#f3f4f6]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${account.healthScore}%`,
                    backgroundColor:
                      account.healthLevel === "great" ? "#00c950"
                      : account.healthLevel === "medium" ? "#f0b100"
                      : "#fb2c36",
                  }}
                />
              </div>
              <span
                className="text-[12px] font-medium shrink-0"
                style={{
                  color:
                    account.healthLevel === "great" ? "#00a63e"
                    : account.healthLevel === "medium" ? "#b45309"
                    : "#b91c1c",
                }}
              >
                {account.healthScore}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status + Last Contact */}
      <div className="px-4 py-3 border-b border-[#f3f4f6]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#6a7282] mb-1">Status</p>
            <StatusBadge status={account.dealStatus} />
          </div>
          <div className="text-right">
            <p className="text-[11px] text-[#6a7282] mb-1">Last Contact</p>
            <p className="text-[13px] text-[#101828]">{account.lastContact}</p>
          </div>
        </div>
      </div>

      {/* Last Activity + People */}
      <div className="px-4 py-3 border-b border-[#f3f4f6]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#6a7282] mb-1">Last Activity</p>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] text-[#101828]">{account.lastActivity}</span>
              <button className="text-[#9ca3af] hover:text-[#6a7282]">
                <Icon icon="material-symbols:edit-outline" className="text-[13px]" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-[#6a7282] mb-1">People</p>
            <div className="flex items-center gap-1.5 justify-end">
              <Avatar type="initials" initials={account.people[0]} color="blue" size="sm" />
              <span className="text-[13px] text-[#101828]">{account.people}</span>
              <button className="text-[#9ca3af] hover:text-[#6a7282]">
                <Icon icon="material-symbols:edit-outline" className="text-[13px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update textarea */}
      <div className="px-4 py-3 border-b border-[#f3f4f6]">
        <textarea
          value={updateText}
          onChange={(e) => setUpdateText(e.target.value)}
          placeholder="Write an update and mention others with @"
          className="w-full text-[13px] text-[#3f3f3f] placeholder:text-[#9ca3af] resize-none outline-none bg-transparent min-h-[52px]"
          rows={2}
        />
      </div>

      {/* Current Strategy */}
      <div className="px-4 py-3">
        <button
          className="flex items-center gap-1.5 w-full text-left mb-3"
          onClick={() => setStrategyOpen((o) => !o)}
        >
          <Icon
            icon={strategyOpen ? "material-symbols:keyboard-arrow-down" : "material-symbols:chevron-right"}
            className="text-[16px] text-[#6a7282]"
          />
          <span className="text-[13px] font-medium text-[#101828]">Current Strategy</span>
        </button>

        {strategyOpen && (
          <div className="flex flex-col gap-3 pl-5">
            <div>
              <p className="text-[13px] font-medium text-[#101828]">{account.strategy.title}</p>
              <p className="text-[11px] text-[#6a7282] mt-0.5">Updated {account.strategy.updatedAgo}</p>
            </div>

            <div className="flex items-start gap-2 rounded-[6px] bg-[#fffbeb] border border-[#fcd34d] px-3 py-2.5">
              <Icon icon="material-symbols:warning-outline-rounded" className="text-[14px] text-[#d97706] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-semibold text-[#92400e]">Strategy Suggestion:</p>
                <p className="text-[11px] text-[#d97706] mt-0.5 leading-[1.5]">{account.strategy.suggestion}</p>
              </div>
            </div>

            <button className="self-start flex items-center gap-1 px-3 py-1.5 rounded-[6px] border border-[#1160e1] text-[#1160e1] text-[12px] font-medium hover:bg-[#eff6ff] transition-colors">
              <Icon icon="material-symbols:add" className="text-[14px]" />
              Change Strategy
            </button>
          </div>
        )}
      </div>

      {/* Comments */}
      {account.comments.length > 0 && (
        <div className="border-t border-[#f3f4f6]">
          {account.comments.map((comment, i) => (
            <div key={i} className="px-4 py-3 border-b border-[#f3f4f6] last:border-b-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Avatar type="initials" initials={comment.initials} color="blue" size="sm" />
                  <span className="text-[12px] font-medium text-[#101828]">{comment.author}</span>
                  <span className="text-[11px] text-[#6a7282]">{comment.time}</span>
                </div>
                <button className="text-[#9ca3af] hover:text-[#6a7282]">
                  <Icon icon="material-symbols:more-horiz" className="text-[16px]" />
                </button>
              </div>
              <p className="text-[12px] text-[#3f3f3f] leading-[1.6] pl-7">{comment.text}</p>
              <div className="flex items-center gap-4 mt-2 pl-7">
                <button className="flex items-center gap-1 text-[11px] text-[#6a7282] hover:text-[#3f3f3f]">
                  <Icon icon="material-symbols:thumb-up-outline" className="text-[13px]" />
                  Like
                </button>
                <button className="flex items-center gap-1 text-[11px] text-[#6a7282] hover:text-[#3f3f3f]">
                  <Icon icon="material-symbols:reply-outline" className="text-[13px]" />
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---- Activity Log tab ---- */

const ACTIVITY_LOG = [
  {
    date: "Dec 18",
    initials: "CJ",
    description: "Account status changed: New → Contacted",
    tag: null,
  },
  {
    date: "Dec 18",
    initials: "CJ",
    description: "Added a file",
    tag: "File",
  },
]

function ActivityLogTab() {
  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#f3f4f6]">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[#d9d9d9] bg-white text-[12px] text-[#3f3f3f] hover:bg-[#f9f9f9]">
          <Icon icon="material-symbols:filter-list" className="text-[14px]" />
          Filter
          <Icon icon="material-symbols:keyboard-arrow-down" className="text-[12px]" />
        </button>
        <Button variant="secondary" size="md">
          <Icon icon="material-symbols:add" />
          Log Activity
        </Button>
      </div>

      {/* Timeline */}
      <div className="flex flex-col px-4 py-3 gap-3">
        {ACTIVITY_LOG.map((entry, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-[11px] text-[#6a7282] w-[36px] shrink-0 pt-0.5">{entry.date}</span>
            <Avatar type="initials" initials={entry.initials} color="blue" size="sm" />
            <div className="flex-1 flex items-center justify-between gap-2">
              <p className="text-[12px] text-[#3f3f3f] leading-[1.5]">{entry.description}</p>
              {entry.tag && (
                <span className="shrink-0 px-2 py-0.5 rounded-[4px] border border-[#d9d9d9] text-[11px] text-[#6a7282] bg-white">
                  {entry.tag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Files tab ---- */

const UPLOADED_FILES = [
  {
    name: "Proposal_AcmeLogistics_Q4_2024.pdf",
    size: "2.4 MB",
    by: "Sarah Jun",
    when: "2 days ago",
    type: "pdf",
  },
  {
    name: "ROI_Analysis_2024.xlsx",
    size: "342 KB",
    by: "Michael Chen",
    when: "1 week ago",
    type: "xlsx",
  },
]

function FilesTab() {
  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#f3f4f6]">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[#d9d9d9] bg-white text-[12px] text-[#3f3f3f] hover:bg-[#f9f9f9]">
          <Icon icon="material-symbols:filter-list" className="text-[14px]" />
          Filter
          <Icon icon="material-symbols:keyboard-arrow-down" className="text-[12px]" />
        </button>
        <Button variant="secondary" size="md">
          <Icon icon="material-symbols:upload-rounded" />
          Upload
        </Button>
      </div>

      {/* File list */}
      <div className="px-4 py-3">
        <p className="text-[11px] font-medium text-[#6a7282] mb-3">Uploaded Files</p>
        <div className="flex flex-col gap-3">
          {UPLOADED_FILES.map((file) => (
            <div key={file.name} className="flex items-center gap-3 group">
              <div className="shrink-0">
                {file.type === "pdf" ? (
                  <div className="size-8 rounded-[6px] bg-[#fef2f2] flex items-center justify-center">
                    <Icon icon="material-symbols:picture-as-pdf-outline" className="text-[16px] text-[#dc2626]" />
                  </div>
                ) : (
                  <div className="size-8 rounded-[6px] bg-[#f0fdf4] flex items-center justify-center">
                    <Icon icon="material-symbols:table-chart-outline" className="text-[16px] text-[#16a34a]" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-[#101828] truncate">{file.name}</p>
                <p className="text-[11px] text-[#6a7282]">
                  {file.size} • by {file.by} • {file.when}
                </p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="size-7 flex items-center justify-center rounded-[4px] text-[#6a7282] hover:bg-[#f3f4f6]">
                  <Icon icon="material-symbols:download-rounded" className="text-[16px]" />
                </button>
                <button className="size-7 flex items-center justify-center rounded-[4px] text-[#6a7282] hover:bg-[#fef2f2] hover:text-[#dc2626]">
                  <Icon icon="material-symbols:delete-outline-rounded" className="text-[16px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---- Account Detail tab ---- */

function AccountDetailTab({ account }: { account: AccountData }) {
  const [editingTitle, setEditingTitle] = useState(false)
  const [titleValue, setTitleValue] = useState(account.title)
  const [noteText, setNoteText] = useState("")

  const DETAIL_FIELDS = [
    { icon: "material-symbols:domain-outline", label: "Company",      value: account.company },
    { icon: "material-symbols:tag",            label: "Channel",       value: account.channel },
    { icon: "material-symbols:tag",            label: "ID",            value: account.externalId },
    { icon: "material-symbols:phone-outline",  label: "Phone number",  value: account.detailPhone },
    { icon: "material-symbols:location-on-outline", label: "Address", value: account.address },
  ]

  return (
    <div className="flex flex-col">
      {/* Avatar + Edit */}
      <div className="px-4 pt-4 pb-3 border-b border-[#f3f4f6]">
        <div className="flex items-center gap-3">
          <Avatar type="initials" initials={account.contactInitials} color={account.contactColor} size="lg" />
          <div>
            <p className="text-[14px] font-semibold text-[#101828]">{account.contactName}</p>
            <button className="text-[12px] text-[#1160e1] hover:underline">Edit</button>
          </div>
        </div>
      </div>

      {/* Title field (editable inline) */}
      <div className="px-4 py-3 border-b border-[#f3f4f6]">
        <div className="flex items-start gap-3">
          <Icon icon="material-symbols:person-outline" className="text-[16px] text-[#6a7282] mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-[11px] text-[#6a7282] mb-1">Title</p>
            {editingTitle ? (
              <div className="flex items-center gap-1">
                <input
                  autoFocus
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                  className="flex-1 border border-[#1160e1] rounded-[4px] px-2 py-1 text-[13px] text-[#101828] outline-none focus:ring-2 focus:ring-[#1160e1]/20"
                />
                <button
                  onClick={() => setEditingTitle(false)}
                  className="size-6 flex items-center justify-center text-[#1160e1]"
                >
                  <Icon icon="material-symbols:check-rounded" className="text-[16px]" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between group">
                <p className="text-[13px] text-[#101828]">{titleValue}</p>
                <button
                  onClick={() => setEditingTitle(true)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9ca3af] hover:text-[#6a7282]"
                >
                  <Icon icon="material-symbols:edit-outline" className="text-[14px]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Other detail fields */}
      {DETAIL_FIELDS.map((field) => (
        <div key={field.label} className="px-4 py-3 border-b border-[#f3f4f6]">
          <div className="flex items-start gap-3 group">
            <Icon icon={field.icon} className="text-[16px] text-[#6a7282] mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-[#6a7282] mb-1">{field.label}</p>
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-[#101828] leading-[1.4]">{field.value}</p>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[#9ca3af] hover:text-[#6a7282] shrink-0 ml-2">
                  <Icon icon="material-symbols:edit-outline" className="text-[14px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add new attribute */}
      <div className="px-4 py-2 border-b border-[#f3f4f6]">
        <button className="flex items-center gap-1 text-[12px] text-[#1160e1] hover:text-[#0e52c1]">
          <Icon icon="material-symbols:add" className="text-[14px]" />
          Add new attribute
        </button>
      </div>

      {/* Notes */}
      <div className="px-4 py-3">
        <p className="text-[13px] font-medium text-[#101828] mb-2">Notes</p>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write a note..."
          className="w-full min-h-[72px] rounded-[6px] border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] text-[#3f3f3f] placeholder:text-[#9ca3af] resize-none outline-none focus:border-[#1160e1] focus:ring-1 focus:ring-[#1160e1]/20"
          rows={3}
        />
        <div className="flex items-center justify-between mt-2">
          <button className="text-[#6a7282] hover:text-[#3f3f3f]">
            <Icon icon="material-symbols:attach-file" className="text-[18px]" />
          </button>
          <Button variant="secondary" size="md" disabled={!noteText.trim()}>
            Add Note
          </Button>
        </div>

        {/* Existing note */}
        <div className="mt-3 pt-3 border-t border-[#f3f4f6]">
          <div className="flex items-center gap-2 mb-1">
            <Avatar type="initials" initials="Y" color="blue" size="sm" />
            <span className="text-[12px] font-medium text-[#101828]">You</span>
            <span className="text-[11px] text-[#6a7282]">Feb 23, 18:43</span>
          </div>
          <p className="text-[12px] text-[#3f3f3f] leading-[1.5] pl-7">
            Send Sarah an update by email by...
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---- Main drawer ---- */

interface AccountDrawerProps {
  account: AccountData
  onClose: () => void
}

export function AccountDrawer({ account, onClose }: AccountDrawerProps) {
  const [activeTab, setActiveTab] = useState<Tab>("updates")
  const [moreActionsOpen, setMoreActionsOpen] = useState(false)
  const moreActionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreActionsRef.current && !moreActionsRef.current.contains(e.target as Node)) {
        setMoreActionsOpen(false)
      }
    }
    if (moreActionsOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [moreActionsOpen])

  // Reset tab when account changes
  useEffect(() => {
    setActiveTab("updates")
  }, [account.id])

  return (
    <div className="fixed inset-y-0 right-0 w-[390px] bg-white shadow-[var(--shadow-sidebar)] z-50 flex flex-col overflow-hidden border-l border-[#f0f0f3]">
      {/* Critical alert banner */}
      {account.criticalAlert && (
        <div className="flex items-start gap-2 px-4 py-3 bg-[#fef2f2] border-b border-[#fca5a5] shrink-0">
          <Icon icon="material-symbols:error-outline-rounded" className="text-[16px] text-[#dc2626] shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-semibold text-[#991b1b] uppercase tracking-wide">Critical Alert</p>
            <p className="text-[11px] text-[#991b1b] mt-0.5 leading-[1.4]">{account.criticalAlert}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-4 pt-4 pb-0 shrink-0">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-[16px] font-semibold text-[#101828]">{account.contactName}</h2>
            <p className="text-[12px] text-[#6a7282] mt-0.5">{account.role}</p>
          </div>
          <button
            onClick={onClose}
            className="size-7 flex items-center justify-center rounded-[6px] text-[#6a7282] hover:bg-[#f3f4f6] transition-colors"
          >
            <Icon icon="material-symbols:close-rounded" className="text-[18px]" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 mt-3 mb-4">
          <Button variant="primary" size="md">
            <Icon icon="material-symbols:chat-outline" />
            Go to Chat
          </Button>
          <div className="relative" ref={moreActionsRef}>
            <Button
              variant="secondary"
              size="md"
              onClick={() => setMoreActionsOpen((o) => !o)}
            >
              More Actions
              <Icon icon="material-symbols:keyboard-arrow-down" />
            </Button>
            {moreActionsOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 w-[160px] bg-white rounded-[8px] border border-[rgba(0,0,0,0.1)] shadow-[var(--shadow-card)] py-1">
                {MORE_ACTIONS.map((action) => (
                  <button
                    key={action}
                    className="w-full text-left px-3 py-2 text-[13px] text-[#3f3f3f] hover:bg-[#f3f4f6] transition-colors"
                    onClick={() => setMoreActionsOpen(false)}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-[#f0f0f3] -mx-4 px-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-2 text-[13px] whitespace-nowrap transition-colors border-b-2 -mb-px",
                activeTab === tab.id
                  ? "text-[#1160e1] border-[#1160e1] font-medium"
                  : "text-[#6a7282] border-transparent hover:text-[#3f3f3f]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "updates"        && <UpdatesTab account={account} />}
        {activeTab === "activity-log"   && <ActivityLogTab />}
        {activeTab === "files"          && <FilesTab />}
        {activeTab === "account-detail" && <AccountDetailTab account={account} />}
      </div>
    </div>
  )
}
