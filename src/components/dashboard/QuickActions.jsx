import {
  Users,
  UserPlus,
  DollarSign,
  FileText,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { quickActionsData } from "../../data/dashboardData";

const iconMap = {
  Users: Users,
  UserPlus: UserPlus,
  DollarSign: DollarSign,
  FileText: FileText,
  BarChart3: BarChart3,
};

export default function QuickActions() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-slate-900">Quick Actions</h3>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {quickActionsData.map((action) => {
          const Icon = iconMap[action.icon];
          return (
            <button
              key={action.id}
              className="group flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3.5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-md"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${action.color}`}
              >
                {Icon && <Icon size={18} />}
              </div>
              <span className="flex-1 text-sm font-medium text-slate-700">
                {action.label}
              </span>
              <ArrowRight
                size={15}
                className="shrink-0 text-slate-300 transition-colors group-hover:text-slate-500"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
