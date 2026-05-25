import { Bell, ChevronDown, Calendar, Menu } from "lucide-react";

export default function Topbar({ onMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          onClick={onMenuToggle}
        >
          <Menu size={20} />
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Calendar size={15} className="text-slate-500" />
          <span>May 25 - June 25, 2026</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100">
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-tight">Admin User</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
          <ChevronDown size={15} className="text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
