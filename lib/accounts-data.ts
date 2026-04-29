import type { StatusBadgeStatus } from "@/components/turbo/status-badge"
import type { AvatarColor } from "@/components/turbo/avatar"

export type TagType = "role" | "size" | "industry"

export interface Prompt {
  id: number
  text: string
  accounts: number
  lastViewed: string
  tags: { label: string; type: TagType }[]
}

export const PROMPTS: Prompt[] = [
  {
    id: 1,
    text: "Supply Chain VP, logistics companies, B2B, multi-location",
    accounts: 28,
    lastViewed: "2 hours ago",
    tags: [
      { label: "VP",           type: "role"     },
      { label: "Enterprise",   type: "size"     },
      { label: "Logistics",    type: "industry" },
      { label: "Supply Chain", type: "industry" },
    ],
  },
  {
    id: 2,
    text: "Investment Manager, wealth management firms, 50-200 employees",
    accounts: 37,
    lastViewed: "2 days ago",
    tags: [
      { label: "Manager",    type: "role"     },
      { label: "Mid-market", type: "size"     },
      { label: "Logistics",  type: "industry" },
      { label: "Finance",    type: "industry" },
    ],
  },
  {
    id: 3,
    text: "CTO or VP Engineering, AI/machine learning startups, Series A-C funded",
    accounts: 14,
    lastViewed: "9 days ago",
    tags: [
      { label: "CTO",        type: "role"     },
      { label: "VP",         type: "role"     },
      { label: "Start-up",   type: "size"     },
      { label: "Technology", type: "industry" },
      { label: "AI/ML",      type: "industry" },
    ],
  },
  {
    id: 4,
    text: "Operations Director, automotive manufacturing, Fortune 500",
    accounts: 14,
    lastViewed: "10 days ago",
    tags: [
      { label: "Director",      type: "role"     },
      { label: "Enterprise",    type: "size"     },
      { label: "Automotive",    type: "industry" },
      { label: "Manufacturing", type: "industry" },
    ],
  },
  {
    id: 5,
    text: "Head of Customer Experience, subscription box companies, venture-backed",
    accounts: 14,
    lastViewed: "14 days ago",
    tags: [
      { label: "Director",               type: "role"     },
      { label: "VP Customer Experience", type: "role"     },
      { label: "Mid-market",             type: "size"     },
      { label: "E-commerce",             type: "industry" },
      { label: "Retail",                 type: "industry" },
    ],
  },
]

export type ActivityStatus = "new" | "in-progress" | "qualified" | "interested" | "contacted"

export const ACTIVITY_STATUS_CONFIG: Record<
  ActivityStatus,
  { label: string; bg: string; border: string; text: string }
> = {
  "new":         { label: "New",         bg: "#fcdcdc", border: "#f8b7b7", text: "#660101" },
  "in-progress": { label: "In Progress", bg: "#dce6fc", border: "#b7c3f8", text: "#010466" },
  "qualified":   { label: "Qualified",   bg: "#fdc8e1", border: "#ff85b0", text: "#a90237" },
  "interested":  { label: "Interested",  bg: "#dbeafe", border: "#bedbff", text: "#193cb8" },
  "contacted":   { label: "Contacted",   bg: "#e8dcfc", border: "#d6b7f8", text: "#320166" },
}

export interface AccountData {
  id: string
  // Table columns
  accountName: string
  contactName: string
  contactInitials: string
  contactColor: AvatarColor
  email: string
  phone: string
  timezone: string
  location: string
  activityStatus: ActivityStatus
  value: number
  healthScore: number
  healthLevel: "great" | "medium" | "bad"
  // Drawer header
  role: string
  criticalAlert?: string
  // Updates tab
  valueChange: string
  dealStatus: StatusBadgeStatus
  lastContact: string
  lastActivity: string
  people: string
  strategy: {
    title: string
    updatedAgo: string
    suggestion: string
  }
  comments: Array<{
    author: string
    initials: string
    time: string
    text: string
  }>
  // Account Detail tab
  title: string
  company: string
  channel: string
  externalId: string
  detailPhone: string
  address: string
}

export const MOCK_ACCOUNTS: AccountData[] = [
  {
    id: "1",
    accountName: "Intuit",
    contactName: "Sandra Keith",
    contactInitials: "SK",
    contactColor: "purple",
    email: "abcd@gmail.com",
    phone: "+1 000 000 0000",
    timezone: "EST UTC-5",
    location: "Maryland, US",
    activityStatus: "new",
    value: 145000,
    healthScore: 85,
    healthLevel: "great",
    role: "IT Lead",
    valueChange: "+12%",
    dealStatus: "meeting-scheduled",
    lastContact: "2 days ago",
    lastActivity: "Called",
    people: "Sarah",
    strategy: {
      title: "Value-first - Share case studies and ROI data",
      updatedAgo: "3 days ago",
      suggestion:
        "Health score is low. Consider changing to a multi-threading approach or escalating to executive sponsor.",
    },
    comments: [
      {
        author: "Clarie Johnson",
        initials: "CJ",
        time: "3 hours ago",
        text: "FYI - Bryan opened the proposal email but hasn't responded yet. Planning to send a soft follow-up tomorrow afternoon.",
      },
    ],
    title: "VP of Engineering",
    company: "TechCore Solutions",
    channel: "WhatsApp",
    externalId: "2023113142356",
    detailPhone: "+6267076228012",
    address: "5467 Richmond View Suite 511, Sunrise, Kentucky, 43346-6636",
  },
  {
    id: "2",
    accountName: "Petco",
    contactName: "Dave Miller",
    contactInitials: "DM",
    contactColor: "green",
    email: "abcd@gmail.com",
    phone: "+1 000 000 0000",
    timezone: "EST UTC-5",
    location: "Maryland, US",
    activityStatus: "new",
    value: 145000,
    healthScore: 85,
    healthLevel: "great",
    role: "Supply Chain Manager",
    valueChange: "+8%",
    dealStatus: "meeting-scheduled",
    lastContact: "5 days ago",
    lastActivity: "Email sent",
    people: "Michael",
    strategy: {
      title: "Relationship-first - Build executive sponsorship",
      updatedAgo: "1 week ago",
      suggestion: "Consider scheduling a product demo to accelerate the deal.",
    },
    comments: [],
    title: "Supply Chain Director",
    company: "Petco",
    channel: "Email",
    externalId: "2023113142357",
    detailPhone: "+1 310 555 0123",
    address: "123 Main Street, San Diego, California, 92101",
  },
  {
    id: "3",
    accountName: "Global Retail Co",
    contactName: "Michael Chen",
    contactInitials: "MC",
    contactColor: "blue",
    email: "m.chen@globalretail.com",
    phone: "+1 555 123 4567",
    timezone: "PST UTC-8",
    location: "California, US",
    activityStatus: "in-progress",
    value: 220000,
    healthScore: 28,
    healthLevel: "bad",
    criticalAlert:
      "Global Retail Co health score has dropped 35 points in the last week. No contact in 5 days.",
    role: "IT Lead",
    valueChange: "-5%",
    dealStatus: "in-progress",
    lastContact: "5 days ago",
    lastActivity: "Meeting",
    people: "Sarah",
    strategy: {
      title: "Technical-first - Lead with integration capabilities",
      updatedAgo: "2 days ago",
      suggestion: "Urgent: Reach out immediately. Risk of deal going cold.",
    },
    comments: [],
    title: "CTO",
    company: "Global Retail Co",
    channel: "LinkedIn",
    externalId: "2023113142358",
    detailPhone: "+1 555 123 4567",
    address: "456 Tech Blvd, San Francisco, California, 94105",
  },
  {
    id: "4",
    accountName: "Acme Logistics",
    contactName: "Olivia Robles",
    contactInitials: "OR",
    contactColor: "purple",
    email: "olivia@acmelogistics.com",
    phone: "+1 555 234 5678",
    timezone: "CST UTC-6",
    location: "Texas, US",
    activityStatus: "new",
    value: 145000,
    healthScore: 72,
    healthLevel: "medium",
    role: "IT Lead",
    valueChange: "+8%",
    dealStatus: "meeting-scheduled",
    lastContact: "2 days ago",
    lastActivity: "Called",
    people: "Sarah",
    strategy: {
      title: "Value-first - Share case studies and ROI data",
      updatedAgo: "3 days ago",
      suggestion:
        "Health score is low. Consider changing to a multi-threading approach or escalating to executive sponsor.",
    },
    comments: [
      {
        author: "Clarie Johnson",
        initials: "CJ",
        time: "3 hours ago",
        text: "FYI - Bryan opened the proposal email but hasn't responded yet. Planning to send a soft follow-up tomorrow afternoon.",
      },
    ],
    title: "VP of Information Technology",
    company: "Acme Logistics",
    channel: "LinkedIn",
    externalId: "MBP2024001",
    detailPhone: "+1 555 234 5678",
    address: "789 Commerce Blvd, Austin, Texas, 78701",
  },
]
