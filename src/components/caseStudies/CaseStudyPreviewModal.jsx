import { X } from "lucide-react";

export default function CaseStudyPreviewModal({ sections, onClose }) {
  const published = sections.filter((s) => s.status === "Published");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Case Studies Preview</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {published.length === 0 && <p className="text-sm text-slate-500">No published case studies to preview.</p>}
          {published.map((cs) => (
            <div key={cs.id} className="rounded-xl border border-gray-100 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900 mb-1">{cs.title}</h3>
              <p className="text-xs text-slate-500 mb-2">{cs.industry} · {cs.services}</p>
              <p className="text-sm text-slate-700">{cs.overview}</p>
              <p className="text-xs text-slate-500 mt-2 italic">{cs.testimonial}</p>
              <p className="text-xs font-semibold text-blue-600 mt-1">{cs.impact}</p>
            </div>
          ))}
        </div>
        <div className="px-6 pb-4">
          <button onClick={onClose} className="w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Close</button>
        </div>
      </div>
    </div>
  );
}
