import { FileText, Mail, Phone, Calendar, Clock, XCircle } from "lucide-react";

const iconMap = {
  FileText, Mail, Phone, Calendar, Clock, XCircle,
};

const colorMap = {
  blue: "bg-blue-100 text-blue-600",
  amber: "bg-amber-100 text-amber-600",
  purple: "bg-purple-100 text-purple-600",
  green: "bg-emerald-100 text-emerald-600",
  red: "bg-red-100 text-red-600",
};

const activeBorderMap = {
  blue: "border-blue-300 bg-blue-50",
  amber: "border-amber-300 bg-amber-50",
  purple: "border-purple-300 bg-purple-50",
  green: "border-emerald-300 bg-emerald-50",
  red: "border-red-300 bg-red-50",
};

export default function ConsultationStats({ cards, activeCard, onCardClick }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = iconMap[card.icon] || FileText;
        const isActive = activeCard === card.filter;
        return (
          <button
            key={card.filter}
            onClick={() => onCardClick(card.filter)}
            className={`flex items-center gap-4 rounded-xl border p-4 shadow-sm transition-all hover:shadow-md text-left ${
              isActive
                ? activeBorderMap[card.color] || "border-blue-300 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${colorMap[card.color] || colorMap.blue}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="text-xs font-medium text-slate-500">{card.subtitle}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
