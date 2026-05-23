import { Trash2, Eye, EyeOff, Star } from "lucide-react";

export default function BulkActions({ selectedCount, onDeleteSelected, onMakePublic, onMakePrivate, onMarkFeatured }) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 shadow-sm">
      <span className="mr-2 text-sm font-semibold text-blue-700">
        {selectedCount} selected
      </span>
      <button
        onClick={onDeleteSelected}
        className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
      >
        <Trash2 size={14} />
        Delete Selected
      </button>
      <button
        onClick={onMakePublic}
        className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50"
      >
        <Eye size={14} />
        Make Public
      </button>
      <button
        onClick={onMakePrivate}
        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
      >
        <EyeOff size={14} />
        Make Private
      </button>
      <button
        onClick={onMarkFeatured}
        className="flex items-center gap-1.5 rounded-lg border border-purple-200 bg-white px-3 py-1.5 text-xs font-medium text-purple-600 hover:bg-purple-50"
      >
        <Star size={14} />
        Mark Featured
      </button>
    </div>
  );
}
