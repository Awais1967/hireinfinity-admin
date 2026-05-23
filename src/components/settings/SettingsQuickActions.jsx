import { Trash2, RefreshCw, Download, Database, Key, RotateCcw } from "lucide-react";

const actions = [
  { icon: RefreshCw, label: "Clear Cache", color: "text-blue-600 bg-blue-50", key: "cache" },
  { icon: Download, label: "Export System Logs", color: "text-purple-600 bg-purple-50", key: "logs" },
  { icon: Database, label: "Backup Database", color: "text-emerald-600 bg-emerald-50", key: "backup" },
  { icon: Key, label: "Manage API Keys", color: "text-amber-600 bg-amber-50", key: "apikeys" },
  { icon: RotateCcw, label: "Reset Preferences", color: "text-red-600 bg-red-50", key: "reset" },
];

export default function SettingsQuickActions({ onAction }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
      <div className="space-y-1.5">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.key}
              onClick={() => onAction(a.key)}
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
