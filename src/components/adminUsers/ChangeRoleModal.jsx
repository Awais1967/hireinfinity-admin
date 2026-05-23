import { useState } from "react";
import { X } from "lucide-react";
import { roleOptions } from "../../data/adminUsersData";

export default function ChangeRoleModal({ record, onClose, onSave }) {
  const [role, setRole] = useState(record.role);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Change Role</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-slate-600">Change role for <span className="font-semibold">{record.name}</span></p>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400">
            {roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button onClick={() => { onSave(record.id, role); onClose(); }} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
