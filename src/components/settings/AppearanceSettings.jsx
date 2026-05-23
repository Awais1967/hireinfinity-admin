import { Sun, Palette, Sidebar, Eye } from "lucide-react";
import { SettingRowSelect, SettingRowInput, SettingRowSwitch } from "./SettingRow";
import { themeOptions } from "../../data/settingsData";

export default function AppearanceSettings({ settings, onChange }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 pt-4 pb-2">
        <h2 className="text-base font-semibold text-slate-900">Appearance</h2>
      </div>
      <div className="px-5 pb-4">
        <SettingRowSelect icon={Sun} iconColor="bg-amber-100 text-amber-600" label="Theme" subtitle="Choose light, dark, or system theme." value={settings.theme} options={themeOptions} onChange={(v) => onChange("theme", v)} />
        <SettingRowInput icon={Palette} iconColor="bg-purple-100 text-purple-600" label="Primary Color" subtitle="Custom primary accent color." value={settings.primaryColor} onChange={(v) => onChange("primaryColor", v)} />
        <SettingRowSwitch icon={Sidebar} iconColor="bg-blue-100 text-blue-600" label="Sidebar Compact" subtitle="Use a compact sidebar layout." checked={settings.sidebarCompact} onChange={(v) => onChange("sidebarCompact", v)} />
        <SettingRowSwitch icon={Eye} iconColor="bg-emerald-100 text-emerald-600" label="Reduce Animations" subtitle="Minimize UI animations and transitions." checked={settings.reduceAnimations} onChange={(v) => onChange("reduceAnimations", v)} />
      </div>
    </div>
  );
}
