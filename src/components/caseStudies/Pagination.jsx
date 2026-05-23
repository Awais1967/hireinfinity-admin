import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, totalItems, pageSize, itemLabel, onPageChange }) {
  if (totalPages <= 1) return null;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      let s = Math.max(2, currentPage - 1);
      let e = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) { s = 2; e = 4; }
      if (currentPage >= totalPages - 2) { s = totalPages - 3; e = totalPages - 1; }
      for (let i = s; i <= e; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-sm text-slate-500">Showing {startItem} to {endItem} of {totalItems} {itemLabel}</p>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={16} /></button>
        {getPages().map((p, i) => p === "..." ? <span key={`e-${i}`} className="flex h-9 w-9 items-center justify-center text-sm text-slate-400">...</span> : (
          <button key={p} onClick={() => onPageChange(p)} className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === p ? "bg-blue-600 text-white" : "border border-gray-200 text-slate-600 hover:bg-slate-50"}`}>{p}</button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}
