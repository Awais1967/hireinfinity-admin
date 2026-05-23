import { FileText, CheckCircle, FileEdit, Calendar } from "lucide-react";

export default function WebsiteContentStats({ sections }) {
  const total = sections.length;
  const published = sections.filter((s) => s.status === "Published").length;
  const drafts = sections.filter((s) => s.status === "Draft").length;
  const lastUpdated = sections.length > 0
    ? sections.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))[0].lastUpdated
    : "N/A";

  const cards = [
    { icon: FileText, value: total, label: "Total Sections", color: "bg-blue-100 text-blue-600" },
    { icon: CheckCircle, value: published, label: "Published", color: "bg-emerald-100 text-emerald-600" },
    { icon: FileEdit, value: drafts, label: "Drafts", color: "bg-amber-100 text-amber-600" },
    { icon: Calendar, value: lastUpdated, label: "Last Updated", color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${c.color}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{c.value}</p>
              <p className="text-xs font-medium text-slate-500">{c.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
