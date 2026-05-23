import { Shield, UserCheck, UserX, UserCog } from "lucide-react";

const cards = [
  { key: "total", icon: Shield, label: "Total Admin Users", color: "bg-blue-100 text-blue-600" },
  { key: "active", icon: UserCheck, label: "Active Users", color: "bg-green-100 text-green-600" },
  { key: "inactive", icon: UserX, label: "Inactive Users", color: "bg-orange-100 text-orange-600" },
  { key: "roles", icon: UserCog, label: "User Roles", color: "bg-purple-100 text-purple-600" },
];

export default function AdminUsersStats({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.key} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${card.color}`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">{stats[card.key]}</p>
              <p className="text-xs text-slate-500">{card.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
