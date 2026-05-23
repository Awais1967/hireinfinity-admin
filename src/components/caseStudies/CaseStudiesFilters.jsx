import { Search, Filter } from "lucide-react";
import { statusOptions } from "../../data/caseStudiesData";

export default function CaseStudiesFilters({ searchQuery, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="relative min-w-[180px] flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search case studies..." value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-400" />
      </div>
      <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400">
        {statusOptions.map((o) => <option key={o} value={o === "All Status" ? "" : o}>{o}</option>)}
      </select>
      <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"><Filter size={15} /> Filters</button>
    </div>
  );
}
