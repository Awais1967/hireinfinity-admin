import { Plus, ExternalLink } from "lucide-react";

export default function WebsiteContentHeader({ onPreview, onAdd }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Website Content</h1>
        <p className="mt-1 text-sm text-slate-500">Update and manage all content sections displayed on the public website.</p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onPreview} className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          <ExternalLink size={15} />
          Preview Website
        </button>
        <button onClick={onAdd} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
          <Plus size={16} />
          Add Section
        </button>
      </div>
    </div>
  );
}
