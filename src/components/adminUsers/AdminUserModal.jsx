import { useState } from "react";
import { X } from "lucide-react";
import { roleOptions, statusOptions } from "../../data/adminUsersData";

export default function AdminUserModal({ mode, record, onClose, onSave }) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState(
    isEdit && record
      ? { ...record, sendInvite: false }
      : { name: "", email: "", avatar: "", role: "Admin", status: "Pending", sendInvite: true }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (f, v) => {
    setForm((p) => ({ ...p, [f]: v }));
    setErrors((p) => ({ ...p, [f]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.avatar.trim()) e.avatar = "Avatar URL is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  const inputClass = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";
  const labelClass = "block text-xs font-medium text-slate-500 mb-1";
  const errClass = "text-xs text-red-500 mt-0.5";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{isEdit ? "Edit Admin User" : "Invite New Admin"}</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} className={inputClass} placeholder="e.g. John Doe" />
            {errors.name && <p className={errClass}>{errors.name}</p>}
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={inputClass} placeholder="e.g. john@hireinfinity.com" />
            {errors.email && <p className={errClass}>{errors.email}</p>}
          </div>
          <div>
            <label className={labelClass}>Avatar URL</label>
            <input type="url" value={form.avatar} onChange={(e) => handleChange("avatar", e.target.value)} className={inputClass} placeholder="https://randomuser.me/api/portraits/..." />
            {errors.avatar && <p className={errClass}>{errors.avatar}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Role</label>
              <select value={form.role} onChange={(e) => handleChange("role", e.target.value)} className={inputClass}>
                {roleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={(e) => handleChange("status", e.target.value)} className={inputClass}>
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {!isEdit && (
            <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" checked={form.sendInvite} onChange={(e) => handleChange("sendInvite", e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
              Send invitation email
            </label>
          )}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">{isEdit ? "Save Changes" : "Invite Admin"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
