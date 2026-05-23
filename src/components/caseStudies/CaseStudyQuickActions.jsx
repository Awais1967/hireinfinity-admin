import { ExternalLink, Download, ArrowUpDown } from "lucide-react";

export default function CaseStudyQuickActions({ onAction }) {
  const actions = [
    { icon: ExternalLink, label: "View Website", color: "text-blue-600 bg-blue-50", key: "preview" },
    { icon: Download, label: "Export Report", color: "text-emerald-600 bg-emerald-50", key: "export" },
    { icon: ArrowUpDown, label: "Reorder Case Studies", color: "text-purple-600 bg-purple-50", key: "reorder" },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
      <div className="space-y-1.5">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button key={a.key} onClick={() => onAction(a.key)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:opacity-80 ${a.color}`}>
              <Icon size={16} /> {a.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
