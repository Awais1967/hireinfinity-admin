import { useState, useRef, useEffect } from "react";
import { Eye, Edit3, MoreVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function ConsultationTable({
  records,
  onView,
  onEdit,
  onMarkConverted,
  onMarkRejected,
  onDelete,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!records.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-slate-500">No records match your filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-slate-50">
              {["Name", "Company", "Email", "Specialty", "Budget", "Timeline", "Status", "Scheduled On", "Assigned To", "Actions"].map(
                (col) => (
                  <th key={col} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-b border-gray-50 transition-colors hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{record.name}</td>
                <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{record.company}</td>
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{record.email}</td>
                <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{record.specialty}</td>
                <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{record.budget}</td>
                <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{record.timeline}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge status={record.status} />
                </td>
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{record.scheduledOn}</td>
                <td className="px-4 py-3 whitespace-nowrap">
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
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === record.id ? null : record.id)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                        title="More"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {openMenuId === record.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                        >
                          <button
                            onClick={() => {
                              onMarkConverted(record.id);
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            Mark as Converted
                          </button>
                          <button
                            onClick={() => {
                              onMarkRejected(record.id);
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          >
                            Mark as Rejected
                          </button>
                          <hr className="my-1 border-gray-100" />
                          <button
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this request?")) {
                                onDelete(record.id);
                              }
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            Delete Request
                          </button>
                        </div>
                      )}
                    </div>
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
