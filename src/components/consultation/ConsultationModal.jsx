import { useState } from "react";
import { X } from "lucide-react";
import StatusBadge from "./StatusBadge";

const statusOptions = ["New", "Contacted", "Scheduled", "In Progress", "Rejected"];
const assigneeOptions = ["Sarah M.", "Alex R.", "David K.", "Unassigned"];

export default function ConsultationModal({ mode, record, onClose, onSave }) {
  const [form, setForm] = useState(
    record
      ? {
          status: record.status,
          assignedTo: record.assignedTo,
          scheduledOn: record.scheduledOn,
        }
      : {}
  );

  if (!record) return null;

  const isView = mode === "view";

  const handleSave = () => {
    onSave(record.id, form);
    onClose();
  };

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
            {isView ? "Request Details" : "Edit Request"}
          </h2>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Name</p>
              <p className="text-sm font-semibold text-slate-900">{record.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Company</p>
              <p className="text-sm font-semibold text-slate-900">{record.company}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">Email</p>
            <p className="text-sm font-semibold text-slate-900">{record.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Specialty</p>
              <p className="text-sm font-semibold text-slate-900">{record.specialty}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Budget</p>
              <p className="text-sm font-semibold text-slate-900">{record.budget}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Timeline</p>
              <p className="text-sm font-semibold text-slate-900">{record.timeline}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Status</p>
              {isView ? (
                <StatusBadge status={record.status} />
              ) : (
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Scheduled On</p>
              {isView ? (
                <p className="text-sm font-semibold text-slate-900">{record.scheduledOn}</p>
              ) : (
                <input
                  type="text"
                  value={form.scheduledOn}
                  onChange={(e) => setForm({ ...form, scheduledOn: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                />
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Assigned To</p>
              {isView ? (
                <p className="text-sm font-semibold text-slate-900">{record.assignedTo}</p>
              ) : (
                <select
                  value={form.assignedTo}
                  onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                >
                  {assigneeOptions.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          {!isView && (
            <button
              onClick={handleSave}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
