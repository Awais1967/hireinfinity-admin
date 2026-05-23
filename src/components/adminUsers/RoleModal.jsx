import { useState } from "react";
import { X } from "lucide-react";
import { modulePermissions, actionTypes, getDefaultPermissions } from "../../data/adminUsersData";

export default function RoleModal({ mode, record, existingRoles, onClose, onSave }) {
  const isEdit = mode === "edit" || mode === "view";
  const defaultPerms = (mode === "add" && existingRoles?.length === 0) ? getDefaultPermissions("Viewer") : (isEdit && record ? getDefaultPermissions(record.name) : getDefaultPermissions(""));

  const [form, setForm] = useState(
    isEdit && record ? { ...record } : { id: Date.now(), name: "", description: "", users: 0, status: "Active" }
  );
  const [permissions, setPermissions] = useState(
    isEdit && record ? getDefaultPermissions(record.name) : defaultPerms
  );
  const [errors, setErrors] = useState({});

  const togglePerm = (modIdx, action) => {
    setPermissions((prev) => {
      const copy = prev.map((m) => ({ ...m, actions: { ...m.actions } }));
      copy[modIdx].actions[action] = !copy[modIdx].actions[action];
      return copy;
    });
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!form.name.trim()) e.name = "Role name is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (mode === "add" && existingRoles?.some((r) => r.name.toLowerCase() === form.name.trim().toLowerCase())) e.name = "Role already exists";
    setErrors(e);
    if (Object.keys(e).length) return;
    const totalPerms = permissions.reduce((sum, m) => sum + Object.values(m.actions).filter(Boolean).length, 0);
    onSave({ ...form, permissions: totalPerms });
    onClose();
  };

  const inputClass = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";
  const labelClass = "block text-xs font-medium text-slate-500 mb-1";
  const errClass = "text-xs text-red-500 mt-0.5";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {mode === "add" ? "Create New Role" : mode === "edit" ? "Edit Role" : "Role Details"}
          </h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Role Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputClass} placeholder="e.g. Editor" />
              {errors.name && <p className={errClass}>{errors.name}</p>}
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className={inputClass}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} className={`${inputClass} min-h-[60px] resize-y`} placeholder="Describe this role..." />
            {errors.description && <p className={errClass}>{errors.description}</p>}
          </div>

          <div>
            <label className={`${labelClass} mb-2`}>Permissions</label>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-3 py-2 font-semibold text-slate-500">Module</th>
                    {actionTypes.map((a) => <th key={a} className="px-3 py-2 font-semibold text-slate-500 text-center">{a}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((mod, idx) => (
                    <tr key={mod.module} className="border-t border-gray-100">
                      <td className="px-3 py-2 text-slate-700 font-medium">{mod.module}</td>
                      {actionTypes.map((a) => (
                        <td key={a} className="px-3 py-2 text-center">
                          <input type="checkbox" checked={!!mod.actions[a]} onChange={() => togglePerm(idx, a)} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
              {mode === "add" ? "Create Role" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
