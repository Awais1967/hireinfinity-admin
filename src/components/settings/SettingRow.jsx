import { ChevronRight } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

export default function SettingRow({ icon: Icon, iconColor, label, subtitle, children }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-b-0">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconColor || "bg-slate-100 text-slate-500"}`}>
        {Icon && <Icon size={18} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="shrink-0">{children}</div>
      <ChevronRight size={15} className="text-slate-300 shrink-0" />
    </div>
  );
}

export function SettingRowSelect({ icon, iconColor, label, subtitle, value, options, onChange }) {
  return (
    <SettingRow icon={icon} iconColor={iconColor} label={label} subtitle={subtitle}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-400 min-w-[200px]"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </SettingRow>
  );
}

export function SettingRowInput({ icon, iconColor, label, subtitle, value, onChange, placeholder }) {
  return (
    <SettingRow icon={icon} iconColor={iconColor} label={label} subtitle={subtitle}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-400 min-w-[200px]"
      />
    </SettingRow>
  );
}

export function SettingRowSwitch({ icon, iconColor, label, subtitle, checked, onChange }) {
  return (
    <SettingRow icon={icon} iconColor={iconColor} label={label} subtitle={subtitle}>
      <ToggleSwitch checked={checked} onChange={onChange} />
    </SettingRow>
  );
}

export function SettingRowTextarea({ icon, iconColor, label, subtitle, value, onChange }) {
  return (
    <SettingRow icon={icon} iconColor={iconColor} label={label} subtitle={subtitle}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-400 min-w-[200px] min-h-[60px] resize-y"
      />
    </SettingRow>
  );
}
