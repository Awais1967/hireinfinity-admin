import { Calendar, Clock, Users } from "lucide-react";

const iconMap = { Calendar, Clock, Users };

export default function PricingTabs({ activeTab, onTabChange, tabs }) {
  return (
    <div className="flex gap-1 border-b border-gray-200">
      {tabs.map((tab) => {
        const Icon = iconMap[tab.icon];
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {Icon && <Icon size={17} />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
