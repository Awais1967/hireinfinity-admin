import { useState } from "react";
import { X } from "lucide-react";

export default function ImportModal({ onClose, onImport }) {
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");

  const handleImport = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) throw new Error("Must be an array");
      parsed.forEach((item, i) => {
        if (!item.sectionName || !item.type) throw new Error(`Item ${i + 1} missing sectionName or type`);
      });
      onImport(parsed);
      onClose();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Import Content</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-3">
          <p className="text-xs text-slate-500">Paste JSON content array below. Each item must have at least <code>sectionName</code> and <code>type</code>.</p>
          <textarea
            value={jsonText}
            onChange={(e) => { setJsonText(e.target.value); setError(""); }}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono min-h-[180px] resize-y outline-none focus:border-blue-400"
            placeholder='[{ "sectionName": "...", "type": "Hero", ... }]'
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button onClick={handleImport} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">Import</button>
          </div>
        </div>
      </div>
    </div>
  );
}
