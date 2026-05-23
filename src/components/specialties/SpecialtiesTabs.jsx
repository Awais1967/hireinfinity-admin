import { Grid3X3, Cpu } from "lucide-react";

export default function SpecialtiesTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "specialties", label: "Specialties", icon: Grid3X3 },
    { id: "techstack", label: "Tech Stack", icon: Cpu },
  ];

  return (
    <div className="flex gap-1 border-b border-gray-200">
      {tabs.map((tab) => {
        const Icon = tab.icon;
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
            <Icon size={17} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
