import { MessageSquare, UserCheck, FileText, Shield, Megaphone } from "lucide-react";
import { SettingRowSwitch } from "./SettingRow";

const fields = [
  { key: "newConsultation", icon: MessageSquare, label: "New Consultation Request Alerts", subtitle: "Get notified when a new consultation request is submitted.", color: "bg-blue-100 text-blue-600" },
  { key: "engineerAssignment", icon: UserCheck, label: "Engineer Assignment Alerts", subtitle: "Get notified when engineers are assigned to requests.", color: "bg-purple-100 text-purple-600" },
  { key: "weeklySummary", icon: FileText, label: "Weekly Summary Email", subtitle: "Receive a weekly summary of platform activity.", color: "bg-emerald-100 text-emerald-600" },
  { key: "securityAlerts", icon: Shield, label: "Security Alerts", subtitle: "Receive alerts for suspicious activity or logins.", color: "bg-amber-100 text-amber-600" },
  { key: "marketingUpdates", icon: Megaphone, label: "Marketing Updates", subtitle: "Receive marketing and product update emails.", color: "bg-cyan-100 text-cyan-600" },
];

export default function NotificationSettings({ settings, onChange }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 pt-4 pb-2">
        <h2 className="text-base font-semibold text-slate-900">Notification Preferences</h2>
      </div>
      <div className="px-5 pb-4">
        {fields.map((f) => (
          <SettingRowSwitch key={f.key} icon={f.icon} iconColor={f.color} label={f.label} subtitle={f.subtitle} checked={settings[f.key]} onChange={(v) => onChange(f.key, v)} />
        ))}
      </div>
    </div>
  );
}
