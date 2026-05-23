import { X, UserPlus, FileEdit, Eye, EyeOff, BookOpen, Shield, Download, User, FileText } from "lucide-react";
import { activityLogs } from "../../data/adminUsersData";

const typeIcons = {
  user: UserPlus, content: FileEdit, roster: EyeOff, pricing: FileText,
  settings: Shield, report: Download, book: BookOpen,
};

const typeColors = {
  user: "text-blue-600 bg-blue-100", content: "text-orange-600 bg-orange-100",
  roster: "text-purple-600 bg-purple-100", pricing: "text-green-600 bg-green-100",
  settings: "text-cyan-600 bg-cyan-100", report: "text-amber-600 bg-amber-100",
};

export default function ActivityLogModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Activity Log</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-3">
          {activityLogs.map((log) => {
            const Icon = typeIcons[log.type] || Eye;
            const color = typeColors[log.type] || "text-slate-600 bg-slate-100";
            return (
              <div key={log.id} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-slate-50 p-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">
                    <span className="font-semibold">{log.user}</span> {log.action}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{log.time}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-6 pb-4">
          <button onClick={onClose} className="w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Close</button>
        </div>
      </div>
    </div>
  );
}
