"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/turbo/input"
import { PROMPTS, type TagType } from "@/lib/accounts-data"

const tagColors: Record<TagType, { bg: string; text: string }> = {
  role:     { bg: "#eff6ff", text: "#1d4ed8" },
  size:     { bg: "#f0fdf4", text: "#15803d" },
  industry: { bg: "#fff7ed", text: "#c2410c" },
}

export default function AccountSelectionPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const filtered = PROMPTS.filter((p) =>
    p.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-full bg-[#f3f5f5]">
      {/* Header */}
      <div className="px-7 pt-9 flex items-center justify-between">
        <h1 className="text-[20px] font-semibold text-black">Account Selection</h1>
        <div className="relative size-[36px] rounded-[10px] bg-[#eee] flex items-center justify-center shrink-0">
          <Icon icon="material-symbols:notifications-outline" className="text-[20px] text-[#3f3f3f]" />
          <span className="absolute top-1 left-[18px] size-[16px] rounded-full bg-[#fb2c36] flex items-center justify-center text-white text-[10px] leading-none">2</span>
        </div>
      </div>

      <div className="h-px bg-[rgba(0,0,0,0.1)] mt-6" />

      {/* Content */}
      <div className="px-7 py-6">
        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-semibold text-black">Your Prompts</h2>
          <Link href="/accounts/new">
            <Button variant="primary" size="md">
              <Icon icon="material-symbols:add" />
              Start a new search
            </Button>
          </Link>
        </div>

        {/* Search + sort row */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-full max-w-[500px]">
            <Input
              leftIcon={<Icon icon="material-symbols:search-rounded" />}
              placeholder="Search ID numbers, companies or names..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            <span className="text-[13px] text-[#6a7282]">Sort by</span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#d9d9d9] rounded-[6px] bg-white text-[13px] text-[rgba(0,0,0,0.85)] shadow-[0_2px_0_rgba(0,0,0,0.02)]">
              Date created
              <Icon icon="material-symbols:keyboard-arrow-down" className="text-[14px]" />
            </button>
          </div>
        </div>

        {/* Prompts list */}
        <div className="bg-white rounded-[10px] overflow-hidden divide-y divide-[rgba(0,0,0,0.06)]">
          {filtered.map((prompt) => (
            <div
              key={prompt.id}
              onClick={() => router.push(`/accounts/${prompt.id}`)}
              className={cn(
                "flex items-start justify-between px-6 py-4 cursor-pointer transition-colors",
                "hover:bg-[#fafafa]"
              )}
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[14px] font-medium text-[#101828]">{prompt.text}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[12px] text-[#1d4ed8] font-medium whitespace-nowrap">
                    {prompt.accounts} accounts
                  </span>
                </div>
                <p className="text-[12px] text-[#6a7282] mt-1">Last viewed {prompt.lastViewed}</p>
                <div className="flex items-center gap-2 flex-wrap mt-2">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="px-2 py-0.5 rounded-[4px] text-[11px] font-medium"
                      style={{
                        backgroundColor: tagColors[tag.type].bg,
                        color: tagColors[tag.type].text,
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-[#6a7282] hover:text-[#3f3f3f] transition-colors mt-1 shrink-0"
              >
                <Icon icon="material-symbols:more-horiz" className="text-[20px]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
