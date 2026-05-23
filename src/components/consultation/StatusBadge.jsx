import { statusColors } from "../../data/consultationData";

export default function StatusBadge({ status }) {
  const colorClass = statusColors[status] || "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}
    >
      {status}
    </span>
  );
}
