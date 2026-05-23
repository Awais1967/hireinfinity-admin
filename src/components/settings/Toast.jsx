import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

export default function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const t = setTimeout(onClose, 3000);
      return () => clearTimeout(t);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex items-center gap-3 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-lg animate-[slideUp_0.3s_ease]">
      <CheckCircle size={18} />
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 text-white/70 hover:text-white">
        <X size={16} />
      </button>
    </div>
  );
}
