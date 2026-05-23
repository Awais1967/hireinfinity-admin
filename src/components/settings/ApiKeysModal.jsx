import { useState } from "react";
import { X, Copy, RefreshCw } from "lucide-react";

export default function ApiKeysModal({ keys, onClose, onRegenerate }) {
  const [copied, setCopied] = useState(null);

  const handleCopy = (label, value) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const entries = [
    { label: "Public API Key", value: keys.publicKey },
    { label: "Secret API Key", value: keys.secretKey },
    { label: "Webhook Secret", value: keys.webhookSecret },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Manage API Keys</h2>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {entries.map((e) => (
            <div key={e.label}>
              <p className="text-xs font-medium text-slate-500 mb-1">{e.label}</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-lg border border-gray-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-700 truncate">{e.value}</code>
                <button onClick={() => handleCopy(e.label, e.value)} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-slate-500 hover:bg-slate-50" title="Copy">
                  {copied === e.label ? <span className="text-xs text-emerald-600">✓</span> : <Copy size={15} />}
                </button>
                <button onClick={() => onRegenerate(e.label)} className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 text-slate-500 hover:bg-slate-50" title="Regenerate">
                  <RefreshCw size={15} />
                </button>
              </div>
            </div>
          ))}
          <button onClick={onClose} className="w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Close</button>
        </div>
      </div>
    </div>
  );
}
