import { Building2, Mail, CreditCard, Calendar, Download } from "lucide-react";
import { SettingRowInput } from "./SettingRow";

export default function BillingSettings({ settings, onChange }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 pt-4 pb-2">
        <h2 className="text-base font-semibold text-slate-900">Billing & Plan</h2>
      </div>
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 p-3.5 mb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Building2 size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Current Plan</p>
              <p className="text-xs text-slate-500">{settings.currentPlan}</p>
            </div>
          </div>
          <span className="rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700">{settings.currentPlan}</span>
        </div>
        <SettingRowInput icon={Mail} iconColor="bg-purple-100 text-purple-600" label="Billing Email" subtitle="Email for invoices and billing." value={settings.billingEmail} onChange={(v) => onChange("billingEmail", v)} />
        <SettingRowInput icon={CreditCard} iconColor="bg-amber-100 text-amber-600" label="Payment Method" subtitle="Default payment method on file." value={settings.paymentMethod} onChange={(v) => onChange("paymentMethod", v)} />
        <SettingRowInput icon={Calendar} iconColor="bg-cyan-100 text-cyan-600" label="Next Invoice Date" subtitle="Upcoming invoice date." value={settings.nextInvoice} onChange={(v) => onChange("nextInvoice", v)} />
        <div className="pt-2">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download size={14} /> Download Latest Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
