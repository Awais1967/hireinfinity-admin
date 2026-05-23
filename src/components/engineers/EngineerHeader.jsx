import { Plus, Download } from "lucide-react";

export default function EngineerHeader({ onAdd, onExport }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Engineer Roster</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage engineer profiles, rates, availability and visibility.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <Download size={15} />
          Export
        </button>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Engineer
        </button>
      </div>
    </div>
  );
}
