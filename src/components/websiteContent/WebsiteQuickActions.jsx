import { ExternalLink, Download, Upload, Archive } from "lucide-react";

const actions = [
  { icon: ExternalLink, label: "Preview Website", color: "text-blue-600 bg-blue-50", action: "preview" },
  { icon: Download, label: "Export Content", color: "text-emerald-600 bg-emerald-50", action: "export" },
  { icon: Upload, label: "Import Content", color: "text-purple-600 bg-purple-50", action: "import" },
  { icon: Archive, label: "Trash / Deleted Items", color: "text-red-600 bg-red-50", action: "trash" },
];

export default function WebsiteQuickActions({ onAction }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.action}
              onClick={() => onAction(a.action)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:opacity-80 ${a.color}`}
            >
              <Icon size={16} />
              {a.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
