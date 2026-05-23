import { useState, useRef, useEffect } from "react";
import { Edit2, MoreVertical, Power, ArrowUp, ArrowDown, Trash2 } from "lucide-react";

export default function RowActions({ status, onEdit, onActivate, onDeactivate, onMoveUp, onMoveDown, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onEdit}
        className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition-colors"
        title="Edit"
      >
        <Edit2 size={15} />
      </button>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          title="More"
        >
          <MoreVertical size={15} />
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            {status === "Active" ? (
              <button
                onClick={() => { onDeactivate(); setOpen(false); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Power size={14} />
                Deactivate
              </button>
            ) : (
              <button
                onClick={() => { onActivate(); setOpen(false); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Power size={14} />
                Activate
              </button>
            )}
            <button
              onClick={() => { onMoveUp(); setOpen(false); }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <ArrowUp size={14} />
              Move Up
            </button>
            <button
              onClick={() => { onMoveDown(); setOpen(false); }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <ArrowDown size={14} />
              Move Down
            </button>
            <hr className="my-1 border-gray-100" />
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this item?")) {
                  onDelete();
                }
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
