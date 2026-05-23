const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-600",
  Pending: "bg-amber-100 text-amber-700",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status] || "bg-slate-100 text-slate-600"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "Active" ? "bg-green-500" : status === "Inactive" ? "bg-red-500" : "bg-amber-500"}`} />
      {status}
    </span>
  );
}
