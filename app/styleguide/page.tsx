"use client"

import { useState } from "react"
import { Icon } from "@iconify/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/turbo/input"
import { Textarea } from "@/components/turbo/textarea"
import { Checkbox } from "@/components/turbo/checkbox"
import { Radio } from "@/components/turbo/radio"
import { Switch } from "@/components/turbo/switch"
import { Avatar } from "@/components/turbo/avatar"
import { StatusBadge } from "@/components/turbo/status-badge"
import { Chip } from "@/components/turbo/chip"
import { HealthScoreBadge } from "@/components/turbo/health-score-badge"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[18px] font-semibold text-[#3f3f3f] border-b border-[#f3f4f6] pb-2">{title}</h2>
      {children}
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-medium uppercase tracking-wider text-[#6a7282]">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export default function StyleguidePage() {
  const [chip1, setChip1] = useState(false)
  const [chip2, setChip2] = useState(true)
  const [chip3, setChip3] = useState(false)
  const [cbChecked, setCbChecked] = useState(false)
  const [radioVal, setRadioVal] = useState("a")
  const [switchOn, setSwitchOn] = useState(false)

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h1 className="text-[28px] font-bold text-[#3f3f3f] mb-1">Turbo — Component Styleguide</h1>
          <p className="text-[14px] text-[#7b7b7b]">Batch 1 · 10 leaf primitives</p>
        </div>

        {/* ─── 1. Button ─────────────────────────────────────────── */}
        <Section title="1 · Button">
          <Row label="variant × size=sm">
            <Button variant="primary" size="sm">Primary</Button>
            <Button variant="secondary" size="sm">Secondary</Button>
            <Button variant="tertiary" size="sm">Tertiary</Button>
            <Button variant="danger" size="sm">Danger</Button>
          </Row>
          <Row label="variant × size=md">
            <Button variant="primary" size="md">
              <Icon icon="material-symbols:add" />
              Primary
            </Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="tertiary" size="md">Tertiary</Button>
            <Button variant="danger" size="md">Danger</Button>
          </Row>
          <Row label="variant × size=lg">
            <Button variant="primary" size="lg">
              Edit
              <Icon icon="material-symbols:arrow-outward" />
            </Button>
            <Button variant="secondary" size="lg">Secondary</Button>
            <Button variant="tertiary" size="lg">Tertiary</Button>
          </Row>
          <Row label="size=icon">
            <Button variant="primary" size="icon">
              <Icon icon="material-symbols:add" />
            </Button>
            <Button variant="secondary" size="icon">
              <Icon icon="material-symbols:edit-outline" />
            </Button>
            <Button variant="tertiary" size="icon">
              <Icon icon="material-symbols:more-horiz" />
            </Button>
          </Row>
          <Row label="disabled">
            <Button variant="primary" size="md" disabled>Primary</Button>
            <Button variant="secondary" size="md" disabled>Secondary</Button>
            <Button variant="tertiary" size="md" disabled>Tertiary</Button>
          </Row>
        </Section>

        {/* ─── 2. Input ──────────────────────────────────────────── */}
        <Section title="2 · Input">
          <Row label="default">
            <div className="w-64">
              <Input placeholder="Search ID numbers, companies or names…" />
            </div>
          </Row>
          <Row label="with left icon">
            <div className="w-64">
              <Input
                leftIcon={<Icon icon="material-symbols:search-rounded" />}
                placeholder="Search…"
              />
            </div>
          </Row>
          <Row label="filled">
            <div className="w-64">
              <Input defaultValue="Acme Corp" />
            </div>
          </Row>
          <Row label="disabled">
            <div className="w-64">
              <Input placeholder="Disabled" disabled />
            </div>
          </Row>
        </Section>

        {/* ─── 3. Textarea ───────────────────────────────────────── */}
        <Section title="3 · Textarea">
          <Row label="default">
            <div className="w-64">
              <Textarea placeholder="Add a note…" rows={3} />
            </div>
          </Row>
          <Row label="filled">
            <div className="w-64">
              <Textarea defaultValue="Follow up on Q3 renewal proposal sent last week." rows={3} />
            </div>
          </Row>
          <Row label="disabled">
            <div className="w-64">
              <Textarea placeholder="Disabled" rows={3} disabled />
            </div>
          </Row>
        </Section>

        {/* ─── 4. Checkbox ───────────────────────────────────────── */}
        <Section title="4 · Checkbox">
          <Row label="unchecked / checked / disabled">
            <Checkbox
              checked={cbChecked}
              onCheckedChange={setCbChecked}
              label="Select account"
            />
            <Checkbox checked label="Checked" />
            <Checkbox disabled label="Disabled" />
            <Checkbox checked disabled label="Checked disabled" />
          </Row>
        </Section>

        {/* ─── 5. Radio ──────────────────────────────────────────── */}
        <Section title="5 · Radio">
          <Row label="options">
            <Radio
              value={radioVal}
              onValueChange={setRadioVal}
              options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
                { value: "c", label: "Option C" },
                { value: "d", label: "Disabled", disabled: true },
              ]}
            />
          </Row>
        </Section>

        {/* ─── 6. Switch ─────────────────────────────────────────── */}
        <Section title="6 · Switch">
          <Row label="off / on / disabled">
            <Switch
              checked={switchOn}
              onCheckedChange={setSwitchOn}
              label={switchOn ? "On" : "Off"}
            />
            <Switch checked label="Always on" />
            <Switch disabled label="Disabled off" />
            <Switch checked disabled label="Disabled on" />
          </Row>
        </Section>

        {/* ─── 7. Avatar ─────────────────────────────────────────── */}
        <Section title="7 · Avatar">
          <Row label="type=image, sizes sm/md/lg">
            <Avatar type="image" src="https://i.pravatar.cc/80?img=1" size="sm" alt="User" />
            <Avatar type="image" src="https://i.pravatar.cc/80?img=1" size="md" alt="User" />
            <Avatar type="image" src="https://i.pravatar.cc/80?img=1" size="lg" alt="User" />
          </Row>
          <Row label="type=image + notification dot">
            <Avatar type="image" src="https://i.pravatar.cc/80?img=2" size="md" notification alt="User" />
            <Avatar type="image" src="https://i.pravatar.cc/80?img=2" size="lg" notification alt="User" />
          </Row>
          <Row label="type=initials, colors">
            <Avatar type="initials" initials="JC" color="blue" size="md" />
            <Avatar type="initials" initials="ID" color="purple" size="md" />
            <Avatar type="initials" initials="D" color="green" size="md" />
          </Row>
          <Row label="type=initials + notification">
            <Avatar type="initials" initials="JC" color="blue" size="md" notification />
          </Row>
        </Section>

        {/* ─── 8. StatusBadge ────────────────────────────────────── */}
        <Section title="8 · StatusBadge">
          <Row label="all 13 statuses">
            <StatusBadge status="no-response" />
            <StatusBadge status="qualified" />
            <StatusBadge status="interested" />
            <StatusBadge status="nurture" />
            <StatusBadge status="meeting-scheduled" />
            <StatusBadge status="not-interested" />
            <StatusBadge status="proposal-sent" />
            <StatusBadge status="closed-won" />
            <StatusBadge status="negotiation" />
            <StatusBadge status="demo-completed" />
            <StatusBadge status="new" />
            <StatusBadge status="contacted" />
            <StatusBadge status="in-progress" />
          </Row>
        </Section>

        {/* ─── 9. Chip ───────────────────────────────────────────── */}
        <Section title="9 · Chip">
          <Row label="selected=false / true (click to toggle)">
            <Chip selected={chip1} onClick={() => setChip1((v) => !v)}>All (7)</Chip>
            <Chip selected={chip2} onClick={() => setChip2((v) => !v)}>Active (3)</Chip>
            <Chip selected={chip3} onClick={() => setChip3((v) => !v)}>At Risk (1)</Chip>
          </Row>
        </Section>

        {/* ─── 10. HealthScoreBadge ──────────────────────────────── */}
        <Section title="10 · HealthScoreBadge">
          <Row label="size=long">
            <div className="w-56">
              <HealthScoreBadge health="great" score="85%" size="long" />
            </div>
            <div className="w-56">
              <HealthScoreBadge health="medium" score="62%" size="long" />
            </div>
            <div className="w-56">
              <HealthScoreBadge health="bad" score="23%" size="long" />
            </div>
          </Row>
          <Row label="size=short">
            <div className="w-32">
              <HealthScoreBadge health="great" score="85%" size="short" />
            </div>
            <div className="w-32">
              <HealthScoreBadge health="medium" score="62%" size="short" />
            </div>
            <div className="w-32">
              <HealthScoreBadge health="bad" score="23%" size="short" />
            </div>
          </Row>
        </Section>
      </div>
    </div>
  )
}
