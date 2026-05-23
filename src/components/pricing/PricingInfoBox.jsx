import { ShieldCheck } from "lucide-react";

export default function PricingInfoBox({ message }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        <ShieldCheck size={18} />
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{message}</p>
    </div>
  );
}
