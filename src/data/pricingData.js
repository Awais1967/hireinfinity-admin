export const monthlyRates = {
  title: "Staff Augmentation – Monthly Flat Rates",
  subtitle: "Monthly flat rates for dedicated engineers.",
  columns: [
    { key: "junior", label: "Junior (1–3 yrs)", color: "text-slate-900" },
    { key: "mid", label: "Mid-Level (3–5 yrs)", color: "text-blue-600" },
    { key: "senior", label: "Senior (5–8 yrs)", color: "text-emerald-600" },
    { key: "lead", label: "Staff / Lead (8+ yrs)", color: "text-purple-600" },
  ],
  rows: [
    { id: 1, sector: "Frontend Web & Figma", junior: "$1,500/mo", mid: "$2,650/mo", senior: "$3,800/mo", lead: "$5,500/mo" },
    { id: 2, sector: "Full-Stack & Backend", junior: "$1,650/mo", mid: "$3,000/mo", senior: "$4,500/mo", lead: "$6,000/mo" },
    { id: 3, sector: "Mobile Unit", junior: "$1,600/mo", mid: "$2,800/mo", senior: "$4,200/mo", lead: "$5,800/mo" },
    { id: 4, sector: "DevOps, Cloud & SRE", junior: "$1,800/mo", mid: "$3,200/mo", senior: "$4,600/mo", lead: "$6,000/mo" },
    { id: 5, sector: "QA (Manual & Auto)", junior: "$1,500/mo", mid: "$2,200/mo", senior: "$3,600/mo", lead: "$5,000/mo" },
  ],
  info: "All plans include: Professional Delivery PM oversight, full US hours match, worry-free 2-week trial at 50%, and cancel-anytime monthly rollouts.",
};

export const hourlyRates = {
  title: "Staff Augmentation – Hourly Rates",
  subtitle: "Flexible hourly rates for part-time or on-demand engineering work.",
  columns: [
    { key: "junior", label: "Junior", color: "text-slate-900" },
    { key: "mid", label: "Mid-Level", color: "text-blue-600" },
    { key: "senior", label: "Senior", color: "text-emerald-600" },
    { key: "lead", label: "Staff / Lead", color: "text-purple-600" },
  ],
  rows: [
    { id: 1, sector: "Frontend Web & Figma", junior: "$18/hr", mid: "$28/hr", senior: "$39/hr", lead: "$55/hr" },
    { id: 2, sector: "Full-Stack & Backend", junior: "$20/hr", mid: "$32/hr", senior: "$45/hr", lead: "$60/hr" },
    { id: 3, sector: "Mobile Unit", junior: "$19/hr", mid: "$30/hr", senior: "$42/hr", lead: "$58/hr" },
    { id: 4, sector: "DevOps, Cloud & SRE", junior: "$22/hr", mid: "$35/hr", senior: "$46/hr", lead: "$62/hr" },
    { id: 5, sector: "QA (Manual & Auto)", junior: "$16/hr", mid: "$24/hr", senior: "$36/hr", lead: "$50/hr" },
  ],
  info: "Hourly plans include flexible weekly commitment, tracked delivery hours, PM coordination and cancel-anytime support.",
};

export const teamPods = {
  title: "Team Pods",
  subtitle: "Pre-built delivery pods for faster execution and dedicated product delivery.",
  columns: [
    { key: "podType", label: "Pod Type", color: "text-slate-900" },
    { key: "composition", label: "Team Composition", color: "text-slate-900" },
    { key: "price", label: "Monthly Price", color: "text-blue-600" },
    { key: "bestFor", label: "Best For", color: "text-slate-900" },
  ],
  rows: [
    { id: 1, podType: "Startup Pod", composition: "1 Frontend, 1 Backend, 1 QA", price: "$8,500/mo", bestFor: "MVPs and early-stage products" },
    { id: 2, podType: "Growth Pod", composition: "2 Frontend, 2 Backend, 1 QA, 1 PM", price: "$16,500/mo", bestFor: "Scaling products and feature delivery" },
    { id: 3, podType: "Mobile Pod", composition: "2 Mobile Developers, 1 Backend, 1 QA", price: "$13,500/mo", bestFor: "iOS, Android and cross-platform apps" },
    { id: 4, podType: "Enterprise Pod", composition: "Full-stack team, DevOps, QA, PM", price: "$24,000/mo", bestFor: "Long-term enterprise delivery" },
  ],
  info: "Team pods include dedicated delivery management, sprint planning, QA support, reporting and monthly rollout flexibility.",
};

export const tabs = [
  { id: "monthly", label: "Monthly Rates", icon: "Calendar" },
  { id: "hourly", label: "Hourly Rates", icon: "Clock" },
  { id: "pods", label: "Team Pods", icon: "Users" },
];

export const levelKeys = ["junior", "mid", "senior", "lead"];
