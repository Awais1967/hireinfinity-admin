import { useState, useMemo } from "react";
import EngineerHeader from "../components/engineers/EngineerHeader";
import EngineerStats from "../components/engineers/EngineerStats";
import EngineerFilters from "../components/engineers/EngineerFilters";
import EngineerTable from "../components/engineers/EngineerTable";
import EngineerModal from "../components/engineers/EngineerModal";
import EngineerPagination from "../components/engineers/EngineerPagination";
import BulkActions from "../components/engineers/BulkActions";
import { generateAllEngineers } from "../data/engineerData";

const PAGE_SIZE = 8;

export default function EngineerRoster() {
  const [engineers, setEngineers] = useState(() => generateAllEngineers());
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("");
  const [visibility, setVisibility] = useState("");
  const [seniority, setSeniority] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [modal, setModal] = useState({ show: false, mode: null, record: null });

  const statsCards = useMemo(() => {
    const total = engineers.length;
    const available = engineers.filter((e) => e.availability === "Available").length;
    const limited = engineers.filter((e) => e.availability === "Limited").length;
    const unavailable = engineers.filter((e) => e.availability === "Unavailable").length;
    const featured = engineers.filter((e) => e.featured).length;
    return [
      { label: "Total Engineers", value: total, subtitle: "All team members", icon: "Users", color: "blue" },
      { label: "Available", value: available, subtitle: "Actively available", icon: "CheckCircle", color: "green" },
      { label: "Limited Availability", value: limited, subtitle: "Limited / Part-time", icon: "AlertCircle", color: "amber" },
      { label: "Unavailable", value: unavailable, subtitle: "Not available", icon: "XCircle", color: "red" },
      { label: "Featured Profiles", value: featured, subtitle: "Highlighted on site", icon: "Star", color: "purple" },
    ];
  }, [engineers]);

  const filtered = useMemo(() => {
    let data = engineers;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          e.specialty.toLowerCase().includes(q)
      );
    }

    if (specialty) data = data.filter((e) => e.specialty === specialty);
    if (availability) data = data.filter((e) => e.availability === availability);
    if (visibility) data = data.filter((e) => e.visibility === visibility);
    if (seniority) data = data.filter((e) => e.seniority === seniority);

    return data;
  }, [engineers, searchQuery, specialty, availability, visibility, seniority]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const resetPage = () => setCurrentPage(1);

  const handleSearchChange = (v) => { setSearchQuery(v); resetPage(); };
  const handleSpecialtyChange = (v) => { setSpecialty(v); resetPage(); };
  const handleAvailabilityChange = (v) => { setAvailability(v); resetPage(); };
  const handleVisibilityChange = (v) => { setVisibility(v); resetPage(); };
  const handleSeniorityChange = (v) => { setSeniority(v); resetPage(); };

  const handleSelectAll = () => {
    if (selectedIds.length === paginated.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginated.map((e) => e.id));
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleFeatured = (id) => {
    setEngineers((prev) =>
      prev.map((e) => (e.id === id ? { ...e, featured: !e.featured } : e))
    );
  };

  const handleDelete = (id) => {
    setEngineers((prev) => prev.filter((e) => e.id !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const handleExport = () => {
    const headers = ["ID", "Name", "Specialty", "Experience", "Monthly Rate", "Hourly Rate", "Availability", "Visibility", "Featured", "Seniority"];
    const rows = filtered.map((e) =>
      [e.id, e.name, e.specialty, e.experience, e.monthlyRate, e.hourlyRate, e.availability, e.visibility, e.featured ? "Yes" : "No", e.seniority]
        .map((c) => `"${c}"`).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "engineer_roster.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSave = (form) => {
    if (modal.mode === "add") {
      setEngineers((prev) => [
        {
          id: form.id,
          name: form.name,
          avatar: form.avatar || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 99) + 1}.jpg`,
          specialty: form.specialty,
          experience: form.experience,
          monthlyRate: form.monthlyRate,
          hourlyRate: form.hourlyRate,
          availability: form.availability,
          visibility: form.visibility,
          featured: form.featured,
          seniority: form.seniority,
        },
        ...prev,
      ]);
    } else {
      setEngineers((prev) =>
        prev.map((e) =>
          e.id === form.id
            ? {
                ...e,
                name: form.name,
                avatar: form.avatar || e.avatar,
                specialty: form.specialty,
                experience: form.experience,
                monthlyRate: form.monthlyRate,
                hourlyRate: form.hourlyRate,
                availability: form.availability,
                visibility: form.visibility,
                featured: form.featured,
                seniority: form.seniority,
              }
            : e
        )
      );
    }
  };

  const handleDeleteSelected = () => {
    setEngineers((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
    setSelectedIds([]);
  };

  const handleBulkMakePublic = () => {
    setEngineers((prev) => prev.map((e) => (selectedIds.includes(e.id) ? { ...e, visibility: "Public" } : e)));
    setSelectedIds([]);
  };

  const handleBulkMakePrivate = () => {
    setEngineers((prev) => prev.map((e) => (selectedIds.includes(e.id) ? { ...e, visibility: "Private" } : e)));
    setSelectedIds([]);
  };

  const handleBulkMarkFeatured = () => {
    setEngineers((prev) => prev.map((e) => (selectedIds.includes(e.id) ? { ...e, featured: true } : e)));
    setSelectedIds([]);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <EngineerHeader
        onAdd={() => setModal({ show: true, mode: "add", record: null })}
        onExport={handleExport}
      />

      <EngineerStats cards={statsCards} />

      <EngineerFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        specialty={specialty}
        onSpecialtyChange={handleSpecialtyChange}
        availability={availability}
        onAvailabilityChange={handleAvailabilityChange}
        visibility={visibility}
        onVisibilityChange={handleVisibilityChange}
        seniority={seniority}
        onSeniorityChange={handleSeniorityChange}
      />

      <BulkActions
        selectedCount={selectedIds.length}
        onDeleteSelected={handleDeleteSelected}
        onMakePublic={handleBulkMakePublic}
        onMakePrivate={handleBulkMakePrivate}
        onMarkFeatured={handleBulkMarkFeatured}
      />

      <EngineerTable
        records={paginated}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        onToggleFeatured={toggleFeatured}
        onEdit={(record) => setModal({ show: true, mode: "edit", record })}
                onViewProfile={() => {}}
        onDelete={handleDelete}
        onMarkFeaturedAction={toggleFeatured}
        onRemoveFeatured={(id) => setEngineers((prev) => prev.map((e) => e.id === id ? { ...e, featured: false } : e))}
        onChangeVisibility={(id) =>
          setEngineers((prev) =>
            prev.map((e) => e.id === id ? { ...e, visibility: e.visibility === "Public" ? "Private" : "Public" } : e)
          )
        }
      />

      <EngineerPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />

      {modal.show && (
        <EngineerModal
          mode={modal.mode}
          record={modal.record}
          onClose={() => setModal({ show: false, mode: null, record: null })}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
