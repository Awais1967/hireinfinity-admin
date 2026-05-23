const baseData = [
  {
    id: 1,
    name: "Jane Doe",
    company: "Fintech Inc.",
    email: "jane@fintech.com",
    specialty: "Frontend & Figma",
    budget: "$3k - $6k/mo",
    timeline: "Immediate",
    status: "New",
    scheduledOn: "Jun 25, 2026 01:30 PM CST",
    assignedTo: "Sarah M.",
  },
  {
    id: 2,
    name: "John Smith",
    company: "HealthPlus",
    email: "john@healthplus.com",
    specialty: "Backend & Databases",
    budget: "$6k - $9k/mo",
    timeline: "1 - 2 Weeks",
    status: "Contacted",
    scheduledOn: "Jun 24, 2026 11:00 AM CST",
    assignedTo: "Alex R.",
  },
  {
    id: 3,
    name: "Michael Lee",
    company: "LogiFlow",
    email: "michael@logiflow.com",
    specialty: "DevOps & SRE",
    budget: "$5k - $8k/mo",
    timeline: "2 - 4 Weeks",
    status: "Scheduled",
    scheduledOn: "Jun 23, 2026 03:00 PM CST",
    assignedTo: "Sarah M.",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    company: "PayEdge",
    email: "sarah@payedge.com",
    specialty: "Mobile Apps",
    budget: "$4k - $7k/mo",
    timeline: "Immediate",
    status: "In Progress",
    scheduledOn: "Jun 22, 2026 05:00 PM CST",
    assignedTo: "David K.",
  },
  {
    id: 5,
    name: "David Chen",
    company: "SaaSify",
    email: "david@saasify.com",
    specialty: "Backend & Databases",
    budget: "$6k - $10k/mo",
    timeline: "1 - 2 Weeks",
    status: "Converted",
    scheduledOn: "Jun 20, 2026 09:00 AM CST",
    assignedTo: "Alex R.",
  },
  {
    id: 6,
    name: "Emma Wilson",
    company: "MediSync",
    email: "emma@medisync.com",
    specialty: "QA Automation",
    budget: "$2k - $4k/mo",
    timeline: "2 - 3 Weeks",
    status: "Contacted",
    scheduledOn: "Jun 19, 2026 11:00 AM CST",
    assignedTo: "Sarah M.",
  },
  {
    id: 7,
    name: "Alex Martinez",
    company: "BlockWave",
    email: "alex@blockwave.io",
    specialty: "DevOps & SRE",
    budget: "$4k - $6k/mo",
    timeline: "Immediate",
    status: "New",
    scheduledOn: "Jun 19, 2026 01:30 PM CST",
    assignedTo: "Unassigned",
  },
  {
    id: 8,
    name: "Priya Shah",
    company: "EduSphere",
    email: "priya@edusphere.com",
    specialty: "Frontend & Figma",
    budget: "$3k - $5k/mo",
    timeline: "1 - 2 Weeks",
    status: "In Progress",
    scheduledOn: "Jun 18, 2026 03:00 PM CST",
    assignedTo: "David K.",
  },
  {
    id: 9,
    name: "Daniel Brown",
    company: "TravelXP",
    email: "daniel@travelxp.com",
    specialty: "Mobile Apps",
    budget: "$4k - $7k/mo",
    timeline: "2 - 4 Weeks",
    status: "Rejected",
    scheduledOn: "Jun 17, 2026 05:00 PM CST",
    assignedTo: "Alex R.",
  },
  {
    id: 10,
    name: "Sophia Davis",
    company: "AI Insights",
    email: "sophia@aiinsights.com",
    specialty: "Backend & Databases",
    budget: "$6k - $9k/mo",
    timeline: "1 - 2 Weeks",
    status: "Converted",
    scheduledOn: "Jun 16, 2026 09:00 AM CST",
    assignedTo: "Sarah M.",
  },
];

const firstNames = [
  "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda",
  "William", "Barbara", "Richard", "Elizabeth", "Joseph", "Susan", "Thomas", "Jessica",
  "Christopher", "Sarah", "Charles", "Karen", "Daniel", "Lisa", "Matthew", "Nancy",
  "Anthony", "Betty", "Mark", "Margaret", "Donald", "Sandra", "Steven", "Ashley",
  "Andrew", "Kimberly", "Paul", "Emily", "Joshua", "Donna", "Kenneth", "Michelle",
];

const lastNames = [
  "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez",
  "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor",
  "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez",
  "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright",
  "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green",
];

const companies = [
  "TechVista", "CloudNine", "DataPulse", "NexGen", "BrightPath", "CyberCore",
  "QuantumLeap", "StarBridge", "FusionLab", "Pinnacle", "Meridian", "Atlas",
  "CrestWave", "PrimeAxis", "Vertex", "NovaTech", "EchoSys", "Polaris",
  "ApexSoft", "Zenith", "Catalyst", "Forge", "Summit", "Titan",
];

const specialties = [
  "Frontend & Figma", "Backend & Databases", "Mobile Apps", "DevOps & SRE", "QA Automation",
];

const statuses = ["New", "Contacted", "Scheduled", "In Progress", "Converted", "Rejected"];

const timelines = ["Immediate", "1 - 2 Weeks", "2 - 4 Weeks", "2 - 3 Weeks", "1 - 2 Months"];

const assignees = ["Sarah M.", "Alex R.", "David K.", "Unassigned"];

function randomDate(start, days) {
  const d = new Date(start);
  d.setDate(d.getDate() - Math.floor(Math.random() * days));
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const hours = d.getHours() % 12 || 12;
  const mins = String(d.getMinutes()).padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${hours}:${mins} ${ampm} CST`;
}

function generateBudget() {
  const low = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
  const high = low + [2, 3, 4][Math.floor(Math.random() * 3)];
  return `$${low}k - $${high}k/mo`;
}

let idCounter = 11;

function generateRecord(seed) {
  const firstName = firstNames[seed % firstNames.length];
  const lastName = lastNames[seed % lastNames.length];
  const companyIdx = seed % companies.length;

  return {
    id: idCounter++,
    name: `${firstName} ${lastName}`,
    company: companies[companyIdx],
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companies[companyIdx].toLowerCase()}.com`,
    specialty: specialties[seed % specialties.length],
    budget: generateBudget(),
    timeline: timelines[seed % timelines.length],
    status: statuses[seed % statuses.length],
    scheduledOn: randomDate(new Date(2026, 5, 25), 60),
    assignedTo: assignees[seed % assignees.length],
  };
}

export function generateAllRequests() {
  const records = [...baseData];
  for (let i = 0; i < 250; i++) {
    records.push(generateRecord(i));
  }
  return records;
}

export const statusCards = [
  { label: "All Requests", count: 248, value: "all", color: "blue" },
  { label: "New", count: 32, value: "New", color: "blue" },
  { label: "Contacted", count: 48, value: "Contacted", color: "amber" },
  { label: "Scheduled", count: 36, value: "Scheduled", color: "purple" },
  { label: "In Progress", count: 54, value: "In Progress", color: "cyan" },
  { label: "Converted", count: 56, value: "Converted", color: "green" },
  { label: "Rejected", count: 22, value: "Rejected", color: "red" },
];

export const statusColors = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  Scheduled: "bg-purple-100 text-purple-700",
  "In Progress": "bg-cyan-100 text-cyan-700",
  Converted: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
};
