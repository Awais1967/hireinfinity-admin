export const defaultGeneral = {
  companyName: "HireInfinity Solutions",
  adminEmail: "admin@hireinfinity.com",
  websiteUrl: "https://www.hireinfinity.com",
  timezone: "(UTC-06:00) Central Time (US & Canada)",
  dateFormat: "MM/DD/YYYY • 12-hour (AM/PM)",
};

export const defaultPreferences = {
  allowRequests: true,
  emailNotifications: true,
  autoAssign: true,
  dataRetention: "12 Months",
};

export const timezoneOptions = [
  "(UTC-08:00) Pacific Time",
  "(UTC-06:00) Central Time (US & Canada)",
  "(UTC-05:00) Eastern Time",
  "(UTC+00:00) GMT",
  "(UTC+05:00) Pakistan Standard Time",
];

export const dateFormatOptions = [
  "MM/DD/YYYY • 12-hour (AM/PM)",
  "DD/MM/YYYY • 24-hour",
  "YYYY-MM-DD • 24-hour",
];

export const retentionOptions = ["3 Months", "6 Months", "12 Months", "24 Months", "Forever"];

export const defaultProfile = {
  adminName: "Admin User",
  adminRole: "Super Admin",
  profileEmail: "admin@hireinfinity.com",
  phoneNumber: "+1 (555) 123-4567",
  avatarUrl: "",
};

export const defaultNotifications = {
  newConsultation: true,
  engineerAssignment: true,
  weeklySummary: false,
  securityAlerts: true,
  marketingUpdates: false,
};

export const defaultSecurity = {
  twoFactor: false,
  sessionTimeout: "30 Minutes",
  passwordExpiry: "90 Days",
  allowedIPs: "192.168.1.0/24\n10.0.0.0/8",
  loginAlerts: true,
};

export const defaultIntegrations = [
  { name: "Stripe", status: "Connected" },
  { name: "Google Analytics", status: "Connected" },
  { name: "Slack", status: "Disconnected" },
  { name: "Zapier", status: "Disconnected" },
];

export const defaultBilling = {
  currentPlan: "Enterprise",
  billingEmail: "billing@hireinfinity.com",
  paymentMethod: "Visa ending in 4242",
  nextInvoice: "June 15, 2026",
};

export const defaultAppearance = {
  theme: "Light",
  primaryColor: "#2563EB",
  sidebarCompact: false,
  reduceAnimations: false,
};

export const defaultAdvanced = {
  maintenanceMode: false,
  debugLogs: false,
  apiRateLimit: "1000",
  webhookUrl: "https://hooks.hireinfinity.com/events",
};

export const apiKeys = {
  publicKey: "pk_live_hireinfinity_12345",
  secretKey: "sk_live_hireinfinity_hidden",
  webhookSecret: "whsec_hireinfinity_98765",
};

export const systemInfo = {
  platformVersion: "v2.4.1",
  lastUpdated: "May 25, 2026 10:30 AM",
  environment: "Production",
  adminName: "Admin User",
  role: "Super Admin",
  lastLogin: "May 25, 2026 09:45 AM",
  ipAddress: "192.168.1.42",
};

export const settingsTabs = [
  "General", "Profile", "Notifications", "Security", "Integrations", "Billing", "Appearance", "Advanced",
];

export const timeoutOptions = ["15 Minutes", "30 Minutes", "60 Minutes", "Never"];
export const expiryOptions = ["30 Days", "60 Days", "90 Days", "180 Days", "Never"];
export const themeOptions = ["Light", "Dark", "System"];
