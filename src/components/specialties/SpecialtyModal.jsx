import { useState } from "react";
import { X } from "lucide-react";
import { iconOptions } from "../../data/specialtiesData";

export default function SpecialtyModal({ activeTab, record, onClose, onSave, specialtyOptions }) {
  const isSpecialty = activeTab === "specialties";
  const isEdit = !!record;

  const [form, setForm] = useState(
    isEdit
      ? { ...record }
      : isSpecialty
        ? { name: "", description: "", icon: "Code", status: "Active", order: 1 }
        : { name: "", category: specialtyOptions[0] || "", status: "Active", order: 1 }
  );

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
    onClose();
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";
  const labelClass = "block text-xs font-medium text-slate-500 mb-1";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {isEdit ? `Edit ${isSpecialty ? "Specialty" : "Tech Tag"}` : `Add ${isSpecialty ? "Specialty" : "Tech Tag"}`}
          </h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className={labelClass}>{isSpecialty ? "Specialty Name" : "Technology Name"}</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputClass}
              placeholder={isSpecialty ? "e.g. Frontend & Figma" : "e.g. React.js"}
              required
            />
          </div>

          {isSpecialty ? (
            <>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className={`${inputClass} min-h-[72px] resize-y`}
                  placeholder="Brief description of this specialty"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Icon</label>
                  <select value={form.icon} onChange={(e) => handleChange("icon", e.target.value)} className={inputClass}>
                    {iconOptions.map((ico) => (
                      <option key={ico} value={ico}>{ico}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => handleChange("order", parseInt(e.target.value) || 1)}
                    className={inputClass}
                    min="1"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category</label>
                <select value={form.category} onChange={(e) => handleChange("category", e.target.value)} className={inputClass}>
                  {specialtyOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => handleChange("order", parseInt(e.target.value) || 1)}
                  className={inputClass}
                  min="1"
                />
              </div>
            </div>
          )}

          <div>
            <label className={labelClass}>Status</label>
            <select value={form.status} onChange={(e) => handleChange("status", e.target.value)} className={inputClass}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
              {isEdit ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
