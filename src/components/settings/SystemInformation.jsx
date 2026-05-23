import { Server } from "lucide-react";
import { systemInfo } from "../../data/settingsData";

export default function SystemInformation() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-4">
        <Server size={16} className="text-blue-600" /> System Information
      </h3>
      <div className="space-y-2.5 text-sm">
        {Object.entries(systemInfo).map(([key, val]) => {
          const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
          const isEnv = key === "environment";
          const isRole = key === "role";
          return (
            <div key={key} className="flex items-center justify-between">
              <span className="text-slate-500 text-xs">{label}</span>
              {isEnv ? (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">{val}</span>
              ) : isRole ? (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">{val}</span>
              ) : (
                <span className="text-slate-900 font-medium text-xs">{val}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
