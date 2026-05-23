export default function StatusBadge({ status }) {
  const styles = {
    Published: "bg-emerald-100 text-emerald-700",
    Draft: "bg-amber-100 text-amber-700",
    Archived: "bg-slate-200 text-slate-600",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}
