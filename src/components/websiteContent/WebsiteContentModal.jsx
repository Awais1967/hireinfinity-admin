import { useState } from "react";
import { X } from "lucide-react";
import { typeOptions } from "../../data/websiteContentData";

const statusOptions = ["Published", "Draft", "Hidden"];

export default function WebsiteContentModal({ mode, record, onClose, onSave }) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState(
    isEdit && record
      ? { ...record }
      : { sectionName: "", type: "Hero", description: "", status: "Draft", content: "", seoTitle: "", metaDescription: "" }
  );

  const h = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.sectionName.trim()) return;
    const now = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const hh = now.getHours() % 12 || 12;
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} ${hh}:${mm} ${ampm}`;
    onSave({ ...form, lastUpdated: dateStr });
    onClose();
  };

  const inputClass = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";
  const labelClass = "block text-xs font-medium text-slate-500 mb-1";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{isEdit ? "Edit Section" : "Add Section"}</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          <div>
            <label className={labelClass}>Section Name</label>
            <input type="text" value={form.sectionName} onChange={(e) => h("sectionName", e.target.value)} className={inputClass} placeholder="e.g. Hero Section" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Type</label>
              <select value={form.type} onChange={(e) => h("type", e.target.value)} className={inputClass}>
                {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={(e) => h("status", e.target.value)} className={inputClass}>
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <input type="text" value={form.description} onChange={(e) => h("description", e.target.value)} className={inputClass} placeholder="Brief section description" />
          </div>
          <div>
            <label className={labelClass}>Content</label>
            <textarea value={form.content} onChange={(e) => h("content", e.target.value)} className={`${inputClass} min-h-[80px] resize-y`} placeholder="Section content text..." />
          </div>
          <div>
            <label className={labelClass}>SEO Title</label>
            <input type="text" value={form.seoTitle} onChange={(e) => h("seoTitle", e.target.value)} className={inputClass} placeholder="SEO title for this section" />
          </div>
          <div>
            <label className={labelClass}>Meta Description</label>
            <textarea value={form.metaDescription} onChange={(e) => h("metaDescription", e.target.value)} className={`${inputClass} min-h-[60px] resize-y`} placeholder="Meta description for SEO" />
          </div>
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">{isEdit ? "Save Changes" : "Add Section"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
