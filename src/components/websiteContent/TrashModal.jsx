import { X, RotateCcw, Trash2 } from "lucide-react";

export default function TrashModal({ items, onClose, onRestore, onDeletePermanent }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Trash / Deleted Items</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="px-6 py-5">
          {items.length === 0 ? (
            <p className="text-sm text-slate-500">No deleted items.</p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-gray-100 bg-slate-50 p-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.sectionName}</p>
                    <p className="text-xs text-slate-500">{item.type} · {item.lastUpdated}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => onRestore(item.id)} className="grid h-8 w-8 place-items-center rounded-lg text-blue-600 hover:bg-blue-50 transition-colors" title="Restore"><RotateCcw size={15} /></button>
                    <button onClick={() => { if (window.confirm("Delete permanently?")) onDeletePermanent(item.id); }} className="grid h-8 w-8 place-items-center rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Delete permanently"><Trash2 size={15} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button onClick={onClose} className="mt-4 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Close</button>
        </div>
      </div>
    </div>
  );
}
