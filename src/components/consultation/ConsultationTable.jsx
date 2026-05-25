import { Eye, Edit3, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function ConsultationTable({
  records,
  onView,
  onEdit,
  onDelete,
}) {
  if (!records.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-slate-500">No records match your filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] lg:min-w-[1000px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-slate-50">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Name</th>
              <th className="hidden sm:table-cell px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Company</th>
              <th className="hidden lg:table-cell px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Email</th>
              <th className="hidden md:table-cell px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Specialty</th>
              <th className="hidden md:table-cell px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Budget</th>
              <th className="hidden lg:table-cell px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Timeline</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="hidden lg:table-cell px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Scheduled On</th>
              <th className="hidden md:table-cell px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Assigned To</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b border-gray-50 transition-colors hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{record.name}</td>
                <td className="hidden sm:table-cell px-4 py-3 text-slate-700 whitespace-nowrap">{record.company}</td>
                <td className="hidden lg:table-cell px-4 py-3 text-slate-600 whitespace-nowrap">{record.email}</td>
                <td className="hidden md:table-cell px-4 py-3 text-slate-700 whitespace-nowrap">{record.specialty}</td>
                <td className="hidden md:table-cell px-4 py-3 text-slate-700 whitespace-nowrap">{record.budget}</td>
                <td className="hidden lg:table-cell px-4 py-3 text-slate-700 whitespace-nowrap">{record.timeline}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge status={record.status} />
                </td>
                <td className="hidden lg:table-cell px-4 py-3 text-slate-600 whitespace-nowrap">{record.scheduledOn}</td>
                <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${
                        record.assignedTo === "Unassigned"
                          ? "bg-slate-300"
                          : "bg-blue-500"
                      }`}
                    >
                      {record.assignedTo === "Unassigned"
                        ? "?"
                        : record.assignedTo.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-slate-700 text-sm">{record.assignedTo}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onView(record)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEdit(record)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this request?")) {
                          onDelete(record.id);
                        }
                      }}
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
