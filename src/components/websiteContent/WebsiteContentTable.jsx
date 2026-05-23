import { GripVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";
import RowActions from "./RowActions";

export default function WebsiteContentTable({ records, onRowClick, selectedId, onEdit, onViewDetails, onPublish, onUnpublish, onHide, onDuplicate, onMoveUp, onMoveDown, onDelete }) {
  if (!records.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-slate-500">No sections found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-slate-50">
              <th className="w-8 px-3 py-3" />
              <th className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">#</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Section Name</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Description</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Last Updated</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((sec, idx) => {
              const isSelected = selectedId === sec.id;
              return (
                <tr
                  key={sec.id}
                  onClick={() => onRowClick(sec)}
                  className={`border-b border-gray-50 transition-colors cursor-pointer ${
                    isSelected ? "bg-blue-50/50" : "hover:bg-slate-50/50"
                  }`}
                >
                  <td className="px-3 py-3 text-slate-300">
                    <GripVertical size={15} className="cursor-grab" />
                  </td>
                  <td className="px-3 py-3 text-slate-500 font-mono text-xs">{String(idx + 1).padStart(2, "0")}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">{sec.sectionName}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-[220px] truncate">{sec.description}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={sec.status} /></td>
                  <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{sec.lastUpdated}</td>
                  <td className="px-4 py-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <RowActions
                      status={sec.status}
                      onEdit={() => onEdit(sec)}
                      onViewDetails={() => onViewDetails(sec)}
                      onPublish={() => onPublish(sec.id)}
                      onUnpublish={() => onUnpublish(sec.id)}
                      onHide={() => onHide(sec.id)}
                      onDuplicate={() => onDuplicate(sec)}
                      onMoveUp={() => onMoveUp(sec.id)}
                      onMoveDown={() => onMoveDown(sec.id)}
                      onDelete={() => onDelete(sec.id)}
                    />
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
