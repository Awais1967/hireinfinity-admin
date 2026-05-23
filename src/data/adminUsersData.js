export const initialUsers = [
  { id: 1, name: "Admin User", email: "admin@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/men/32.jpg", role: "Super Admin", status: "Active", lastLogin: "May 25, 2026 10:30 AM", isCurrentUser: true },
  { id: 2, name: "Sarah Johnson", email: "sarah.johnson@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/women/44.jpg", role: "Admin", status: "Active", lastLogin: "May 25, 2026 09:15 AM" },
  { id: 3, name: "Michael Chen", email: "michael.chen@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/men/45.jpg", role: "Manager", status: "Active", lastLogin: "May 24, 2026 04:45 PM" },
  { id: 4, name: "Priya Sharma", email: "priya.sharma@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/women/68.jpg", role: "Content Editor", status: "Active", lastLogin: "May 24, 2026 11:20 AM" },
  { id: 5, name: "David Wilson", email: "david.wilson@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/men/52.jpg", role: "Viewer", status: "Active", lastLogin: "May 23, 2026 03:30 PM" },
  { id: 6, name: "Emily Davis", email: "emily.davis@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/women/61.jpg", role: "Manager", status: "Inactive", lastLogin: "May 20, 2026 02:10 PM" },
  { id: 7, name: "James Anderson", email: "james.anderson@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/men/76.jpg", role: "Viewer", status: "Active", lastLogin: "May 20, 2026 09:40 AM" },
  { id: 8, name: "Lisa Thompson", email: "lisa.thompson@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/women/72.jpg", role: "Content Editor", status: "Inactive", lastLogin: "May 18, 2026 05:25 PM" },
  { id: 9, name: "Robert Miller", email: "robert.miller@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/men/21.jpg", role: "Admin", status: "Active", lastLogin: "May 17, 2026 01:00 PM" },
  { id: 10, name: "Natalie Brown", email: "natalie.brown@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/women/28.jpg", role: "Content Editor", status: "Active", lastLogin: "May 16, 2026 06:15 PM" },
  { id: 11, name: "Kevin Lee", email: "kevin.lee@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/men/64.jpg", role: "Viewer", status: "Active", lastLogin: "May 15, 2026 03:50 PM" },
  { id: 12, name: "Amanda Clark", email: "amanda.clark@hireinfinity.com", avatar: "https://randomuser.me/api/portraits/women/31.jpg", role: "Admin", status: "Pending", lastLogin: "Never" },
];

export const initialRoles = [
  { id: 1, name: "Super Admin", description: "Full platform access and system control", users: 1, permissions: 32, status: "Active" },
  { id: 2, name: "Admin", description: "Manage users, content and day-to-day operations", users: 3, permissions: 24, status: "Active" },
  { id: 3, name: "Manager", description: "Manage engineers, requests and case studies", users: 2, permissions: 18, status: "Active" },
  { id: 4, name: "Content Editor", description: "Manage website content and case studies", users: 3, permissions: 12, status: "Active" },
  { id: 5, name: "Viewer", description: "Read-only access to dashboard and reports", users: 3, permissions: 6, status: "Active" },
];

export const modulePermissions = [
  "Dashboard", "Consultation Requests", "Engineer Roster", "Specialties & Tech Stack",
  "Pricing & Plans", "Website Content", "Case Studies", "Admin Users & Roles", "Settings",
];

export const actionTypes = ["View", "Create", "Edit", "Delete", "Export"];

export function getDefaultPermissions(roleName) {
  return modulePermissions.map((mod) => {
    const actions = {};
    actionTypes.forEach((a) => {
      if (roleName === "Super Admin") actions[a] = true;
      else if (roleName === "Viewer") actions[a] = a === "View";
      else if (roleName === "Admin") actions[a] = true;
      else if (roleName === "Manager") actions[a] = a !== "Delete";
      else if (roleName === "Content Editor") actions[a] = a !== "Delete" && a !== "Export";
      else actions[a] = false;
    });
    return { module: mod, actions };
  });
}

export const initialPermissions = {
  "Super Admin": getDefaultPermissions("Super Admin"),
  "Admin": getDefaultPermissions("Admin"),
  "Manager": getDefaultPermissions("Manager"),
  "Content Editor": getDefaultPermissions("Content Editor"),
  "Viewer": getDefaultPermissions("Viewer"),
};

export const activityLogs = [
  { id: 1, user: "Admin User", action: "invited Amanda Clark", type: "user", time: "2 hours ago" },
  { id: 2, user: "Sarah Johnson", action: "updated Website Content", type: "content", time: "5 hours ago" },
  { id: 3, user: "Michael Chen", action: "changed engineer visibility", type: "roster", time: "1 day ago" },
  { id: 4, user: "Priya Sharma", action: "published case study", type: "content", time: "2 days ago" },
  { id: 5, user: "Admin User", action: "updated role permissions", type: "settings", time: "2 days ago" },
  { id: 6, user: "David Wilson", action: "exported consultation report", type: "report", time: "3 days ago" },
  { id: 7, user: "Robert Miller", action: "added new engineer profile", type: "roster", time: "3 days ago" },
  { id: 8, user: "Natalie Brown", action: "updated pricing plans", type: "pricing", time: "4 days ago" },
];

export const roleOptions = ["Super Admin", "Admin", "Manager", "Content Editor", "Viewer"];
export const statusOptions = ["Active", "Inactive", "Pending"];
