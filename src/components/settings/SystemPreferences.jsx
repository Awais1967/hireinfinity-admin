import { ToggleLeft, Bell, UserCheck, Database } from "lucide-react";
import { SettingRowSwitch, SettingRowSelect } from "./SettingRow";
import { retentionOptions } from "../../data/settingsData";

export default function SystemPreferences({ settings, onChange }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 pt-4 pb-2">
        <h2 className="text-base font-semibold text-slate-900">System Preferences</h2>
      </div>
      <div className="px-5 pb-4">
        <SettingRowSwitch icon={ToggleLeft} iconColor="bg-blue-100 text-blue-600" label="Allow New Consultation Requests" subtitle="Enable or disable new requests from the website." checked={settings.allowRequests} onChange={(v) => onChange("allowRequests", v)} />
        <SettingRowSwitch icon={Bell} iconColor="bg-green-100 text-green-600" label="Email Notifications" subtitle="Receive email alerts for activities and updates." checked={settings.emailNotifications} onChange={(v) => onChange("emailNotifications", v)} />
        <SettingRowSwitch icon={UserCheck} iconColor="bg-purple-100 text-purple-600" label="Auto Assign Engineers" subtitle="Automatically assign engineers based on skill match." checked={settings.autoAssign} onChange={(v) => onChange("autoAssign", v)} />
        <SettingRowSelect icon={Database} iconColor="bg-amber-100 text-amber-600" label="Data Retention" subtitle="Keep data for analytics and reports." value={settings.dataRetention} options={retentionOptions} onChange={(v) => onChange("dataRetention", v)} />
      </div>
    </div>
  );
}
