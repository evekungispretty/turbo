"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/* ---- Types ---- */

interface WizardState {
  jobTitlesInclude: string[]
  jobTitlesExclude: string[]
  managementLevels: string[]
  departments: string[]
  locations: string[]
  companyTypes: string[]
  industries: string[]
  marketingSegments: string[]
  businessModels: string[]
  employeeMin: string
  employeeMax: string
  executivesOnly: boolean
  ownershipConflicts: boolean
  excludeChildCompanies: boolean
  crmDuplicates: boolean
  optOuts: boolean
}

const INITIAL: WizardState = {
  jobTitlesInclude: ["VP", "Director"],
  jobTitlesExclude: [],
  managementLevels: ["Manager", "VP", "C-Levels"],
  departments: [],
  locations: [],
  companyTypes: ["Mid-market", "Enterprise"],
  industries: ["Technology", "Retail"],
  marketingSegments: [],
  businessModels: ["B2B"],
  employeeMin: "8",
  employeeMax: "16",
  executivesOnly: false,
  ownershipConflicts: false,
  excludeChildCompanies: false,
  crmDuplicates: false,
  optOuts: false,
}

const STEPS = [
  { id: 1, label: "Define Ideal Contact", icon: "material-symbols:person-outline" },
  { id: 2, label: "Set Company Criteria",  icon: "material-symbols:apartment" },
  { id: 3, label: "Refine Your Search",    icon: "material-symbols:tune" },
]

const MANAGEMENT_LEVELS = ["Manager", "Non-manager", "VP", "C-Levels", "Board Members"]
const COMPANY_TYPES      = ["Start-up", "Small Business", "Mid-market", "Enterprise"]
const INDUSTRIES         = ["Technology", "Retail", "Automobile", "Media", "Finance", "Education", "Healthcare"]
const MARKETING_SEGMENTS = ["Start-up", "Small Business", "Mid-market", "Enterprise"]
const BUSINESS_MODELS    = ["B2B", "B2C", "B2G"]
const DEPARTMENTS        = ["Sales", "Marketing", "Engineering", "Finance", "Operations", "HR"]

/* ---- Small helpers ---- */

function ToggleChip({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-[6px] text-[13px] border transition-colors",
        selected
          ? "bg-[#1160e1] text-white border-[#1160e1]"
          : "bg-white text-[#3f3f3f] border-[#d9d9d9] hover:bg-[#f5f5f5]"
      )}
    >
      {label}
    </button>
  )
}

function TagInput({
  tags, onAdd, onRemove, placeholder,
}: {
  tags: string[]
  onAdd: (v: string) => void
  onRemove: (v: string) => void
  placeholder: string
}) {
  const [input, setInput] = useState("")

  function handleAdd() {
    const v = input.trim()
    if (v && !tags.includes(v)) {
      onAdd(v)
      setInput("")
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg border border-[rgba(0,0,0,0.1)] bg-white px-3 py-2 text-[13px] text-[#3f3f3f] placeholder:text-[#868686] outline-none focus:border-[#1160e1] focus:ring-2 focus:ring-[#1160e1]/20"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAdd() } }}
        />
        <Button variant="secondary" size="md" onClick={handleAdd} type="button">
          <Icon icon="material-symbols:add" />
          Add
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#d9d9d9] bg-white text-[12px] text-[#3f3f3f]"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemove(tag)}
                className="text-[#6a7282] hover:text-[#3f3f3f]"
              >
                <Icon icon="material-symbols:close" className="text-[12px]" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[10px] border border-[#f0f0f3] p-6">
      <p className="text-[15px] font-semibold text-[#1c1d21] mb-1">{title}</p>
      {subtitle && <p className="text-[13px] text-[#8181a5] mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </div>
  )
}

/* ---- Preview panel ---- */

function PreviewPanel({ state }: { state: WizardState }) {
  const mgmt = state.managementLevels.length
    ? state.managementLevels.join(", ")
    : "Any"
  const companies = state.companyTypes.length
    ? state.companyTypes.join(", ")
    : "Any"
  const biz = state.businessModels.length
    ? state.businessModels.join(", ")
    : ""
  const emp = state.employeeMin || state.employeeMax
    ? `${state.employeeMin}k - ${state.employeeMax}k`
    : ""

  const parts = [
    mgmt !== "Any" && `at ${mgmt} level`,
    companies !== "Any" && `at ${companies} companies`,
    biz && `with ${biz} model`,
    emp && `with ${state.employeeMin}-${state.employeeMax}k employees`,
  ].filter(Boolean)

  const previewText = parts.join(" • ") || "Fill in the form to see your prompt preview"

  return (
    <div className="flex flex-col gap-4">
      {/* Prompt preview box */}
      <div className="bg-white rounded-[10px] border border-[rgba(43,141,254,0.2)] p-4">
        <p className="text-[13px] text-[#3f3f3f] leading-[1.7]">{previewText}</p>
      </div>

      {/* Summary */}
      <div>
        <p className="text-[11px] font-semibold tracking-[0.08em] text-[#8181a5] uppercase mb-3">Summary</p>
        <div className="flex flex-col gap-2">
          {[
            { label: "Job Titles",       value: state.jobTitlesInclude.join(", ") || "Any" },
            { label: "Management Levels", value: mgmt },
            { label: "Company Types",    value: companies },
            { label: "Employee Count",   value: emp || "Any" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-[8px] border border-[#f0f0f3] px-4 py-3">
              <p className="text-[11px] text-[#8181a5]">{label}</p>
              <p className="text-[13px] font-medium text-[#1c1d21] mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="bg-[#eff6ff] rounded-[10px] border border-[rgba(43,141,254,0.2)] px-4 py-3 flex items-start gap-2">
        <Icon icon="material-symbols:info-outline" className="text-[16px] text-[#1160e1] shrink-0 mt-0.5" />
        <div>
          <p className="text-[12px] font-semibold text-[#1c1d21]">Tip</p>
          <p className="text-[12px] text-[#1160e1] mt-0.5 leading-[1.6]">
            The more specific your criteria, the better Turbo can match your ideal customer profile
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---- Step content ---- */

function Step1({ state, update }: { state: WizardState; update: (patch: Partial<WizardState>) => void }) {
  function toggleMgmt(level: string) {
    update({
      managementLevels: state.managementLevels.includes(level)
        ? state.managementLevels.filter((l) => l !== level)
        : [...state.managementLevels, level],
    })
  }
  function toggleDept(dept: string) {
    update({
      departments: state.departments.includes(dept)
        ? state.departments.filter((d) => d !== dept)
        : [...state.departments, dept],
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionCard title="Job Titles to Include" subtitle="Enter specific job titles you want to target">
        <TagInput
          tags={state.jobTitlesInclude}
          onAdd={(v) => update({ jobTitlesInclude: [...state.jobTitlesInclude, v] })}
          onRemove={(v) => update({ jobTitlesInclude: state.jobTitlesInclude.filter((t) => t !== v) })}
          placeholder="e.g., VP of Sales, PR Manager"
        />
      </SectionCard>

      <SectionCard title="Job Titles to Exclude" subtitle="Specify job titles you want to exclude from results">
        <TagInput
          tags={state.jobTitlesExclude}
          onAdd={(v) => update({ jobTitlesExclude: [...state.jobTitlesExclude, v] })}
          onRemove={(v) => update({ jobTitlesExclude: state.jobTitlesExclude.filter((t) => t !== v) })}
          placeholder="e.g., Assistant, Intern"
        />
      </SectionCard>

      <SectionCard title="Management Level" subtitle="Select the seniority levels you want to target">
        <div className="flex items-center gap-2 flex-wrap">
          {MANAGEMENT_LEVELS.map((level) => (
            <ToggleChip
              key={level}
              label={level}
              selected={state.managementLevels.includes(level)}
              onClick={() => toggleMgmt(level)}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Department (Optional)" subtitle="Filter by specific departments">
        <div className="flex items-center gap-2 flex-wrap">
          {DEPARTMENTS.map((dept) => (
            <ToggleChip
              key={dept}
              label={dept}
              selected={state.departments.includes(dept)}
              onClick={() => toggleDept(dept)}
            />
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

function Step2({ state, update }: { state: WizardState; update: (patch: Partial<WizardState>) => void }) {
  function toggle<K extends "companyTypes" | "industries" | "marketingSegments" | "businessModels">(
    key: K, value: string
  ) {
    const arr = state[key] as string[]
    update({
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    } as Partial<WizardState>)
  }

  return (
    <div className="flex flex-col gap-4">
      <SectionCard title="Location Preference" subtitle="Add specific locations, cities, states, or countries">
        <TagInput
          tags={state.locations}
          onAdd={(v) => update({ locations: [...state.locations, v] })}
          onRemove={(v) => update({ locations: state.locations.filter((l) => l !== v) })}
          placeholder="e.g., New York, California, United States"
        />
      </SectionCard>

      <SectionCard title="Company Type" subtitle="Select company size segments">
        <div className="flex items-center gap-2 flex-wrap">
          {COMPANY_TYPES.map((type) => (
            <ToggleChip
              key={type}
              label={type}
              selected={state.companyTypes.includes(type)}
              onClick={() => toggle("companyTypes", type)}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Primary Industries" subtitle="Select target industries (optional)">
        <div className="flex items-center gap-2 flex-wrap">
          {INDUSTRIES.map((ind) => (
            <ToggleChip
              key={ind}
              label={ind}
              selected={state.industries.includes(ind)}
              onClick={() => toggle("industries", ind)}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Marketing Segments" subtitle="Public or private companies">
        <div className="flex items-center gap-2 flex-wrap">
          {MARKETING_SEGMENTS.map((seg) => (
            <ToggleChip
              key={seg}
              label={seg}
              selected={state.marketingSegments.includes(seg)}
              onClick={() => toggle("marketingSegments", seg)}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Business Model" subtitle="Select target business models">
        <div className="flex items-center gap-2 flex-wrap">
          {BUSINESS_MODELS.map((bm) => (
            <ToggleChip
              key={bm}
              label={bm}
              selected={state.businessModels.includes(bm)}
              onClick={() => toggle("businessModels", bm)}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Employee Count" subtitle="Select company size segments">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-[11px] text-[#8181a5] mb-1.5">Minimum (k)</p>
            <input
              type="number"
              value={state.employeeMin}
              onChange={(e) => update({ employeeMin: e.target.value })}
              className="w-[100px] rounded-lg border border-[rgba(0,0,0,0.1)] bg-white px-3 py-2 text-[14px] text-[#3f3f3f] outline-none focus:border-[#1160e1] focus:ring-2 focus:ring-[#1160e1]/20"
            />
          </div>
          <span className="text-[#8181a5] mt-5">—</span>
          <div>
            <p className="text-[11px] text-[#8181a5] mb-1.5">Maximum (k)</p>
            <input
              type="number"
              value={state.employeeMax}
              onChange={(e) => update({ employeeMax: e.target.value })}
              className="w-[100px] rounded-lg border border-[rgba(0,0,0,0.1)] bg-white px-3 py-2 text-[14px] text-[#3f3f3f] outline-none focus:border-[#1160e1] focus:ring-2 focus:ring-[#1160e1]/20"
            />
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

const REFINEMENTS: Array<{
  key: keyof Pick<WizardState, "executivesOnly" | "ownershipConflicts" | "excludeChildCompanies" | "crmDuplicates" | "optOuts">
  label: string
  description: string
  badge?: { text: string; color: string; bg: string }
  info?: boolean
}> = [
  {
    key: "executivesOnly",
    label: "Executives Only",
    description: "Only show C-level executives and senior leadership roles",
    badge: { text: "Premium", color: "#6941c6", bg: "#f4f0ff" },
  },
  {
    key: "ownershipConflicts",
    label: "Check for Internal Ownership Conflicts",
    description: "Exclude accounts with potential internal conflicts",
    info: true,
  },
  {
    key: "excludeChildCompanies",
    label: "Exclude Child Companies with Parent Companies",
    description: "Only show parent companies, hiding subsidiaries",
  },
  {
    key: "crmDuplicates",
    label: "Check for CRM Duplicates",
    description: "Cross-reference with your CRM to avoid duplicate outreach",
    badge: { text: "Recommended", color: "#15803d", bg: "#dcfce7" },
    info: true,
  },
  {
    key: "optOuts",
    label: "Check for Opt-Outs",
    description: "Exclude contacts who have opted out of communications",
    badge: { text: "Recommended", color: "#15803d", bg: "#dcfce7" },
  },
]

function Step3({ state, update }: { state: WizardState; update: (patch: Partial<WizardState>) => void }) {
  return (
    <div className="bg-white rounded-[10px] border border-[#f0f0f3] p-6">
      <p className="text-[15px] font-semibold text-[#1c1d21] mb-1">Job Titles to Include</p>
      <p className="text-[13px] text-[#8181a5] mb-5">Enter specific job titles you want to target</p>
      <div className="flex flex-col gap-4">
        {REFINEMENTS.map(({ key, label, description, badge, info }) => (
          <label key={key} className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={state[key] as boolean}
              onChange={(e) => update({ [key]: e.target.checked } as Partial<WizardState>)}
              className="mt-0.5 size-4 shrink-0 accent-[#1160e1]"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[14px] font-medium text-[#1c1d21]">{label}</span>
                {badge && (
                  <span
                    className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                    style={{ backgroundColor: badge.bg, color: badge.color }}
                  >
                    {badge.text}
                  </span>
                )}
                {info && (
                  <Icon icon="material-symbols:info-outline" className="text-[14px] text-[#8181a5]" />
                )}
              </div>
              <p className="text-[12px] text-[#8181a5] mt-0.5">{description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

/* ---- Stepper ---- */

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, i) => {
        const done   = step.id < current
        const active = step.id === current

        return (
          <div key={step.id} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "size-8 rounded-full flex items-center justify-center shrink-0 border-2",
                  done   ? "bg-[#1160e1] border-[#1160e1]" :
                  active ? "bg-[#1160e1] border-[#1160e1]" :
                           "bg-white border-[#d9d9d9]"
                )}
              >
                {done ? (
                  <Icon icon="material-symbols:check-rounded" className="text-[16px] text-white" />
                ) : (
                  <Icon
                    icon={step.icon}
                    className={cn("text-[16px]", active ? "text-white" : "text-[#8181a5]")}
                  />
                )}
              </div>
              <span
                className={cn(
                  "text-[13px] whitespace-nowrap",
                  active || done ? "text-[#1160e1] font-medium" : "text-[#8181a5]"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <Icon
                icon="material-symbols:chevron-right-rounded"
                className={cn("text-[18px] shrink-0", done ? "text-[#1160e1]" : "text-[#d9d9d9]")}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ---- Page ---- */

export default function NewPromptPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [state, setState] = useState<WizardState>(INITIAL)

  function update(patch: Partial<WizardState>) {
    setState((prev) => ({ ...prev, ...patch }))
  }

  function next() {
    if (step < 3) setStep((s) => s + 1)
    else router.push("/accounts")
  }

  function back() {
    if (step > 1) setStep((s) => s - 1)
    else router.push("/accounts")
  }

  return (
    <div className="min-h-full bg-[#f3f5f5]">
      {/* Header */}
      <div className="px-7 pt-9 flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-semibold text-black">Account Selection</h1>
          <div className="flex items-center gap-1.5 mt-1 text-[13px]">
            <Link href="/accounts" className="text-[rgba(0,0,0,0.45)] hover:text-[#1160e1]">
              Account Selection
            </Link>
            <span className="text-[rgba(0,0,0,0.3)]">/</span>
            <span className="text-[#3f3f3f]">Add a new prompt</span>
          </div>
        </div>
        <div className="relative size-[36px] rounded-[10px] bg-[#eee] flex items-center justify-center shrink-0">
          <Icon icon="material-symbols:notifications-outline" className="text-[20px] text-[#3f3f3f]" />
          <span className="absolute top-1 left-[18px] size-[16px] rounded-full bg-[#fb2c36] flex items-center justify-center text-white text-[10px] leading-none">2</span>
        </div>
      </div>

      <div className="h-px bg-[rgba(0,0,0,0.1)] mt-6" />

      {/* Two-column layout */}
      <div className="flex gap-6 px-7 py-6 items-start">
        {/* Left: form */}
        <div className="flex-1 min-w-0">
          <h2 className="text-[22px] font-semibold text-[#1c1d21] mb-1">Create New Prompt</h2>
          <p className="text-[14px] text-[#8181a5] mb-6">
            Tell us what you&apos;re looking for and Turbo will gather ideal accounts for you
          </p>

          {/* Stepper */}
          <div className="mb-6">
            <Stepper current={step} />
          </div>

          {/* Step content */}
          {step === 1 && <Step1 state={state} update={update} />}
          {step === 2 && <Step2 state={state} update={update} />}
          {step === 3 && <Step3 state={state} update={update} />}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button variant="secondary" size="md" onClick={back} type="button">
              <Icon icon="material-symbols:chevron-left-rounded" />
              Back
            </Button>
            <Button variant="primary" size="md" onClick={next} type="button">
              {step < 3 ? (
                <>
                  Next
                  <Icon icon="material-symbols:chevron-right-rounded" />
                </>
              ) : (
                "Generate Results"
              )}
            </Button>
          </div>
        </div>

        {/* Right: sticky preview panel */}
        <div className="w-[320px] shrink-0 sticky top-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon icon="material-symbols:auto-awesome" className="text-[18px] text-[#1160e1]" />
            <span className="text-[15px] font-semibold text-[#1c1d21]">Prompt Preview</span>
          </div>
          <PreviewPanel state={state} />
        </div>
      </div>
    </div>
  )
}
