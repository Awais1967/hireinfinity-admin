import { Building2, Mail, Globe } from "lucide-react";
import { SettingRowInput, SettingRowSelect } from "./SettingRow";
import { timezoneOptions, dateFormatOptions } from "../../data/settingsData";

export default function GeneralSettings({ settings, onChange }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 pt-4 pb-2">
        <h2 className="text-base font-semibold text-slate-900">General Settings</h2>
      </div>
      <div className="px-5 pb-4">
        <SettingRowInput icon={Building2} iconColor="bg-blue-100 text-blue-600" label="Company Name" subtitle="Your company / organization name." value={settings.companyName} onChange={(v) => onChange("companyName", v)} />
        <SettingRowInput icon={Mail} iconColor="bg-purple-100 text-purple-600" label="Admin Email" subtitle="Primary admin contact email." value={settings.adminEmail} onChange={(v) => onChange("adminEmail", v)} />
        <SettingRowInput icon={Globe} iconColor="bg-emerald-100 text-emerald-600" label="Website URL" subtitle="Your website or platform URL." value={settings.websiteUrl} onChange={(v) => onChange("websiteUrl", v)} />
        <SettingRowSelect icon={Globe} iconColor="bg-amber-100 text-amber-600" label="Timezone" subtitle="Set your preferred timezone." value={settings.timezone} options={timezoneOptions} onChange={(v) => onChange("timezone", v)} />
        <SettingRowSelect icon={Globe} iconColor="bg-cyan-100 text-cyan-600" label="Date & Time Format" subtitle="Choose your date and time format." value={settings.dateFormat} options={dateFormatOptions} onChange={(v) => onChange("dateFormat", v)} />
      </div>
    </div>
  );
}
