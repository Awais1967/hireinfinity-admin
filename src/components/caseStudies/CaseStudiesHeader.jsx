import { Plus } from "lucide-react";

export default function CaseStudiesHeader({ onAdd }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Case Studies</h1>
        <p className="mt-1 text-sm text-slate-500">Manage customer success stories and case studies.</p>
      </div>
      <button onClick={onAdd} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
        <Plus size={16} /> Add Case Study
      </button>
    </div>
  );
}
