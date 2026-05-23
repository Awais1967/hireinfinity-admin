import { UserPlus, PlusCircle, Shield, Clock, ChevronRight } from "lucide-react";

const actions = [
  { icon: UserPlus, label: "Invite New Admin", color: "text-blue-600 bg-blue-50", key: "invite" },
  { icon: PlusCircle, label: "Create New Role", color: "text-purple-600 bg-purple-50", key: "createRole" },
  { icon: Shield, label: "Manage Permissions", color: "text-cyan-600 bg-cyan-50", key: "managePerms" },
  { icon: Clock, label: "Activity Log", color: "text-amber-600 bg-amber-50", key: "activityLog" },
];

export default function AdminQuickActions({ onAction }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
      <div className="space-y-1.5">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button key={a.key} onClick={() => onAction(a.key)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:opacity-80 ${a.color}`}>
              <span className="flex items-center gap-2.5"><Icon size={16} /> {a.label}</span>
              <ChevronRight size={15} className="opacity-60" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
