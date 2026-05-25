import {
  Users,
  TrendingUp,
  UserCheck,
  Calendar,
  Clock,
} from "lucide-react";

const iconMap = {
  Users: Users,
  TrendingUp: TrendingUp,
  UserCheck: UserCheck,
  Calendar: Calendar,
  Clock: Clock,
};

const colorMap = {
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  green: { bg: "bg-emerald-100", text: "text-emerald-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  yellow: { bg: "bg-amber-100", text: "text-amber-600" },
};

export default function StatCard({ label, value, change, changeLabel, icon, color }) {
  const Icon = iconMap[icon];
  const colors = colorMap[color] || colorMap.blue;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}>
          {Icon && <Icon size={22} />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-0.5 text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs">
            <span className="font-semibold text-emerald-600">{change}</span>{" "}
            <span className="text-slate-400">{changeLabel}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
