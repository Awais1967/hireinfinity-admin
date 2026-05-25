import { Search, Filter, Download } from "lucide-react";
import { filterOptions } from "../../data/consultationData";

export default function ConsultationFilters({
  searchQuery, onSearchChange,
  statusFilter, onStatusChange,
  specialtyFilter, onSpecialtyChange,
  timelineFilter, onTimelineChange,
  assignedFilter, onAssignedChange,
  assigneeOptions = filterOptions.assignees,
  onExportCSV,
}) {
  const selectClass = "w-full sm:w-auto rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 min-w-0 sm:min-w-[140px]";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="relative w-full sm:min-w-[180px] sm:flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, email or company..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)} className={selectClass}>
        {filterOptions.statuses.map((opt) => (
          <option key={opt} value={opt === "All Status" ? "" : opt}>{opt}</option>
        ))}
      </select>

      <select value={specialtyFilter} onChange={(e) => onSpecialtyChange(e.target.value)} className={selectClass}>
        {filterOptions.specialties.map((opt) => (
          <option key={opt} value={opt === "All Specialties" ? "" : opt}>{opt}</option>
        ))}
      </select>

      <select value={timelineFilter} onChange={(e) => onTimelineChange(e.target.value)} className={selectClass}>
        {filterOptions.timelines.map((opt) => (
          <option key={opt} value={opt === "All Timeline" ? "" : opt}>{opt}</option>
        ))}
      </select>

      <select value={assignedFilter} onChange={(e) => onAssignedChange(e.target.value)} className={selectClass}>
        {assigneeOptions.map((opt) => (
          <option key={opt} value={opt === "All Assignees" ? "" : opt}>{opt}</option>
        ))}
      </select>

      <div className="flex w-full sm:w-auto gap-2">
        <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Filter size={15} />
          Filters
        </button>

        <button
          onClick={onExportCSV}
          className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>
    </div>
  );
}
