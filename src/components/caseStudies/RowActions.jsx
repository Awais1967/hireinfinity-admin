import { useState, useRef, useEffect } from "react";
import { Edit3, MoreVertical, Eye, Globe, FileEdit, Archive, Copy, Trash2 } from "lucide-react";

export default function RowActions({ status, onEdit, onViewDetails, onPublish, onDraft, onArchive, onDuplicate, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex items-center gap-1">
      <button onClick={onEdit} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600" title="Edit"><Edit3 size={15} /></button>
      <div className="relative" ref={ref}>
        <button onClick={() => setOpen((p) => !p)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600" title="More"><MoreVertical size={15} /></button>
        {open && (
          <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            <button onClick={() => { onViewDetails(); setOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><Eye size={14} /> View Details</button>
            {status !== "Published" && <button onClick={() => { onPublish(); setOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><Globe size={14} /> Publish</button>}
            {status !== "Draft" && <button onClick={() => { onDraft(); setOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><FileEdit size={14} /> Move to Draft</button>}
            {status !== "Archived" && <button onClick={() => { onArchive(); setOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><Archive size={14} /> Archive</button>}
            <button onClick={() => { onDuplicate(); setOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"><Copy size={14} /> Duplicate</button>
            <hr className="my-1 border-gray-100" />
            <button onClick={() => { if (window.confirm("Delete this case study?")) { onDelete(); } setOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={14} /> Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
