import { Shield, Clock, Calendar, Globe, Bell } from "lucide-react";
import { SettingRowSwitch, SettingRowSelect, SettingRowTextarea } from "./SettingRow";
import { timeoutOptions, expiryOptions } from "../../data/settingsData";

export default function SecuritySettings({ settings, onChange }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 pt-4 pb-2">
        <h2 className="text-base font-semibold text-slate-900">Security Settings</h2>
      </div>
      <div className="px-5 pb-4">
        <SettingRowSwitch icon={Shield} iconColor="bg-blue-100 text-blue-600" label="Two-Factor Authentication" subtitle="Require 2FA for all admin logins." checked={settings.twoFactor} onChange={(v) => onChange("twoFactor", v)} />
        <SettingRowSelect icon={Clock} iconColor="bg-purple-100 text-purple-600" label="Session Timeout" subtitle="Auto-logout after inactivity." value={settings.sessionTimeout} options={timeoutOptions} onChange={(v) => onChange("sessionTimeout", v)} />
        <SettingRowSelect icon={Calendar} iconColor="bg-emerald-100 text-emerald-600" label="Password Expiry" subtitle="Force password change period." value={settings.passwordExpiry} options={expiryOptions} onChange={(v) => onChange("passwordExpiry", v)} />
        <SettingRowTextarea icon={Globe} iconColor="bg-amber-100 text-amber-600" label="Allowed IP Addresses" subtitle="IP whitelist for admin access." value={settings.allowedIPs} onChange={(v) => onChange("allowedIPs", v)} />
        <SettingRowSwitch icon={Bell} iconColor="bg-cyan-100 text-cyan-600" label="Login Alerts" subtitle="Email notification on new admin login." checked={settings.loginAlerts} onChange={(v) => onChange("loginAlerts", v)} />
      </div>
    </div>
  );
}
