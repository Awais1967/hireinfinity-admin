import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Power, PowerOff, UserCog, KeyRound, Trash2 } from "lucide-react";

export default function RowActions({ status, isCurrentUser, onViewProfile, onToggleActive, onChangeRole, onResetPassword, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const items = [
    { icon: Eye, label: "View Profile", onClick: onViewProfile },
    { icon: status === "Active" ? PowerOff : Power, label: status === "Active" ? "Deactivate" : "Activate", onClick: onToggleActive },
    { icon: UserCog, label: "Change Role", onClick: onChangeRole },
    { icon: KeyRound, label: "Reset Password", onClick: onResetPassword },
  ];

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((p) => !p)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
        <MoreVertical size={16} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} onClick={() => { setOpen(false); item.onClick(); }} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                <Icon size={15} className="text-slate-400" /> {item.label}
              </button>
            );
          })}
          <hr className="my-1 border-gray-100" />
          {isCurrentUser ? (
            <button disabled className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-300 cursor-not-allowed">
              <Trash2 size={15} /> Delete User
            </button>
          ) : (
            <button onClick={() => { setOpen(false); onDelete(); }} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 size={15} /> Delete User
            </button>
          )}
        </div>
      )}
    </div>
  );
}
