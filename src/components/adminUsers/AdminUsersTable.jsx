import { Edit2 } from "lucide-react";
import RoleBadge from "./RoleBadge";
import StatusBadge from "./StatusBadge";
import RowActions from "./RowActions";

export default function AdminUsersTable({ records, onEdit, onViewProfile, onToggleActive, onChangeRole, onResetPassword, onDelete }) {
  if (!records.length) {
    return <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm"><p className="text-sm text-slate-500">No admin users found.</p></div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-slate-50">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">User</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Last Login</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((user) => (
              <tr key={user.id} className="border-b border-gray-50 transition-colors hover:bg-slate-50/50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-900">{user.name}</span>
                        {user.isCurrentUser && <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">You</span>}
                      </div>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap"><RoleBadge role={user.role} /></td>
                <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={user.status} /></td>
                <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">{user.lastLogin}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onEdit(user)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><Edit2 size={15} /></button>
                    <RowActions
                      status={user.status}
                      isCurrentUser={user.isCurrentUser}
                      onViewProfile={() => onViewProfile(user)}
                      onToggleActive={() => onToggleActive(user.id)}
                      onChangeRole={() => onChangeRole(user)}
                      onResetPassword={() => onResetPassword(user.id)}
                      onDelete={() => onDelete(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
