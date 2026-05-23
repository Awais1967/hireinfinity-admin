import { BookOpen, CheckCircle, FileEdit, Archive } from "lucide-react";

export default function CaseStudiesStats({ stats }) {
  const cards = [
    { icon: BookOpen, value: stats.total, label: "Total Case Studies", color: "bg-blue-100 text-blue-600" },
    { icon: CheckCircle, value: stats.published, label: "Published", color: "bg-emerald-100 text-emerald-600" },
    { icon: FileEdit, value: stats.draft, label: "Draft", color: "bg-amber-100 text-amber-600" },
    { icon: Archive, value: stats.archived, label: "Archived", color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${c.color}`}><Icon size={22} /></div>
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
