import { FileText, Edit3 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function CaseStudyDetails({ selected, onEdit }) {
  if (!selected) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-3"><FileText size={28} /></div>
          <h3 className="text-sm font-semibold text-slate-700 mb-1">Case Study Details</h3>
          <p className="text-xs text-slate-500 max-w-[180px]">Select a case study to view and edit details.</p>
        </div>
        <hr className="my-4 border-gray-100" />
        <ul className="space-y-2 text-xs text-slate-500">
          {["Overview", "The Challenge", "Our Solution", "Technologies Used", "Results & Impact", "Client Testimonial", "Gallery / Media"].map((f) => (
            <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> {f}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Case Study Details</h3>
      <div className="space-y-3 text-sm">
        <div><p className="text-xs text-slate-500">Title</p><p className="font-semibold text-slate-900">{selected.title}</p></div>
        <div className="flex gap-3">
          <div className="flex-1"><p className="text-xs text-slate-500">Industry</p><p className="font-medium text-slate-700">{selected.industry}</p></div>
          <div className="flex-1"><p className="text-xs text-slate-500">Status</p><StatusBadge status={selected.status} /></div>
        </div>
        <div><p className="text-xs text-slate-500">Last Updated</p><p className="font-medium text-slate-700">{selected.lastUpdated}</p></div>
        <div><p className="text-xs text-slate-500">Overview</p><p className="text-slate-600 text-xs">{selected.overview}</p></div>
        <div><p className="text-xs text-slate-500">Challenge</p><p className="text-slate-600 text-xs">{selected.challenge}</p></div>
        <div><p className="text-xs text-slate-500">Solution</p><p className="text-slate-600 text-xs">{selected.solution}</p></div>
        <div><p className="text-xs text-slate-500">Technologies</p><p className="font-medium text-slate-700 text-xs">{selected.technologies}</p></div>
        <div><p className="text-xs text-slate-500">Impact</p><p className="text-slate-600 text-xs">{selected.impact}</p></div>
        <div><p className="text-xs text-slate-500">Testimonial</p><p className="italic text-slate-600 text-xs">"{selected.testimonial}"</p></div>
      </div>
      <button onClick={() => onEdit(selected)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"><Edit3 size={14} /> Edit Case Study</button>
    </div>
  );
}
