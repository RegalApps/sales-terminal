"use client"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  Clock,
  Phone,
  CheckCircle,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  User,
  Activity,
  Briefcase,
  Award,
  Linkedin,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

// Types for our lead data
type LeadStatus =
  | { type: "viewed_demo"; time: string }
  | { type: "opened_email"; time: string }
  | { type: "downloaded_whitepaper" }
  | { type: "form_submission"; time: string }
  | { type: "booked_demo"; time: string }
  | { type: "closed_deal"; amount: number; time: string }

type ScoreType = "hot" | "warm" | "new" | "closed"

// New type for research points
type ResearchPoint = {
  type: "hire" | "funding" | "executive" | "social" | "tech" | "news"
  title: string
  detail: string
  date: string
}

type Lead = {
  id: string
  name: string
  company: string
  position: string
  score: ScoreType
  status: LeadStatus
  value?: number
  lastContacted?: string
  researchPoints: ResearchPoint[] // Added research points
}

// Sample data for companies and positions
const companies = [
  "Acme Corp",
  "TechGrowth",
  "Global Solutions",
  "Innovate Inc",
  "Quantum Systems",
  "Apex Industries",
  "Stellar Tech",
  "Horizon Software",
  "Pinnacle Solutions",
  "Elevate Digital",
  "Fusion Technologies",
  "Catalyst Corp",
]

const positions = [
  "VP Sales",
  "CTO",
  "Director",
  "CMO",
  "CEO",
  "COO",
  "Sales Manager",
  "Product Manager",
  "Marketing Director",
  "Head of Growth",
]

const firstNames = [
  "Sarah",
  "Michael",
  "Alex",
  "Emily",
  "David",
  "Jessica",
  "James",
  "Olivia",
  "Daniel",
  "Sophia",
  "Robert",
  "Emma",
  "William",
  "Ava",
  "John",
  "Isabella",
  "Richard",
  "Mia",
  "Henry",
  "Joanna",
  "Francois",
  "Anderson",
  "Mike",
  "Victor",
  "Ali",
  "Jenny",
  "Sean",
]

const lastNames = [
  "Johnson",
  "Chen",
  "Rodriguez",
  "Watson",
  "Smith",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "O'Larry",
  "Stuart",
  "Mehmud",
  "Yang",
  "Carr",
  "Johanson",
  "Heid",
  "Khaled",
]

// Sample research points
const hireResearchPoints = [
  "Hired Azure Cosmos DB specialist",
  "Brought on ex-Google ML engineer",
  "New AWS architect joined",
  "Hired Salesforce integration expert",
  "Brought on Kubernetes specialist",
  "New React Native developer",
  "Hired former Microsoft AI researcher",
  "New data science team lead",
]

const fundingResearchPoints = [
  "Raised $12M Series A",
  "Closed $25M funding round",
  "Secured $8M seed funding",
  "Announced $40M Series B",
  "Raised $5M from strategic investors",
  "Closed $15M growth round",
  "Secured $30M in new funding",
]

const executiveResearchPoints = [
  "New VP of Engineering",
  "Appointed CTO from Amazon",
  "New Chief Product Officer",
  "Hired VP of Sales from competitor",
  "New CIO with cloud expertise",
  "Appointed Director of AI",
  "New Head of Customer Success",
]

const socialResearchPoints = [
  "LinkedIn post about digital transformation",
  "CEO shared article on cloud migration",
  "Posted about AI implementation success",
  "Shared case study on data analytics",
  "LinkedIn update on team expansion",
  "Posted about industry award win",
  "Shared thoughts on remote work tools",
]

const techResearchPoints = [
  "Moving from Oracle to cloud databases",
  "Implementing microservices architecture",
  "Exploring AI for customer service",
  "Migrating to containerized infrastructure",
  "Evaluating new CRM solutions",
  "Investing in data analytics platform",
  "Building internal developer platform",
]

const newsResearchPoints = [
  "Featured in TechCrunch article",
  "Mentioned in industry report",
  "Announced new product launch",
  "Opening new office location",
  "Partnered with major tech vendor",
  "Won industry innovation award",
  "Expanding into new market segment",
]

// Function to generate random research points
function generateResearchPoints(company: string): ResearchPoint[] {
  const numPoints = Math.floor(Math.random() * 3) + 1 // 1-3 research points
  const points: ResearchPoint[] = []

  const types: Array<"hire" | "funding" | "executive" | "social" | "tech" | "news"> = [
    "hire",
    "funding",
    "executive",
    "social",
    "tech",
    "news",
  ]
  const usedTypes = new Set<string>()

  for (let i = 0; i < numPoints; i++) {
    // Pick a type that hasn't been used yet
    let type: "hire" | "funding" | "executive" | "social" | "tech" | "news"
    do {
      type = types[Math.floor(Math.random() * types.length)]
    } while (usedTypes.has(type))
    usedTypes.add(type)

    let title = ""
    let detail = ""

    switch (type) {
      case "hire":
        title = hireResearchPoints[Math.floor(Math.random() * hireResearchPoints.length)]
        detail = `${company} recently strengthened their technical team with this strategic hire.`
        break
      case "funding":
        title = fundingResearchPoints[Math.floor(Math.random() * fundingResearchPoints.length)]
        detail = `This new capital will accelerate their product development and market expansion.`
        break
      case "executive":
        title = executiveResearchPoints[Math.floor(Math.random() * executiveResearchPoints.length)]
        detail = `This leadership change signals their focus on technical innovation and growth.`
        break
      case "social":
        title = socialResearchPoints[Math.floor(Math.random() * socialResearchPoints.length)]
        detail = `This indicates their current priorities and challenges they're addressing.`
        break
      case "tech":
        title = techResearchPoints[Math.floor(Math.random() * techResearchPoints.length)]
        detail = `This technology shift presents an opportunity for our solution to add value.`
        break
      case "news":
        title = newsResearchPoints[Math.floor(Math.random() * newsResearchPoints.length)]
        detail = `This recent development shows their current business trajectory and focus.`
        break
    }

    // Random date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30) + 1
    const date = `${daysAgo}d ago`

    points.push({ type, title, detail, date })
  }

  return points
}

// Function to generate a random lead
function generateRandomLead(): Lead {
  const id = Math.random().toString(36).substring(2, 10)
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const company = companies[Math.floor(Math.random() * companies.length)]
  const position = positions[Math.floor(Math.random() * positions.length)]
  const value = Math.floor(Math.random() * 10000) + 3000

  // Random score with weighted distribution
  const scoreRandom = Math.random()
  let score: ScoreType
  if (scoreRandom < 0.3) score = "hot"
  else if (scoreRandom < 0.6) score = "warm"
  else if (scoreRandom < 0.9) score = "new"
  else score = "closed"

  // Random status based on score
  let status: LeadStatus
  const timeAgo = `${Math.floor(Math.random() * 24)}h ago`
  const daysAgo = `${Math.floor(Math.random() * 7) + 1}d ago`
  const lastContacted = Math.random() < 0.3 ? `${Math.floor(Math.random() * 2) + 1} months ago` : undefined

  if (score === "hot") {
    const statusRandom = Math.random()
    if (statusRandom < 0.5) {
      status = { type: "viewed_demo", time: timeAgo }
    } else {
      status = { type: "booked_demo", time: timeAgo }
    }
  } else if (score === "warm") {
    const statusRandom = Math.random()
    if (statusRandom < 0.5) {
      status = { type: "opened_email", time: daysAgo }
    } else {
      status = { type: "downloaded_whitepaper" }
    }
  } else if (score === "new") {
    status = { type: "form_submission", time: daysAgo }
  } else {
    // Closed deals
    const amount = Math.floor(Math.random() * 50000) + 10000
    status = { type: "closed_deal", amount, time: daysAgo }
  }

  // Generate research points
  const researchPoints = generateResearchPoints(company)

  return {
    id,
    name: `${firstName} ${lastName}`,
    company,
    position,
    score,
    status,
    value,
    lastContacted,
    researchPoints,
  }
}

// Initial leads with research points
const initialLeads: Lead[] = [
  {
    id: "1",
    name: "Henry O'Larry",
    company: "Acme Corp",
    position: "VP Sales",
    score: "hot",
    status: { type: "viewed_demo", time: "2h ago" },
    value: 10000,
    researchPoints: [
      {
        type: "hire",
        title: "Hired Azure Cosmos DB specialist",
        detail:
          "Acme Corp recently strengthened their technical team with this strategic hire, indicating a shift toward cloud-native databases.",
        date: "5d ago",
      },
      {
        type: "social",
        title: "LinkedIn post about digital transformation",
        detail:
          "Henry shared thoughts on their digital transformation journey, highlighting challenges with legacy systems.",
        date: "2d ago",
      },
    ],
  },
  {
    id: "2",
    name: "Joanna Stuart",
    company: "TechGrowth",
    position: "CTO",
    score: "hot",
    status: { type: "opened_email", time: "1d ago" },
    value: 12000,
    researchPoints: [
      {
        type: "funding",
        title: "Closed $25M funding round",
        detail:
          "This new capital will accelerate their product development and market expansion, creating urgency for new technology solutions.",
        date: "7d ago",
      },
      {
        type: "tech",
        title: "Implementing microservices architecture",
        detail:
          "This technology shift presents an opportunity for our solution to add value in their new distributed environment.",
        date: "14d ago",
      },
    ],
  },
  {
    id: "3",
    name: "Francois Mehmud",
    company: "Global Solutions",
    position: "Director",
    score: "hot",
    status: { type: "downloaded_whitepaper" },
    value: 9000,
    researchPoints: [
      {
        type: "executive",
        title: "New VP of Engineering",
        detail:
          "This leadership change signals their focus on technical innovation and growth, with the new VP coming from a company that uses our competitor.",
        date: "10d ago",
      },
    ],
  },
  {
    id: "4",
    name: "Anderson Yang",
    company: "Innovate Inc",
    position: "CMO",
    score: "hot",
    status: { type: "form_submission", time: "3d ago" },
    value: 12000,
    researchPoints: [
      {
        type: "news",
        title: "Announced new product launch",
        detail:
          "Their new product will require robust data processing capabilities that our platform excels at providing.",
        date: "3d ago",
      },
      {
        type: "social",
        title: "CEO shared article on cloud migration",
        detail: "Their CEO is publicly discussing cloud migration challenges, which our solution directly addresses.",
        date: "1d ago",
      },
    ],
  },
  {
    id: "5",
    name: "Mike Carr",
    company: "Quantum Systems",
    position: "CEO",
    score: "warm",
    status: { type: "viewed_demo", time: "1d ago" },
    value: 7000,
    researchPoints: [
      {
        type: "tech",
        title: "Evaluating new CRM solutions",
        detail:
          "This technology evaluation presents an opportunity for our integration capabilities to add significant value.",
        date: "8d ago",
      },
    ],
  },
  {
    id: "6",
    name: "Emily Johanson",
    company: "Apex Industries",
    position: "COO",
    score: "warm",
    status: { type: "booked_demo", time: "3h ago" },
    value: 7000,
    lastContacted: "2 months ago",
    researchPoints: [
      {
        type: "hire",
        title: "Brought on Kubernetes specialist",
        detail:
          "Apex Industries is investing in container orchestration expertise, signaling a move toward cloud-native applications.",
        date: "12d ago",
      },
      {
        type: "funding",
        title: "Secured $8M seed funding",
        detail:
          "This new capital will accelerate their product development and market expansion, creating urgency for new technology solutions.",
        date: "20d ago",
      },
    ],
  },
  {
    id: "7",
    name: "Victor Heid",
    company: "Stellar Tech",
    position: "Sales Manager",
    score: "warm",
    status: { type: "opened_email", time: "5h ago" },
    value: 7000,
    researchPoints: [
      {
        type: "executive",
        title: "Appointed Director of AI",
        detail:
          "This new leadership role indicates their strategic investment in AI capabilities, which our platform can enhance.",
        date: "15d ago",
      },
    ],
  },
  {
    id: "8",
    name: "Ali Khaled",
    company: "Horizon Software",
    position: "Product Manager",
    score: "warm",
    status: { type: "downloaded_whitepaper" },
    value: 7000,
    researchPoints: [
      {
        type: "news",
        title: "Partnered with major tech vendor",
        detail:
          "Their new partnership creates an integration opportunity for our platform to provide additional value.",
        date: "4d ago",
      },
    ],
  },
  {
    id: "9",
    name: "Jenny Smith",
    company: "Pinnacle Solutions",
    position: "Marketing Director",
    score: "hot",
    status: { type: "booked_demo", time: "1h ago" },
    value: 15000,
    researchPoints: [
      {
        type: "social",
        title: "Posted about AI implementation success",
        detail:
          "Jenny shared their successful AI implementation, highlighting areas where our solution could provide additional capabilities.",
        date: "2d ago",
      },
      {
        type: "tech",
        title: "Investing in data analytics platform",
        detail:
          "This technology investment aligns perfectly with our platform's analytics capabilities and integration features.",
        date: "9d ago",
      },
    ],
  },
]

// Update the styling to make it more cohesive with a terminal vibe

// 1. Update the ScoreBadge component to match the terminal style
function ScoreBadge({ score }: { score: ScoreType }) {
  switch (score) {
    case "hot":
      return (
        <Badge
          variant="outline"
          className="bg-[#333] text-red-400 border-[#444] font-normal rounded-none px-1.5 py-0 h-4 text-[10px] uppercase"
        >
          Hot
        </Badge>
      )
    case "warm":
      return (
        <Badge
          variant="outline"
          className="bg-[#333] text-amber-400 border-[#444] font-normal rounded-none px-1.5 py-0 h-4 text-[10px] uppercase"
        >
          Warm
        </Badge>
      )
    case "new":
      return (
        <Badge
          variant="outline"
          className="bg-[#333] text-blue-400 border-[#444] font-normal rounded-none px-1.5 py-0 h-4 text-[10px] uppercase"
        >
          New
        </Badge>
      )
    case "closed":
      return (
        <Badge
          variant="outline"
          className="bg-[#333] text-green-400 border-[#444] font-normal rounded-none px-1.5 py-0 h-4 text-[10px] uppercase"
        >
          Closed
        </Badge>
      )
  }
}

// 2. Update the LeadStatus component to match the terminal style
function LeadStatus({ status }: { status: LeadStatus }) {
  switch (status.type) {
    case "viewed_demo":
      return (
        <div className="flex items-center gap-1.5 text-[#777] text-[10px] uppercase">
          <Clock className="h-3 w-3 text-[#777]" />
          <span>Viewed demo ({status.time})</span>
        </div>
      )
    case "opened_email":
      return (
        <div className="flex items-center gap-1.5 text-[#777] text-[10px] uppercase">
          <Clock className="h-3 w-3 text-[#777]" />
          <span>Opened email ({status.time})</span>
        </div>
      )
    case "downloaded_whitepaper":
      return (
        <div className="flex items-center gap-1.5 text-[#777] text-[10px] uppercase">
          <Clock className="h-3 w-3 text-[#777]" />
          <span>Downloaded whitepaper</span>
        </div>
      )
    case "form_submission":
      return (
        <div className="flex items-center gap-1.5 text-[#777] text-[10px] uppercase">
          <Clock className="h-3 w-3 text-[#777]" />
          <span>Form submission ({status.time})</span>
        </div>
      )
    case "booked_demo":
      return (
        <div className="flex items-center gap-1.5 text-blue-400 text-[10px] uppercase">
          <Calendar className="h-3 w-3" />
          <span>Booked demo ({status.time})</span>
        </div>
      )
    case "closed_deal":
      return (
        <div className="flex items-center gap-1.5 text-green-400 text-[10px] uppercase">
          <DollarSign className="h-3 w-3" />
          <span>
            ${status.amount.toLocaleString()} ({status.time})
          </span>
        </div>
      )
  }
}

// Component to render research point icon
function ResearchPointIcon({ type }: { type: ResearchPoint["type"] }) {
  switch (type) {
    case "hire":
      return <Briefcase className="h-3 w-3 text-blue-400" />
    case "funding":
      return <DollarSign className="h-3 w-3 text-green-400" />
    case "executive":
      return <Award className="h-3 w-3 text-purple-400" />
    case "social":
      return <Linkedin className="h-3 w-3 text-blue-500" />
    case "tech":
      return <Activity className="h-3 w-3 text-amber-400" />
    case "news":
      return <FileText className="h-3 w-3 text-gray-400" />
  }
}

export default function SmartCallQueue() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [activeTab, setActiveTab] = useState("high-priority")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isBattleOpen, setIsBattleOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const leadsPerPage = 10
  const battleRef = useRef<HTMLDivElement>(null)

  // Add a new lead every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newLead = generateRandomLead()
      setLeads((prevLeads) => [newLead, ...prevLeads].slice(0, 50)) // Keep max 50 leads
    }, 10000) // Add a new lead every 10 seconds

    return () => clearInterval(interval)
  }, [])

  // Close battle panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (battleRef.current && !battleRef.current.contains(event.target as Node)) {
        setIsBattleOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter leads based on active tab and search query
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchQuery === "" ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.position.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false

    if (activeTab === "high-priority") return lead.score === "hot"
    if (activeTab === "new-leads") return lead.score === "new"
    if (activeTab === "closed-deals") return lead.score === "closed"
    return true // "all-leads"
  })

  // Paginate leads
  const indexOfLastLead = currentPage * leadsPerPage
  const indexOfFirstLead = indexOfLastLead - leadsPerPage
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead)
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage)

  // Calculate metrics for the dashboard
  const totalDealsProcessed = leads.filter((lead) => lead.score === "closed").length
  const totalHotLeads = leads.filter((lead) => lead.score === "hot").length
  const totalValue = leads.reduce((sum, lead) => sum + (lead.value || 0), 0)
  const targetValue = 812500
  const progressPercentage = (totalValue / targetValue) * 100

  // Handle selecting a lead for the battle cards
  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead)
    setIsBattleOpen(true)
  }

  // 3. Update the main component's return statement to make buttons smaller and more terminal-like
  // Replace the return statement with the following:
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col font-mono">
      {/* Terminal-style dashboard */}
      <div className="bg-[#1a1a1a] text-[#b3b3b3] p-4 font-mono">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#333333] px-3 py-1 text-[12px] uppercase">YOUR THRED AGENT IS WORKING</div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="border-[#444] bg-[#333] text-[#b3b3b3] hover:bg-[#222] hover:text-[#b3b3b3] rounded-none h-6 text-[10px] px-2 uppercase"
                onClick={() => setIsBattleOpen(!isBattleOpen)}
              >
                {isBattleOpen ? <ChevronRight className="h-3 w-3 mr-1" /> : <ChevronLeft className="h-3 w-3 mr-1" />}
                Battle
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-[#777] text-[10px] uppercase">LEADING IN SALES</div>
              </div>
              <div className="mb-4 text-[12px] uppercase">
                AGENT PROCESSED ALL DEALS {totalDealsProcessed}/4 BY 7:00 PM
              </div>

              <div className="flex mb-4">
                <div className="w-24 text-right pr-4">
                  <div className="text-[#b3b3b3] text-[12px]">$43000</div>
                </div>
                <div>
                  <div className="text-[#777] text-[12px]">HENRY O&apos;LARRY</div>
                  <div className="text-[#777] text-[12px]">JOANNA STUART</div>
                  <div className="text-[#777] text-[12px]">FRANCOIS MEHMUD</div>
                  <div className="text-[#777] text-[12px]">ANDERSON YANG</div>
                </div>
              </div>

              <div className="mb-6 text-[12px] uppercase">150% QUOTA 1.5X</div>

              <div className="flex items-center gap-2 mb-2">
                <div className="text-[#777] text-[10px] uppercase">5 DEALS IN PIPELINE</div>
              </div>
              <div className="mb-4 text-[12px] uppercase">AGENT NOTIFIED SEAN 4 HOT & 1 COLD BY 7:00 PM</div>

              <div className="flex mb-4">
                <div className="w-24 text-right pr-4">
                  <div className="text-[#b3b3b3] text-[12px]">$7000</div>
                </div>
                <div>
                  <div className="text-[#777] text-[12px]">MIKE CARR</div>
                  <div className="text-[#777] text-[12px]">EMILY JOHANSON</div>
                  <div className="text-[#777] text-[12px]">VICTOR HEID</div>
                  <div className="text-[#777] text-[12px]">ALI KHALED</div>
                </div>
              </div>

              <div className="flex mb-4">
                <div className="w-24 text-right pr-4">
                  <div className="text-[#b3b3b3] text-[12px]">$3000</div>
                </div>
                <div>
                  <div className="text-[#777] text-[12px]">
                    EMILY JOHANSON LAST CONTACTED
                    <br />2 MONTHS AGO
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4 text-[12px] uppercase">2X ACCELERATOR</div>
              <div className="h-4 bg-[#333] mb-2">
                <div className="h-full bg-[#b3b3b3]" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="mb-6 text-[12px]">
                ${totalValue.toLocaleString()} / ${targetValue.toLocaleString()} TCV
              </div>

              <div className="mb-4 text-[12px] uppercase">ACTIVITY</div>
              <div className="mb-4 text-[12px] uppercase">
                AGENT EMAILED COMMISSION STATEMENT AND
                <br />
                PERFORMANCE REPORT WITH ACTION STEPS TO
                <br />
                2X EARNINGS FOR EOQ
              </div>

              <div className="mb-4 text-[12px] uppercase">
                YOU HAVE 2 STRONG BUYING INTENT EMAILS
                <br />
                FROM JENNY (HOT) AND 1 VM FROM JOHN
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Battle cards slide-in panel */}
      <AnimatePresence>
        {isBattleOpen && (
          <motion.div
            ref={battleRef}
            className="fixed top-0 right-0 h-full w-[450px] bg-[#1a1a1a] shadow-lg z-50 overflow-auto border-l border-[#333]"
            initial={{ x: 450 }}
            animate={{ x: 0 }}
            exit={{ x: 450 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b border-[#333]">
              <div className="flex justify-between items-center">
                <h2 className="text-[14px] font-medium text-[#b3b3b3] uppercase">BATTLE CARDS</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsBattleOpen(false)}
                  className="text-[#b3b3b3] hover:bg-[#333] h-6 w-6 p-0"
                >
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              <Input
                className="mb-4 bg-[#222] border-[#444] text-[#b3b3b3] focus-visible:ring-[#555] focus-visible:ring-offset-0 h-7 text-[12px] rounded-none"
                placeholder="SEARCH LEADS"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="space-y-4">
                {filteredLeads.slice(0, 10).map((lead) => (
                  <div
                    key={lead.id}
                    className={`p-3 border rounded-none cursor-pointer transition-colors ${
                      selectedLead?.id === lead.id ? "border-[#555] bg-[#222]" : "border-[#333] hover:border-[#444]"
                    }`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-[12px] text-[#b3b3b3] uppercase">{lead.name}</div>
                        <div className="text-[10px] text-[#777] uppercase">
                          {lead.company} • {lead.position}
                        </div>
                        <LeadStatus status={lead.status} />
                      </div>
                      <ScoreBadge score={lead.score} />
                    </div>

                    {lead.value && (
                      <div className="text-[10px] mb-3 text-[#b3b3b3] uppercase">
                        ${lead.value.toLocaleString()} potential value
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-[#333]">
                      <div className="text-[10px] uppercase text-[#777] mb-2">BATTLE INTEL</div>
                      <div className="space-y-3">
                        {lead.researchPoints.map((point, index) => (
                          <div key={index} className="bg-[#222] p-2 rounded-none border border-[#333]">
                            <div className="flex items-center gap-1.5 text-[#b3b3b3] text-[10px] font-medium mb-1 uppercase">
                              <ResearchPointIcon type={point.type} />
                              <span>{point.title}</span>
                              <span className="ml-auto text-[#777]">{point.date}</span>
                            </div>
                            <div className="text-[10px] text-[#777]">{point.detail}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto bg-[#1a1a1a] overflow-hidden">
          <div className="p-3">
            <div className="flex flex-row justify-between items-center gap-3 mb-3">
              <h1 className="text-[12px] font-medium text-[#b3b3b3] bg-[#333333] px-3 py-1 uppercase">CALL QUEUE</h1>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#777] h-3 w-3" />
                <Input
                  className="pl-8 h-6 text-[10px] rounded-none border-[#444] bg-[#222] focus-visible:ring-1 focus-visible:ring-[#555] focus-visible:ring-offset-0 text-[#b3b3b3] uppercase"
                  placeholder="SEARCH LEADS"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-2">
              <nav className="flex space-x-1 border-b border-[#333]">
                <button
                  onClick={() => {
                    setActiveTab("high-priority")
                    setCurrentPage(1)
                  }}
                  className={`px-3 py-1.5 text-[10px] font-medium transition-colors relative uppercase ${
                    activeTab === "high-priority" ? "text-[#b3b3b3]" : "text-[#777] hover:text-[#999]"
                  }`}
                >
                  High Priority
                  {activeTab === "high-priority" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b3b3b3]"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => {
                    setActiveTab("new-leads")
                    setCurrentPage(1)
                  }}
                  className={`px-3 py-1.5 text-[10px] font-medium transition-colors relative uppercase ${
                    activeTab === "new-leads" ? "text-[#b3b3b3]" : "text-[#777] hover:text-[#999]"
                  }`}
                >
                  New Leads
                  {activeTab === "new-leads" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b3b3b3]"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => {
                    setActiveTab("closed-deals")
                    setCurrentPage(1)
                  }}
                  className={`px-3 py-1.5 text-[10px] font-medium transition-colors relative uppercase ${
                    activeTab === "closed-deals" ? "text-[#b3b3b3]" : "text-[#777] hover:text-[#999]"
                  }`}
                >
                  Closed Deals
                  {activeTab === "closed-deals" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b3b3b3]"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => {
                    setActiveTab("all-leads")
                    setCurrentPage(1)
                  }}
                  className={`px-3 py-1.5 text-[10px] font-medium transition-colors relative uppercase ${
                    activeTab === "all-leads" ? "text-[#b3b3b3]" : "text-[#777] hover:text-[#999]"
                  }`}
                >
                  All Leads
                  {activeTab === "all-leads" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b3b3b3]"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              </nav>
            </div>

            <div className="overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#333]">
                    <th className="text-left py-2 px-3 text-[10px] font-medium text-[#777] uppercase">LEAD</th>
                    <th className="text-left py-2 px-3 text-[10px] font-medium text-[#777] uppercase">STATUS</th>
                    <th className="text-right py-2 px-3 text-[10px] font-medium text-[#777] uppercase">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence initial={false}>
                    {currentLeads.map((lead) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                        transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="border-b border-[#333] hover:bg-[#222] transition-colors"
                      >
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-medium text-[12px] text-[#b3b3b3] uppercase">{lead.name}</div>
                              <div className="text-[#777] text-[10px] uppercase">
                                {lead.company} • {lead.position}
                              </div>
                            </div>
                            <ScoreBadge score={lead.score} />
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <LeadStatus status={lead.status} />
                          {lead.lastContacted && (
                            <div className="text-[10px] text-[#777] mt-1 uppercase">
                              Last contacted: {lead.lastContacted}
                            </div>
                          )}
                        </td>
                        <td className="py-2 px-3 text-right">
                          {lead.score !== "closed" ? (
                            <Button
                              className="bg-[#333] hover:bg-[#444] rounded-none px-2 h-6 text-[10px] shadow-none transition-colors text-[#b3b3b3] uppercase"
                              onClick={() => handleSelectLead(lead)}
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              CALL
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              className="border-[#444] bg-[#222] text-green-400 rounded-none px-2 h-6 text-[10px] hover:bg-[#333] transition-colors uppercase"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              WON
                            </Button>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>

                  {currentLeads.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-6 text-center text-[#777] text-[10px] uppercase bg-[#1a1a1a]">
                        NO LEADS FOUND IN THIS CATEGORY
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-2 text-[#777] text-[10px] uppercase">
              <div>
                SHOWING {currentLeads.length} OF {filteredLeads.length} LEADS
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="rounded-none border-[#444] text-[#b3b3b3] hover:bg-[#333] transition-colors h-6 px-2 text-[10px] disabled:opacity-30 bg-[#1a1a1a] uppercase"
                >
                  PREVIOUS
                </Button>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="rounded-none border-[#444] text-[#b3b3b3] hover:bg-[#333] transition-colors h-6 px-2 text-[10px] disabled:opacity-30 bg-[#1a1a1a] uppercase"
                >
                  NEXT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead details panel when a lead is selected */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            className="fixed bottom-4 right-4 w-80 bg-[#1a1a1a] rounded-none shadow-lg border border-[#333] overflow-hidden z-40"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="p-3 border-b border-[#333]">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-[12px] text-[#b3b3b3] uppercase">{selectedLead.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 text-[#b3b3b3] hover:bg-[#333]"
                  onClick={() => setSelectedLead(null)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2 mb-3">
                <User className="h-3 w-3 text-[#777]" />
                <div className="text-[10px] text-[#b3b3b3] uppercase">
                  {selectedLead.position} at {selectedLead.company}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="h-3 w-3 text-[#777]" />
                <div className="text-[10px] text-[#b3b3b3] uppercase">
                  ${selectedLead.value?.toLocaleString() || "N/A"}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="h-3 w-3 text-[#777]" />
                <div className="text-[10px]">
                  <LeadStatus status={selectedLead.status} />
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="w-full bg-[#333] hover:bg-[#444] text-[#b3b3b3] rounded-none h-6 text-[10px] uppercase">
                  <Phone className="h-3 w-3 mr-1" />
                  CALL NOW
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#444] text-[#b3b3b3] hover:bg-[#333] rounded-none h-6 text-[10px] uppercase"
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  SCHEDULE
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

