const baseEngineers = [
  {
    id: "ENG-001",
    name: "Lead Frontend & Next.js Engineer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    specialty: "Frontend & Figma",
    experience: "8 - 10 yrs",
    monthlyRate: "$5,500/mo",
    hourlyRate: "$39/hr",
    availability: "Available",
    visibility: "Public",
    featured: true,
    seniority: "Lead",
  },
  {
    id: "ENG-002",
    name: "Staff Backend & Distributed Systems Architect",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    specialty: "Backend & Databases",
    experience: "9 - 12 yrs",
    monthlyRate: "$6,000/mo",
    hourlyRate: "$42/hr",
    availability: "Available",
    visibility: "Public",
    featured: true,
    seniority: "Architect",
  },
  {
    id: "ENG-003",
    name: "Senior React Native Developer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    specialty: "Mobile Apps",
    experience: "6 - 8 yrs",
    monthlyRate: "$4,400/mo",
    hourlyRate: "$31/hr",
    availability: "Available",
    visibility: "Public",
    featured: false,
    seniority: "Senior",
  },
  {
    id: "ENG-004",
    name: "Lead Cloud Infrastructure & SRE",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    specialty: "DevOps & SRE",
    experience: "7 - 10 yrs",
    monthlyRate: "$5,800/mo",
    hourlyRate: "$40/hr",
    availability: "Limited",
    visibility: "Public",
    featured: true,
    seniority: "Lead",
  },
  {
    id: "ENG-005",
    name: "Lead Software Development Engineer in Test",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    specialty: "QA Automation",
    experience: "6 - 8 yrs",
    monthlyRate: "$3,600/mo",
    hourlyRate: "$25/hr",
    availability: "Available",
    visibility: "Public",
    featured: false,
    seniority: "Lead",
  },
  {
    id: "ENG-006",
    name: "Senior Python & AI Engineer",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    specialty: "Backend & Databases",
    experience: "6 - 8 yrs",
    monthlyRate: "$4,800/mo",
    hourlyRate: "$34/hr",
    availability: "Available",
    visibility: "Public",
    featured: false,
    seniority: "Senior",
  },
  {
    id: "ENG-007",
    name: "Senior Flutter Specialist",
    avatar: "https://randomuser.me/api/portraits/women/61.jpg",
    specialty: "Mobile Apps",
    experience: "5 - 7 yrs",
    monthlyRate: "$4,200/mo",
    hourlyRate: "$30/hr",
    availability: "Available",
    visibility: "Public",
    featured: false,
    seniority: "Senior",
  },
  {
    id: "ENG-008",
    name: "Senior Full-Stack PHP & Laravel Engineer",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    specialty: "Backend & Databases",
    experience: "5 - 7 yrs",
    monthlyRate: "$3,200/mo",
    hourlyRate: "$23/hr",
    availability: "Limited",
    visibility: "Public",
    featured: false,
    seniority: "Senior",
  },
];

const nameTemplates = [
  "Lead {spec} Engineer",
  "Senior {spec} Developer",
  "Staff {spec} Architect",
  "{spec} Specialist",
  "Principal {spec} Engineer",
  "Senior {spec} Consultant",
  "{spec} Team Lead",
  "Full-Stack {spec} Developer",
  "Senior {spec} Engineer",
  "{spec} Developer",
];

const specMap = {
  "Frontend & Figma": "Frontend",
  "Backend & Databases": "Backend",
  "Mobile Apps": "Mobile",
  "DevOps & SRE": "DevOps",
  "QA Automation": "QA",
};

const specialties = ["Frontend & Figma", "Backend & Databases", "Mobile Apps", "DevOps & SRE", "QA Automation"];
const seniorities = ["Junior", "Mid-Level", "Senior", "Lead", "Architect"];
const availabilities = ["Available", "Limited", "Unavailable"];
const visibilities = ["Public", "Private"];

const expRanges = {
  Junior: ["1 - 2 yrs", "1 - 3 yrs"],
  "Mid-Level": ["3 - 5 yrs", "3 - 6 yrs"],
  Senior: ["5 - 7 yrs", "6 - 8 yrs", "6 - 9 yrs"],
  Lead: ["7 - 10 yrs", "8 - 10 yrs", "8 - 12 yrs"],
  Architect: ["9 - 12 yrs", "10 - 15 yrs"],
};

const monthlyRates = {
  Junior: { min: 1800, max: 2800 },
  "Mid-Level": { min: 2800, max: 4200 },
  Senior: { min: 3800, max: 5200 },
  Lead: { min: 4800, max: 6500 },
  Architect: { min: 5800, max: 8000 },
};

const usedAvatars = new Set();

function getUniqueAvatar(gender) {
  if (usedAvatars.size >= 99) {
    return `https://randomuser.me/api/portraits/${gender}/${Math.floor(Math.random() * 99) + 1}.jpg`;
  }
  let id;
  do {
    id = Math.floor(Math.random() * 99) + 1;
  } while (usedAvatars.has(id));
  usedAvatars.add(id);
  return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEngineer(index) {
  const specialty = pickRandom(specialties);
  const seniority = pickRandom(seniorities);
  const specShort = specMap[specialty] || specialty;
  const nameTemplate = pickRandom(nameTemplates);
  const name = nameTemplate.replace("{spec}", specShort);
  const gender = index % 2 === 0 ? "men" : "women";
  const expRange = pickRandom(expRanges[seniority]);
  const rateMin = monthlyRates[seniority].min;
  const rateMax = monthlyRates[seniority].max;
  const monthlyVal = randInt(rateMin, Math.min(rateMax, 8000));
  const hourlyVal = Math.round(monthlyVal / 140);
  const availability = pickRandom(availabilities);
  const visibility = pickRandom(visibilities);
  const featured = Math.random() < 0.18;

  return {
    id: `ENG-${String(index + 1).padStart(3, "0")}`,
    name,
    avatar: getUniqueAvatar(gender),
    specialty,
    experience: expRange,
    monthlyRate: `$${monthlyVal.toLocaleString()}/mo`,
    hourlyRate: `$${hourlyVal}/hr`,
    availability,
    visibility,
    featured,
    seniority,
  };
}

export function generateAllEngineers() {
  const records = [...baseEngineers];
  for (let i = baseEngineers.length; i < 128; i++) {
    records.push(generateEngineer(i));
  }
  return records;
}

export const statsCards = [
  { label: "Total Engineers", value: 128, subtitle: "All team members", icon: "Users", color: "blue" },
  { label: "Available", value: 98, subtitle: "Actively available", icon: "CheckCircle", color: "green" },
  { label: "Limited Availability", value: 18, subtitle: "Limited / Part-time", icon: "AlertCircle", color: "amber" },
  { label: "Unavailable", value: 12, subtitle: "Not available", icon: "XCircle", color: "red" },
  { label: "Featured Profiles", value: 24, subtitle: "Highlighted on site", icon: "Star", color: "purple" },
];

export const specialtyColors = {
  "Frontend & Figma": "bg-blue-100 text-blue-700",
  "Backend & Databases": "bg-purple-100 text-purple-700",
  "Mobile Apps": "bg-emerald-100 text-emerald-700",
  "DevOps & SRE": "bg-orange-100 text-orange-700",
  "QA Automation": "bg-amber-100 text-amber-700",
};

export const availabilityColors = {
  Available: "bg-emerald-100 text-emerald-700",
  Limited: "bg-amber-100 text-amber-700",
  Unavailable: "bg-red-100 text-red-700",
};

export const visibilityColors = {
  Public: "bg-emerald-100 text-emerald-700",
  Private: "bg-slate-200 text-slate-600",
};

export const filterOptions = {
  specialties: ["All Specialties", ...specialties],
  availabilities: ["All Availability", ...availabilities],
  visibilities: ["All Visibility", ...visibilities],
  seniorities: ["All Seniority", ...seniorities],
};
