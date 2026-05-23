import { useState } from "react";
import { X } from "lucide-react";

const industryOptions = ["FinTech", "Logistics", "Healthcare", "SaaS", "EdTech", "Real Estate", "E-commerce", "AI", "Other"];
const statusOpts = ["Published", "Draft", "Archived"];

export default function CaseStudyModal({ mode, record, onClose, onSave }) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState(
    isEdit && record
      ? { ...record }
      : { title: "", industry: "FinTech", services: "", results: "", status: "Draft", featured: false, lastUpdated: "", overview: "", challenge: "", solution: "", technologies: "", impact: "", testimonial: "", logoType: "blocks" }
  );
  const [errors, setErrors] = useState({});

  const h = (f, v) => { setForm((p) => ({ ...p, [f]: v })); setErrors((p) => ({ ...p, [f]: "" })); };

  const submit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Required";
    if (!form.services.trim()) newErrors.services = "Required";
    if (!form.results.trim()) newErrors.results = "Required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;
    const now = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    onSave({ ...form, lastUpdated: isEdit ? form.lastUpdated : dateStr });
    onClose();
  };

  const inputClass = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";
  const labelClass = "block text-xs font-medium text-slate-500 mb-1";
  const errClass = "text-xs text-red-500 mt-0.5";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">{isEdit ? "Edit Case Study" : "Add Case Study"}</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title</label>
              <input type="text" value={form.title} onChange={(e) => h("title", e.target.value)} className={inputClass} placeholder="e.g. FintechFlow" />
              {errors.title && <p className={errClass}>{errors.title}</p>}
            </div>
            <div>
              <label className={labelClass}>Industry</label>
              <select value={form.industry} onChange={(e) => h("industry", e.target.value)} className={inputClass}>
                {industryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Services</label>
            <input type="text" value={form.services} onChange={(e) => h("services", e.target.value)} className={inputClass} placeholder="e.g. Web App, Cloud, DevOps" />
            {errors.services && <p className={errClass}>{errors.services}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Results</label>
              <input type="text" value={form.results} onChange={(e) => h("results", e.target.value)} className={inputClass} placeholder="e.g. 60% faster delivery" />
              {errors.results && <p className={errClass}>{errors.results}</p>}
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={(e) => h("status", e.target.value)} className={inputClass}>
                {statusOpts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => h("featured", e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
            Featured Case Study
          </label>
          <div><label className={labelClass}>Overview</label><textarea value={form.overview} onChange={(e) => h("overview", e.target.value)} className={`${inputClass} min-h-[60px] resize-y`} /></div>
          <div><label className={labelClass}>Challenge</label><textarea value={form.challenge} onChange={(e) => h("challenge", e.target.value)} className={`${inputClass} min-h-[60px] resize-y`} /></div>
          <div><label className={labelClass}>Solution</label><textarea value={form.solution} onChange={(e) => h("solution", e.target.value)} className={`${inputClass} min-h-[60px] resize-y`} /></div>
          <div><label className={labelClass}>Technologies Used</label><input type="text" value={form.technologies} onChange={(e) => h("technologies", e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>Results & Impact</label><textarea value={form.impact} onChange={(e) => h("impact", e.target.value)} className={`${inputClass} min-h-[60px] resize-y`} /></div>
          <div><label className={labelClass}>Client Testimonial</label><textarea value={form.testimonial} onChange={(e) => h("testimonial", e.target.value)} className={`${inputClass} min-h-[60px] resize-y`} /></div>
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">{isEdit ? "Save Changes" : "Add Case Study"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
