const dotColors = {
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
  green: "bg-emerald-500",
  red: "bg-red-500",
};

const accentColors = {
  blue: "bg-blue-50 border-blue-200",
  amber: "bg-amber-50 border-amber-200",
  purple: "bg-purple-50 border-purple-200",
  cyan: "bg-cyan-50 border-cyan-200",
  green: "bg-emerald-50 border-emerald-200",
  red: "bg-red-50 border-red-200",
};

export default function ConsultationStats({ cards, activeCard, onCardClick }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {cards.map((card) => {
        const isActive = activeCard === card.value;
        const chipBorder = isActive
          ? accentColors[card.color] || "border-blue-200"
          : "border-transparent";
        const chipBg = isActive ? accentColors[card.color] || "bg-blue-50" : "bg-white";

        return (
          <button
            key={card.value}
            onClick={() => onCardClick(card.value)}
            className={`flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-2.5 shadow-sm transition-all hover:shadow-md ${chipBg} ${chipBorder} ${
              isActive ? "shadow-sm" : ""
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${dotColors[card.color] || "bg-blue-500"}`} />
            <div className="text-left">
              <p className="text-xs font-medium text-slate-500">{card.label}</p>
              <p className="text-lg font-bold text-slate-900">{card.count}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
