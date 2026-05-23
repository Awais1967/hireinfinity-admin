import { ChevronRight } from "lucide-react";

const roleColors = {
  "Super Admin": "bg-blue-500", "Admin": "bg-cyan-500",
  "Manager": "bg-purple-500", "Content Editor": "bg-orange-500", "Viewer": "bg-slate-400",
};

export default function RolesOverview({ roleCounts, onViewAllRoles }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Roles Overview</h3>
      <div className="space-y-3">
        {Object.entries(roleCounts).map(([role, count]) => (
          <div key={role} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className={`h-2.5 w-2.5 rounded-full ${roleColors[role] || "bg-slate-400"}`} />
              <span className="text-sm text-slate-700">{role}</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">{count}</span>
          </div>
        ))}
      </div>
      <button onClick={onViewAllRoles} className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
        View All Roles <ChevronRight size={15} />
      </button>
    </div>
  );
}
