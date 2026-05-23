import { Edit3 } from "lucide-react";

export default function PricingHeader({ onEdit }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pricing & Plans</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage pricing tables, hourly rates and team pods.
        </p>
      </div>
      <button
        onClick={onEdit}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
      >
        <Edit3 size={15} />
        Edit Pricing
      </button>
    </div>
  );
}
