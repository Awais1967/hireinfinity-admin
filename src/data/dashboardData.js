export const kpiData = [
  {
    id: 1,
    label: "Total Consultation Requests",
    value: "248",
    change: "+18.2%",
    changeLabel: "vs last month",
    changePositive: true,
    icon: "Users",
    color: "blue",
  },
  {
    id: 2,
    label: "New Leads (This Week)",
    value: "32",
    change: "+12.5%",
    changeLabel: "vs last week",
    changePositive: true,
    icon: "TrendingUp",
    color: "green",
  },
  {
    id: 3,
    label: "Active Engineer Profiles",
    value: "126",
    change: "+8.4%",
    changeLabel: "vs last month",
    changePositive: true,
    icon: "UserCheck",
    color: "purple",
  },
  {
    id: 4,
    label: "Conversion Rate",
    value: "18.4%",
    change: "+3.6%",
    changeLabel: "vs last month",
    changePositive: true,
    icon: "Star",
    color: "orange",
  },
  {
    id: 5,
    label: "Avg. Response Time",
    value: "1.7 hrs",
    change: "-0.6 hrs",
    changeLabel: "vs last month",
    changePositive: true,
    icon: "Clock",
    color: "yellow",
  },
];

export const requestsOverTimeData = [
  { name: "May 25", value: 42 },
  { name: "Jun 1", value: 58 },
  { name: "Jun 8", value: 35 },
  { name: "Jun 15", value: 72 },
  { name: "Jun 22", value: 65 },
];

export const specialtiesData = [
  { name: "Frontend & Figma", value: 30, color: "#2563eb" },
  { name: "Backend & Databases", value: 25, color: "#7c3aed" },
  { name: "Mobile Apps", value: 20, color: "#16a34a" },
  { name: "DevOps & SRE", value: 15, color: "#ea580c" },
  { name: "QA Automation", value: 10, color: "#eab308" },
];

export const pricingInterestData = [
  { label: "Monthly Rates", value: 62, color: "#2563eb" },
  { label: "Hourly Rates", value: 24, color: "#7c3aed" },
  { label: "Team Pods", value: 14, color: "#16a34a" },
];

export const leadSourcesData = [
  { label: "Direct / Organic", value: 48, color: "#2563eb" },
  { label: "Google Ads", value: 22, color: "#7c3aed" },
  { label: "LinkedIn", value: 16, color: "#16a34a" },
  { label: "Referral", value: 14, color: "#ea580c" },
];

export const quickActionsData = [
  { id: 1, label: "View New Leads", icon: "Users", color: "bg-blue-100 text-blue-600" },
  { id: 2, label: "Add Engineer", icon: "UserPlus", color: "bg-emerald-100 text-emerald-600" },
  { id: 3, label: "Update Pricing", icon: "DollarSign", color: "bg-purple-100 text-purple-600" },
  { id: 4, label: "Manage Content", icon: "FileText", color: "bg-orange-100 text-orange-600" },
  { id: 5, label: "View Reports", icon: "BarChart3", color: "bg-cyan-100 text-cyan-600" },
];

export const sidebarNavItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/" },
  { id: "consultations", label: "Consultation Requests", icon: "MessageSquare", path: "/consultations" },
  { id: "roster", label: "Engineer Roster", icon: "Users", path: "/roster" },
  { id: "specialties", label: "Specialties & Tech Stack", icon: "Code", path: "/specialties" },
  { id: "pricing", label: "Pricing & Plans", icon: "DollarSign", path: "/pricing" },
  { id: "content", label: "Website Content", icon: "FileEdit", path: "/content" },
  { id: "casestudies", label: "Case Studies", icon: "BookOpen", path: "/casestudies" },
  { id: "admin-users", label: "Admin Users & Roles", icon: "Shield", path: "/admin-users" },
  { id: "settings", label: "Settings", icon: "Settings", path: "/settings" },
];
