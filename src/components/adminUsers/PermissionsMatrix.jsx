import { useState, useMemo } from "react";
import { modulePermissions, actionTypes, getDefaultPermissions } from "../../data/adminUsersData";

export default function PermissionsMatrix({ initialPermissions, onSave }) {
  const [editing, setEditing] = useState(false);
  const [activeRole, setActiveRole] = useState("Admin");
  const [perms, setPerms] = useState(() => ({ ...initialPermissions }));

  const roles = useMemo(() => Object.keys(perms), [perms]);

  const toggle = (role, modIdx, action) => {
    setPerms((prev) => {
      const copy = { ...prev, [role]: prev[role].map((m, i) => i === modIdx ? { ...m, actions: { ...m.actions, [action]: !m.actions[action] } } : m) };
      return copy;
    });
  };

  const resetDefaults = (role) => {
    setPerms((prev) => ({ ...prev, [role]: getDefaultPermissions(role) }));
  };

  const save = () => {
    onSave(perms);
    setEditing(false);
  };

  const currentPerms = perms[activeRole] || [];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Permissions Matrix</h3>
        <div className="flex items-center gap-2">
          <select value={activeRole} onChange={(e) => setActiveRole(e.target.value)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-blue-400">
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {editing ? (
            <>
              <button onClick={() => resetDefaults(activeRole)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">Reset</button>
              <button onClick={save} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">Save Permissions</button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50">Edit</button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 bg-slate-50">
              <th className="px-3 py-2 font-semibold text-slate-500">Module</th>
              {actionTypes.map((a) => <th key={a} className="px-3 py-2 font-semibold text-slate-500 text-center">{a}</th>)}
            </tr>
          </thead>
          <tbody>
            {currentPerms.map((mod, idx) => (
              <tr key={mod.module} className="border-t border-gray-100">
                <td className="px-3 py-2 text-slate-700 font-medium text-xs">{mod.module}</td>
                {actionTypes.map((a) => {
                  const checked = !!mod.actions[a];
                  return (
                    <td key={a} className="px-3 py-2 text-center">
                      {editing ? (
                        <input type="checkbox" checked={checked} onChange={() => toggle(activeRole, idx, a)} className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                      ) : (
                        <span className={`inline-block h-4 w-4 rounded border ${checked ? "border-blue-500 bg-blue-500" : "border-gray-200 bg-white"}`}>
                          {checked && <svg viewBox="0 0 16 16" fill="white" className="h-full w-full"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" /></svg>}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
