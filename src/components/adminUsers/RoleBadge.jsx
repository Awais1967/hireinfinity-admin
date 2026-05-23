const roleStyles = {
  "Super Admin": "bg-blue-100 text-blue-700",
  "Admin": "bg-cyan-100 text-cyan-700",
  "Manager": "bg-purple-100 text-purple-700",
  "Content Editor": "bg-orange-100 text-orange-700",
  "Viewer": "bg-slate-100 text-slate-600",
};

export default function RoleBadge({ role }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleStyles[role] || "bg-slate-100 text-slate-600"}`}>
      {role}
    </span>
  );
}
