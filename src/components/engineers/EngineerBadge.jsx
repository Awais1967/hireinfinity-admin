import { specialtyColors, availabilityColors, visibilityColors } from "../../data/engineerData";

const colorMap = {
  specialty: specialtyColors,
  availability: availabilityColors,
  visibility: visibilityColors,
};

export default function EngineerBadge({ type, value }) {
  const colors = colorMap[type];
  const colorClass = (colors && colors[value]) || "bg-slate-100 text-slate-700";

  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}>
      {value}
    </span>
  );
}
