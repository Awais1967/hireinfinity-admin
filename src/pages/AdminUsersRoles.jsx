import { useState, useMemo, useCallback } from "react";
import AdminUsersHeader from "../components/adminUsers/AdminUsersHeader";
import AdminUsersTabs from "../components/adminUsers/AdminUsersTabs";
import AdminUsersStats from "../components/adminUsers/AdminUsersStats";
import AdminUsersFilters from "../components/adminUsers/AdminUsersFilters";
import AdminUsersTable from "../components/adminUsers/AdminUsersTable";
import AdminUserModal from "../components/adminUsers/AdminUserModal";
import RoleModal from "../components/adminUsers/RoleModal";
import ChangeRoleModal from "../components/adminUsers/ChangeRoleModal";
import ActivityLogModal from "../components/adminUsers/ActivityLogModal";
import RolesOverview from "../components/adminUsers/RolesOverview";
import AdminQuickActions from "../components/adminUsers/AdminQuickActions";
import PermissionsSummary from "../components/adminUsers/PermissionsSummary";
import RolesPermissions from "../components/adminUsers/RolesPermissions";
import PermissionsMatrix from "../components/adminUsers/PermissionsMatrix";
import Pagination from "../components/adminUsers/Pagination";
import { initialUsers, initialRoles, initialPermissions } from "../data/adminUsersData";

const PAGE_SIZE = 8;
let nextUserId = 100;
let nextRoleId = 100;

export default function AdminUsersRoles() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [permissions, setPermissions] = useState(initialPermissions);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // modals
  const [userModal, setUserModal] = useState({ show: false, mode: null, record: null });
  const [roleModal, setRoleModal] = useState({ show: false, mode: null, record: null });
  const [changeRoleModal, setChangeRoleModal] = useState({ show: false, record: null });
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    inactive: users.filter((u) => u.status === "Inactive").length,
    roles: roles.length,
  }), [users, roles]);

  const roleCounts = useMemo(() => {
    const counts = {};
    roles.forEach((r) => { counts[r.name] = 0; });
    users.forEach((u) => { if (counts[u.role] !== undefined) counts[u.role]++; });
    return counts;
  }, [users, roles]);

  const filtered = useMemo(() => {
    let data = users;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (roleFilter) data = data.filter((u) => u.role === roleFilter);
    if (statusFilter) data = data.filter((u) => u.status === statusFilter);
    return data;
  }, [users, searchQuery, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const resetPage = () => setCurrentPage(1);

  // user CRUD
  const handleSaveUser = useCallback((form) => {
    if (userModal.mode === "edit") {
      setUsers((prev) => prev.map((u) => u.id === form.id ? { ...u, name: form.name, email: form.email, avatar: form.avatar, role: form.role, status: form.status } : u));
      showToast("User updated successfully");
    } else {
      const newUser = { id: nextUserId++, name: form.name, email: form.email, avatar: form.avatar, role: form.role, status: form.status, lastLogin: "Never", isCurrentUser: false };
      setUsers((prev) => [...prev, newUser]);
      showToast("Invitation sent to " + form.name);
    }
  }, [userModal.mode, showToast]);

  const handleEditUser = (user) => setUserModal({ show: true, mode: "edit", record: user });

  const handleToggleActive = (id) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));
  };

  const handleChangeRole = (id, newRole) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role: newRole } : u));
    showToast("Role updated");
  };

  const handleResetPassword = (id) => {
    showToast("Password reset email sent");
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("User deleted");
  };

  // role CRUD
  const handleSaveRole = useCallback((form) => {
    if (roleModal.mode === "edit") {
      setRoles((prev) => prev.map((r) => r.id === form.id ? form : r));
      showToast("Role updated");
    } else {
      const newRole = { ...form, id: nextRoleId++ };
      setRoles((prev) => [...prev, newRole]);
      setPermissions((prev) => ({ ...prev, [newRole.name]: [] }));
      showToast("Role created");
    }
  }, [roleModal.mode, showToast]);

  const handleDeleteRole = (id) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    showToast("Role deleted");
  };

  const handleSavePermissions = (newPerms) => {
    setPermissions(newPerms);
    setRoleModal((prev) => ({ ...prev, show: false }));
    showToast("Permissions saved");
  };

  // quick actions
  const handleQuickAction = (key) => {
    if (key === "invite") setUserModal({ show: true, mode: "add", record: null });
    if (key === "createRole") setRoleModal({ show: true, mode: "add", record: null });
    if (key === "managePerms") setActiveTab("roles");
    if (key === "activityLog") setShowActivityLog(true);
  };

  // export
  const handleExport = () => {
    const headers = ["Name", "Email", "Role", "Status", "Last Login"];
    const rows = filtered.map((u) => [u.name, u.email, u.role, u.status, u.lastLogin].map((c) => `"${c}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "admin_users.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <AdminUsersHeader onInvite={() => setUserModal({ show: true, mode: "add", record: null })} />
      <AdminUsersTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <AdminUsersStats stats={stats} />

      {activeTab === "users" && (
        <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <AdminUsersFilters
              searchQuery={searchQuery} onSearchChange={(v) => { setSearchQuery(v); resetPage(); }}
              roleFilter={roleFilter} onRoleChange={(v) => { setRoleFilter(v); resetPage(); }}
              statusFilter={statusFilter} onStatusChange={(v) => { setStatusFilter(v); resetPage(); }}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">{filtered.length} user{filtered.length !== 1 && "s"}</p>
              <button onClick={handleExport} className="text-xs font-medium text-blue-600 hover:text-blue-700">Export CSV</button>
            </div>
            <AdminUsersTable
              records={paginated}
              onEdit={handleEditUser}
              onViewProfile={(u) => handleEditUser(u)}
              onToggleActive={handleToggleActive}
              onChangeRole={(u) => setChangeRoleModal({ show: true, record: u })}
              onResetPassword={handleResetPassword}
              onDelete={(id) => {
                const u = users.find((x) => x.id === id);
                if (u?.isCurrentUser) { showToast("Cannot delete current user"); return; }
                handleDeleteUser(id);
              }}
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setCurrentPage} />
          </div>
          <div className="space-y-4">
            <RolesOverview roleCounts={roleCounts} onViewAllRoles={() => setActiveTab("roles")} />
            <AdminQuickActions onAction={handleQuickAction} />
            <PermissionsSummary onViewPermissions={() => setActiveTab("roles")} />
          </div>
        </div>
      )}

      {activeTab === "roles" && (
        <div className="space-y-5">
          <RolesPermissions
            roles={roles}
            onEdit={(r) => setRoleModal({ show: true, mode: "edit", record: r })}
            onDelete={handleDeleteRole}
            onCreate={() => setRoleModal({ show: true, mode: "add", record: null })}
          />
          <PermissionsMatrix initialPermissions={permissions} onSave={handleSavePermissions} />
        </div>
      )}

      {userModal.show && (
        <AdminUserModal mode={userModal.mode} record={userModal.record} onClose={() => setUserModal({ show: false, mode: null, record: null })} onSave={handleSaveUser} />
      )}
      {roleModal.show && (
        <RoleModal mode={roleModal.mode} record={roleModal.record} existingRoles={roles} onClose={() => setRoleModal({ show: false, mode: null, record: null })} onSave={handleSaveRole} />
      )}
      {changeRoleModal.show && (
        <ChangeRoleModal record={changeRoleModal.record} onClose={() => setChangeRoleModal({ show: false, record: null })} onSave={handleChangeRole} />
      )}
      {showActivityLog && <ActivityLogModal onClose={() => setShowActivityLog(false)} />}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] animate-fade-in rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
