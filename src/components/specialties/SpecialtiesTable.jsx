import { Monitor, Database, Smartphone, Cloud, ShieldCheck, Code, Server } from "lucide-react";
import StatusBadge from "./StatusBadge";
import RowActions from "./RowActions";

const iconMap = {
  Monitor: Monitor,
  Database: Database,
  Smartphone: Smartphone,
  Cloud: Cloud,
  ShieldCheck: ShieldCheck,
  Code: Code,
  Server: Server,
};

export default function SpecialtiesTable({ records, onEdit, onActivate, onDeactivate, onMoveUp, onMoveDown, onDelete }) {
  if (!records.length) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-slate-500">No specialties found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-slate-50">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Specialty</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Description</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Order</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((item) => {
              const Icon = iconMap[item.icon] || Code;
              return (
                <tr key={item.id} className="border-b border-gray-50 transition-colors hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <Icon size={18} />
                      </div>
                      <span className="font-semibold text-slate-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 max-w-[300px] truncate">{item.description}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-600">
                      {item.order}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <RowActions
                      status={item.status}
                      onEdit={() => onEdit(item)}
                      onActivate={() => onActivate(item.id)}
                      onDeactivate={() => onDeactivate(item.id)}
                      onMoveUp={() => onMoveUp(item.id)}
                      onMoveDown={() => onMoveDown(item.id)}
                      onDelete={() => onDelete(item.id)}
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
