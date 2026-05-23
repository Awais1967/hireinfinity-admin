import { Users, CheckCircle, AlertCircle, XCircle, Star } from "lucide-react";

const iconMap = {
  Users: Users,
  CheckCircle: CheckCircle,
  AlertCircle: AlertCircle,
  XCircle: XCircle,
  Star: Star,
};

const colorMap = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-emerald-100 text-emerald-600",
  amber: "bg-amber-100 text-amber-600",
  red: "bg-red-100 text-red-600",
  purple: "bg-purple-100 text-purple-600",
};

export default function EngineerStats({ cards }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = iconMap[card.icon];
        const colors = colorMap[card.color] || colorMap.blue;

        return (
          <div
            key={card.label}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${colors}`}>
              {Icon && <Icon size={22} />}
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="text-xs font-medium text-slate-500">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
