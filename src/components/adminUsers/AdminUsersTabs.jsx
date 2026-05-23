export default function AdminUsersTabs({ activeTab, onTabChange }) {
  const tabs = [
    { key: "users", label: "Users" },
    { key: "roles", label: "Roles & Permissions" },
  ];

  return (
    <div className="flex gap-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button key={tab.key} onClick={() => onTabChange(tab.key)} className={`relative pb-3 text-sm font-semibold transition-colors ${activeTab === tab.key ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}>
          {tab.label}
          {activeTab === tab.key && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />}
        </button>
      ))}
    </div>
  );
}
