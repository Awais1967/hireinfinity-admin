import { Search, Filter } from "lucide-react";
import { filterOptions } from "../../data/engineerData";

export default function EngineerFilters({
  searchQuery,
  onSearchChange,
  specialty,
  onSpecialtyChange,
  availability,
  onAvailabilityChange,
  visibility,
  onVisibilityChange,
  seniority,
  onSeniorityChange,
}) {
  const selectClass =
    "rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 min-w-[140px]";

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="relative min-w-[180px] flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or keyword..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <select value={specialty} onChange={(e) => onSpecialtyChange(e.target.value)} className={selectClass}>
        {filterOptions.specialties.map((opt) => (
          <option key={opt} value={opt === "All Specialties" ? "" : opt}>{opt}</option>
        ))}
      </select>

      <select value={availability} onChange={(e) => onAvailabilityChange(e.target.value)} className={selectClass}>
        {filterOptions.availabilities.map((opt) => (
          <option key={opt} value={opt === "All Availability" ? "" : opt}>{opt}</option>
        ))}
      </select>

      <select value={visibility} onChange={(e) => onVisibilityChange(e.target.value)} className={selectClass}>
        {filterOptions.visibilities.map((opt) => (
          <option key={opt} value={opt === "All Visibility" ? "" : opt}>{opt}</option>
        ))}
      </select>

      <select value={seniority} onChange={(e) => onSeniorityChange(e.target.value)} className={selectClass}>
        {filterOptions.seniorities.map((opt) => (
          <option key={opt} value={opt === "All Seniority" ? "" : opt}>{opt}</option>
        ))}
      </select>

      <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
        <Filter size={15} />
        Filters
      </button>
    </div>
  );
}
