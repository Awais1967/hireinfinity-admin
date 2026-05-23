import { useState } from "react";
import { X } from "lucide-react";

const specialties = ["Frontend & Figma", "Backend & Databases", "Mobile Apps", "DevOps & SRE", "QA Automation"];
const availabilities = ["Available", "Limited", "Unavailable"];
const visibilities = ["Public", "Private"];
const seniorities = ["Junior", "Mid-Level", "Senior", "Lead", "Architect"];

const emptyForm = {
  name: "",
  id: "",
  avatar: "",
  specialty: "Frontend & Figma",
  experience: "",
  monthlyRate: "",
  hourlyRate: "",
  availability: "Available",
  visibility: "Public",
  featured: false,
  seniority: "Mid-Level",
};

let nextId = 901;

export default function EngineerModal({ mode, record, onClose, onSave }) {
  const isEdit = mode === "edit";
  const [form, setForm] = useState(
    isEdit && record
      ? {
          name: record.name,
          id: record.id,
          avatar: record.avatar,
          specialty: record.specialty,
          experience: record.experience,
          monthlyRate: record.monthlyRate,
          hourlyRate: record.hourlyRate,
          availability: record.availability,
          visibility: record.visibility,
          featured: record.featured,
          seniority: record.seniority,
        }
      : { ...emptyForm, id: `ENG-${String(++nextId).padStart(3, "0")}` }
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
        className="w-full max-w-xl rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {isEdit ? "Edit Engineer" : "Add Engineer"}
          </h2>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Engineer Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={inputClass}
                placeholder="e.g. Senior React Developer"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Engineer ID</label>
              <input
                type="text"
                value={form.id}
                onChange={(e) => handleChange("id", e.target.value)}
                className={inputClass}
                readOnly={isEdit}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Avatar URL</label>
            <input
              type="text"
              value={form.avatar}
              onChange={(e) => handleChange("avatar", e.target.value)}
              className={inputClass}
              placeholder="https://randomuser.me/api/portraits/..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Specialty</label>
              <select
                value={form.specialty}
                onChange={(e) => handleChange("specialty", e.target.value)}
                className={inputClass}
              >
                {specialties.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Seniority</label>
              <select
                value={form.seniority}
                onChange={(e) => handleChange("seniority", e.target.value)}
                className={inputClass}
              >
                {seniorities.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Experience</label>
            <input
              type="text"
              value={form.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
              className={inputClass}
              placeholder="e.g. 5 - 7 yrs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Monthly Rate</label>
              <input
                type="text"
                value={form.monthlyRate}
                onChange={(e) => handleChange("monthlyRate", e.target.value)}
                className={inputClass}
                placeholder="e.g. $4,500/mo"
              />
            </div>
            <div>
              <label className={labelClass}>Hourly Rate</label>
              <input
                type="text"
                value={form.hourlyRate}
                onChange={(e) => handleChange("hourlyRate", e.target.value)}
                className={inputClass}
                placeholder="e.g. $32/hr"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Availability</label>
              <select
                value={form.availability}
                onChange={(e) => handleChange("availability", e.target.value)}
                className={inputClass}
              >
                {availabilities.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Visibility</label>
              <select
                value={form.visibility}
                onChange={(e) => handleChange("visibility", e.target.value)}
                className={inputClass}
              >
                {visibilities.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => handleChange("featured", e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Featured Profile
          </label>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              {isEdit ? "Save Changes" : "Add Engineer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
