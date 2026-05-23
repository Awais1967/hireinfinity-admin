import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange }) {
  if (totalPages <= 1) return null;
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

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

  const pages = getPages();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
      <p className="text-slate-500">
        Showing <span className="font-semibold text-slate-700">{start}</span> to <span className="font-semibold text-slate-700">{end}</span> of <span className="font-semibold text-slate-700">{totalItems}</span> users
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors">
          <ChevronLeft size={16} />
        </button>
        {pages.map((p, i) => p === "..." ? <span key={`e-${i}`} className="grid h-9 w-9 place-items-center text-sm text-slate-400">...</span> : (
          <button key={p} onClick={() => onPageChange(p)} className={`grid h-9 w-9 place-items-center rounded-lg border text-sm font-semibold transition-colors ${p === currentPage ? "border-blue-600 bg-blue-600 text-white" : "border-gray-200 text-slate-600 hover:bg-slate-50"}`}>
            {p}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
