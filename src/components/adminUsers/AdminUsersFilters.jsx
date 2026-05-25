import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

export default function AdminUsersFilters({ searchQuery, onSearchChange, roleFilter, onRoleChange, statusFilter, onStatusChange }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search admin users..." className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400" />
        </div>
        <select value={roleFilter} onChange={(e) => onRoleChange(e.target.value)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400">
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          {/* <option value="Admin">Admin</option> */}
          <option value="Manager">Manager</option>
          <option value="Content Editor">Content Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
        </select>
        <button onClick={() => setShowAdvanced((p) => !p)} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${showAdvanced ? "border-blue-300 bg-blue-50 text-blue-600" : "border-gray-200 text-slate-600 hover:bg-slate-50"}`}>
          <Filter size={15} /> Filters
        </button>
      </div>
      {showAdvanced && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Advanced Filters</p>
            <button onClick={() => setShowAdvanced(false)} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Last Login</label>
              <select className="w-full rounded-lg border border-gray-200 px-2.5 py-2 text-sm text-slate-700 outline-none focus:border-blue-400">
                <option value="">Any</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="older">Older</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Permission Level</label>
              <select className="w-full rounded-lg border border-gray-200 px-2.5 py-2 text-sm text-slate-700 outline-none focus:border-blue-400">
                <option value="">Any</option>
                <option value="full">Full Access</option>
                <option value="limited">Limited</option>
                <option value="readonly">Read Only</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
