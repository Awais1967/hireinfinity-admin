import { settingsTabs } from "../../data/settingsData";

export default function SettingsTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto border-b border-gray-200">
      {settingsTabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              isActive ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
