import { Save } from "lucide-react";

export default function SettingsHeader({ onSave, hasChanges }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage platform configuration, preferences and system settings.</p>
      </div>
      <button
        onClick={onSave}
        disabled={!hasChanges}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors ${
          hasChanges ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
        }`}
      >
        <Save size={15} />
        Save All Changes
      </button>
    </div>
  );
}
