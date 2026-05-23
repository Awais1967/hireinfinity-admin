import { useState } from "react";
import { X, Trash2, Plus } from "lucide-react";

export default function PricingEditModal({ activeTab, data, onClose, onSave }) {
  const isPods = activeTab === "pods";
  const [rows, setRows] = useState(() => data.rows.map((r) => ({ ...r })));
  const [errors, setErrors] = useState({});

  const handleChange = (id, field, value) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    setErrors((prev) => ({ ...prev, [`${id}-${field}`]: "" }));
  };

  const handleAdd = () => {
    const newId = Math.max(...rows.map((r) => r.id), 0) + 1;
    if (isPods) {
      setRows((prev) => [...prev, { id: newId, podType: "", composition: "", price: "", bestFor: "" }]);
    } else {
      setRows((prev) => [...prev, { id: newId, sector: "", junior: "", mid: "", senior: "", lead: "" }]);
    }
  };

  const handleDelete = (id) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const validate = () => {
    const newErrors = {};
    rows.forEach((row) => {
      if (isPods) {
        if (!row.podType?.trim()) newErrors[`${row.id}-podType`] = "Required";
        if (!row.composition?.trim()) newErrors[`${row.id}-composition`] = "Required";
        if (!row.price?.trim()) newErrors[`${row.id}-price`] = "Required";
        if (!row.bestFor?.trim()) newErrors[`${row.id}-bestFor`] = "Required";
      } else {
        if (!row.sector?.trim()) newErrors[`${row.id}-sector`] = "Required";
        if (!row.junior?.trim()) newErrors[`${row.id}-junior`] = "Required";
        if (!row.mid?.trim()) newErrors[`${row.id}-mid`] = "Required";
        if (!row.senior?.trim()) newErrors[`${row.id}-senior`] = "Required";
        if (!row.lead?.trim()) newErrors[`${row.id}-lead`] = "Required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(rows);
    onClose();
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400";
  const errClass = "text-xs text-red-500 mt-0.5";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Edit {activeTab === "monthly" ? "Monthly Rates" : activeTab === "hourly" ? "Hourly Rates" : "Team Pods"}
          </h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-3 py-2 text-xs font-semibold text-slate-500">
                    {isPods ? "Pod Type" : "Sector"}
                  </th>
                  {isPods ? (
                    <>
                      <th className="px-3 py-2 text-xs font-semibold text-slate-500">Composition</th>
                      <th className="px-3 py-2 text-xs font-semibold text-slate-500">Price</th>
                      <th className="px-3 py-2 text-xs font-semibold text-slate-500">Best For</th>
                    </>
                  ) : (
                    ["Junior", "Mid-Level", "Senior", "Staff / Lead"].map((lbl) => (
                      <th key={lbl} className="px-3 py-2 text-xs font-semibold text-slate-500">{lbl}</th>
                    ))
                  )}
                  <th className="w-10 px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const fields = isPods
                    ? ["podType", "composition", "price", "bestFor"]
                    : ["sector", "junior", "mid", "senior", "lead"];
                  return (
                    <tr key={row.id} className="border-b border-gray-50">
                      {fields.map((f) => (
                        <td key={f} className="px-3 py-2">
                          <input
                            type="text"
                            value={row[f] || ""}
                            onChange={(e) => handleChange(row.id, f, e.target.value)}
                            className={inputClass}
                          />
                          {errors[`${row.id}-${f}`] && <p className={errClass}>{errors[`${row.id}-${f}`]}</p>}
                        </td>
                      ))}
                      <td className="px-3 py-2">
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          disabled={rows.length <= 1}
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-30"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <Plus size={15} />
            Add Row
          </button>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
