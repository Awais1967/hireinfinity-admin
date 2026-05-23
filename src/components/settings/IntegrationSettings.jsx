import { CreditCard } from "lucide-react";

const integrationIcons = {
  Stripe: "bg-blue-100 text-blue-600",
  "Google Analytics": "bg-orange-100 text-orange-600",
  Slack: "bg-purple-100 text-purple-600",
  Zapier: "bg-amber-100 text-amber-600",
};

export default function IntegrationSettings({ integrations, onToggle }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="px-5 pt-4 pb-2">
        <h2 className="text-base font-semibold text-slate-900">Integrations</h2>
      </div>
      <div className="px-5 pb-4 space-y-2">
        {integrations.map((int) => (
          <div key={int.name} className="flex items-center justify-between rounded-lg border border-gray-100 bg-slate-50/50 p-3.5">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${integrationIcons[int.name] || "bg-slate-100 text-slate-500"}`}>
                <CreditCard size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{int.name}</p>
                <span className={`text-xs font-medium ${int.status === "Connected" ? "text-emerald-600" : "text-slate-400"}`}>
                  {int.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => onToggle(int.name)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                int.status === "Connected"
                  ? "border border-red-200 text-red-600 hover:bg-red-50"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {int.status === "Connected" ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
