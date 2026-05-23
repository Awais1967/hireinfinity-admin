import { FileText, Edit3 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function WebsiteContentDetails({ selected, onEdit }) {
  if (!selected) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-3">
            <FileText size={28} />
          </div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Section Details</h3>
          <p className="text-xs text-slate-500 max-w-[180px]">Select a section to view and edit its content.</p>
        </div>
        <hr className="my-4 border-gray-100" />
        <ul className="space-y-2 text-xs text-slate-500">
          {["Inline text editing", "Media management", "SEO & meta settings", "Reorder sections", "Hide / Show sections", "Publish / Unpublish"].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> {f}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Section Details</h3>
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-xs text-slate-500">Section Name</p>
          <p className="font-semibold text-slate-900">{selected.sectionName}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Type</p>
          <p className="font-medium text-slate-700">{selected.type}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Status</p>
          <StatusBadge status={selected.status} />
        </div>
        <div>
          <p className="text-xs text-slate-500">Last Updated</p>
          <p className="font-medium text-slate-700">{selected.lastUpdated}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Description</p>
          <p className="text-slate-600">{selected.description}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Content Preview</p>
          <p className="text-slate-600 text-xs italic">{selected.content}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">SEO Title</p>
          <p className="font-medium text-slate-700">{selected.seoTitle}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Meta Description</p>
          <p className="text-slate-600 text-xs">{selected.metaDescription}</p>
        </div>
      </div>
      <button onClick={() => onEdit(selected)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
        <Edit3 size={14} /> Edit Section
      </button>
    </div>
  );
}
