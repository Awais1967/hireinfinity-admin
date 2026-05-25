import { useState, useRef, useEffect } from "react";
import { Star, Edit3, MoreVertical, Eye, UserX, EyeOff } from "lucide-react";
import EngineerBadge from "./EngineerBadge";

export default function EngineerTable({
  records,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onEdit,
  onViewProfile,
  onDelete,
  onMarkFeaturedAction,
  onRemoveFeatured,
  onChangeVisibility,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const allSelected = records.length > 0 && selectedIds.length === records.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  if (!records.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-slate-500">No engineers match your filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-slate-50">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600"
                />
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Engineer</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Specialty</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Experience</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Rates</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Availability</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Visibility</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((eng) => {
              const isSelected = selectedIds.includes(eng.id);
              return (
                <tr
                  key={eng.id}
                  className={`border-b border-gray-50 transition-colors hover:bg-slate-50/50 ${
                    isSelected ? "bg-blue-50/40" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectOne(eng.id)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={eng.avatar}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover bg-slate-200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                        }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{eng.name}</p>
                        <p className="text-xs text-slate-400">{eng.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <EngineerBadge type="specialty" value={eng.specialty} />
                  </td>
                  <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{eng.experience}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-sm font-semibold text-slate-900">{eng.monthlyRate}</p>
                    <p className="text-xs text-slate-400">{eng.hourlyRate}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <EngineerBadge type="availability" value={eng.availability} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <EngineerBadge type="visibility" value={eng.visibility} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEdit(eng)}
                        className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit3 size={16} />
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === eng.id ? null : eng.id)}
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                          title="More"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {openMenuId === eng.id && (
                          <div
                            ref={menuRef}
                            className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                          >
                            <button
                              onClick={() => { onViewProfile(eng); setOpenMenuId(null); }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Eye size={15} />
                              View Profile
                            </button>
                            {eng.featured ? (
                              <button
                                onClick={() => { onRemoveFeatured(eng.id); setOpenMenuId(null); }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Star size={15} />
                                Remove Featured
                              </button>
                            ) : (
                              <button
                                onClick={() => { onMarkFeaturedAction(eng.id); setOpenMenuId(null); }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Star size={15} />
                                Mark as Featured
                              </button>
                            )}
                            <button
                              onClick={() => { onChangeVisibility(eng.id); setOpenMenuId(null); }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <EyeOff size={15} />
                              Change Visibility
                            </button>
                            <hr className="my-1 border-gray-100" />
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete ${eng.name}?`)) {
                                  onDelete(eng.id);
                                }
                                setOpenMenuId(null);
                              }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <UserX size={15} />
                              Delete Engineer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
