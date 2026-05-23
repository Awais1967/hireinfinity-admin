import { useState, useMemo } from "react";
import { X, ArrowUp, ArrowDown } from "lucide-react";

export default function ReorderCaseStudiesModal({ records, onClose, onSave }) {
  const [items, setItems] = useState(() => [...records]);

  const moveUp = (idx) => {
    if (idx <= 0) return;
    const copy = [...items];
    [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
    setItems(copy);
  };

  const moveDown = (idx) => {
    if (idx >= items.length - 1) return;
    const copy = [...items];
    [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
    setItems(copy);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Reorder Case Studies</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-2">
          {items.map((item, idx) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border border-gray-100 bg-slate-50 p-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400 w-5">{idx + 1}.</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.industry}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => moveUp(idx)} disabled={idx === 0} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30"><ArrowUp size={15} /></button>
                <button onClick={() => moveDown(idx)} disabled={idx === items.length - 1} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30"><ArrowDown size={15} /></button>
              </div>
            </div>
          ))}
          <div className="flex justify-end gap-3 pt-3">
            <button onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button onClick={() => { onSave(items); onClose(); }} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}
