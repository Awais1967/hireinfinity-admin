import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function RolesPermissions({ roles, onEdit, onDelete, onCreate }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-slate-900">Roles</h3>
        <button onClick={onCreate} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors">+ New Role</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-slate-50">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Role Name</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Description</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Users</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Permissions</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b border-gray-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">{role.name}</td>
                <td className="px-4 py-3 text-slate-600 text-xs max-w-[220px]">{role.description}</td>
                <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{role.users}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">{role.permissions} perms</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={role.status} /></td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <button onClick={() => onEdit(role)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><Edit2 size={15} /></button>
                    {role.users === 0 && (
                      <button onClick={() => onDelete(role.id)} className="grid h-8 w-8 place-items-center rounded-lg text-red-400 hover:bg-red-50"><Trash2 size={15} /></button>
                    )}
                    {role.users > 0 && (
                      <button disabled className="grid h-8 w-8 place-items-center rounded-lg text-slate-200 cursor-not-allowed" title={`${role.users} user(s) assigned`}><Trash2 size={15} /></button>
                    )}
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
