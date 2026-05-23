import { Wrench, Bug, Gauge, Webhook, AlertTriangle } from "lucide-react";
import { SettingRowSwitch, SettingRowInput } from "./SettingRow";

export default function AdvancedSettings({ settings, onChange, onResetSystem }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="px-5 pt-4 pb-2">
          <h2 className="text-base font-semibold text-slate-900">Advanced Settings</h2>
        </div>
        <div className="px-5 pb-4">
          <SettingRowSwitch icon={Wrench} iconColor="bg-amber-100 text-amber-600" label="Maintenance Mode" subtitle="Put the platform in maintenance mode." checked={settings.maintenanceMode} onChange={(v) => onChange("maintenanceMode", v)} />
          <SettingRowSwitch icon={Bug} iconColor="bg-red-100 text-red-600" label="Debug Logs" subtitle="Enable detailed debug logging." checked={settings.debugLogs} onChange={(v) => onChange("debugLogs", v)} />
          <SettingRowInput icon={Gauge} iconColor="bg-blue-100 text-blue-600" label="API Rate Limit" subtitle="Max API requests per minute." value={settings.apiRateLimit} onChange={(v) => onChange("apiRateLimit", v)} />
          <SettingRowInput icon={Webhook} iconColor="bg-purple-100 text-purple-600" label="Webhook URL" subtitle="Endpoint for webhook events." value={settings.webhookUrl} onChange={(v) => onChange("webhookUrl", v)} />
        </div>
      </div>

      <div className="rounded-xl border border-red-200 bg-white shadow-sm">
        <div className="px-5 pt-4 pb-2">
          <h2 className="flex items-center gap-2 text-base font-semibold text-red-600"><AlertTriangle size={18} /> Danger Zone</h2>
        </div>
        <div className="px-5 pb-4">
          <p className="text-xs text-slate-500 mb-3">Resetting the system will restore all settings to default. This action cannot be undone.</p>
          <button onClick={onResetSystem} className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
            Reset System to Default
          </button>
        </div>
      </div>
    </div>
  );
}
