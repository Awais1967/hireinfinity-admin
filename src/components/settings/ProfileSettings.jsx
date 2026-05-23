import { User, Shield, Mail, Phone, Image } from "lucide-react";
import { SettingRowInput } from "./SettingRow";

export default function ProfileSettings({ settings, onChange }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 pt-4 pb-2">
        <h2 className="text-base font-semibold text-slate-900">Profile Settings</h2>
      </div>
      <div className="px-5 pb-4">
        <SettingRowInput icon={User} iconColor="bg-blue-100 text-blue-600" label="Admin Name" subtitle="Your full display name." value={settings.adminName} onChange={(v) => onChange("adminName", v)} />
        <SettingRowInput icon={Shield} iconColor="bg-purple-100 text-purple-600" label="Admin Role" subtitle="Your administrative role." value={settings.adminRole} onChange={(v) => onChange("adminRole", v)} />
        <SettingRowInput icon={Mail} iconColor="bg-emerald-100 text-emerald-600" label="Profile Email" subtitle="Your email address for profile." value={settings.profileEmail} onChange={(v) => onChange("profileEmail", v)} />
        <SettingRowInput icon={Phone} iconColor="bg-amber-100 text-amber-600" label="Phone Number" subtitle="Contact phone number." value={settings.phoneNumber} onChange={(v) => onChange("phoneNumber", v)} />
        <SettingRowInput icon={Image} iconColor="bg-cyan-100 text-cyan-600" label="Avatar URL" subtitle="URL to your profile avatar image." value={settings.avatarUrl} onChange={(v) => onChange("avatarUrl", v)} />
      </div>
    </div>
  );
}
