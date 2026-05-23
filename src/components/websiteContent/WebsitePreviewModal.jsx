import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function WebsitePreviewModal({ sections, onClose }) {
  const published = sections.filter((s) => s.status === "Published");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">HireInfinity Website Preview</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {published.length === 0 && <p className="text-sm text-slate-500">No published sections to preview.</p>}
          {published.map((sec) => (
            <div key={sec.id} className="rounded-xl border border-gray-100 bg-slate-50 p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-slate-900">{sec.sectionName}</h3>
                <StatusBadge status={sec.status} />
              </div>
              <p className="text-xs text-slate-500 mb-1">{sec.description}</p>
              <p className="text-sm text-slate-700">{sec.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
