import { Star, Grid3X3, Shield, Heart, Brain, Diamond, GraduationCap, Home, ShoppingCart } from "lucide-react";
import StatusBadge from "./StatusBadge";
import RowActions from "./RowActions";

const logoMap = {
  blocks: Grid3X3, shield: Shield, medical: Heart, ai: Brain,
  diamond: Diamond, education: GraduationCap, home: Home, cart: ShoppingCart,
};

const logoColors = {
  blocks: "bg-blue-100 text-blue-600", shield: "bg-cyan-100 text-cyan-600", medical: "bg-red-100 text-red-500",
  ai: "bg-purple-100 text-purple-600", diamond: "bg-amber-100 text-amber-600", education: "bg-green-100 text-green-600",
  home: "bg-orange-100 text-orange-600", cart: "bg-pink-100 text-pink-600",
};

export default function CaseStudiesTable({ records, selectedId, onRowClick, onToggleFeatured, onEdit, onViewDetails, onPublish, onDraft, onArchive, onDuplicate, onDelete }) {
  if (!records.length) {
    return <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm"><p className="text-sm text-slate-500">No case studies found.</p></div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-slate-50">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Case Study</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Industry</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Services</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Results</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Featured</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Last Updated</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((cs, idx) => {
              const Icon = logoMap[cs.logoType] || Grid3X3;
              const iconColor = logoColors[cs.logoType] || "bg-slate-100 text-slate-500";
              return (
                <tr key={cs.id} onClick={() => onRowClick(cs)} className={`border-b border-gray-50 transition-colors cursor-pointer ${selectedId === cs.id ? "bg-blue-50/50" : "hover:bg-slate-50/50"}`}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconColor}`}><Icon size={18} /></div>
                      <span className="font-semibold text-slate-900">{cs.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{cs.industry}</td>
                  <td className="px-4 py-3 text-slate-500 max-w-[200px] truncate">{cs.services}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{cs.results}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={cs.status} /></td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={(e) => { e.stopPropagation(); onToggleFeatured(cs.id); }} className={`transition-colors ${cs.featured ? "text-blue-600" : "text-slate-300 hover:text-slate-400"}`}>
                      <Star size={17} fill={cs.featured ? "currentColor" : "none"} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{cs.lastUpdated}</td>
                  <td className="px-4 py-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <RowActions status={cs.status} onEdit={() => onEdit(cs)} onViewDetails={() => onViewDetails(cs)} onPublish={() => onPublish(cs.id)} onDraft={() => onDraft(cs.id)} onArchive={() => onArchive(cs.id)} onDuplicate={() => onDuplicate(cs)} onDelete={() => onDelete(cs.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
