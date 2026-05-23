import { UserPlus } from "lucide-react";

export default function AdminUsersHeader({ onInvite }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Users & Roles</h1>
        <p className="mt-1 text-sm text-slate-500">Manage administrators, their access roles and permissions.</p>
      </div>
      <button onClick={onInvite} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
        <UserPlus size={16} /> Invite Admin
      </button>
    </div>
  );
}
