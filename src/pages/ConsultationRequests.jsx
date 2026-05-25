import { useState, useMemo } from "react";
import ConsultationHeader from "../components/consultation/ConsultationHeader";
import ConsultationFilters from "../components/consultation/ConsultationFilters";
import ConsultationStats from "../components/consultation/ConsultationStats";
import ConsultationTable from "../components/consultation/ConsultationTable";
import ConsultationModal from "../components/consultation/ConsultationModal";
import Pagination from "../components/consultation/Pagination";
import { generateAllRequests } from "../data/consultationData";

const PAGE_SIZE = 10;

export default function ConsultationRequests() {
  const [allRequests, setAllRequests] = useState(() => generateAllRequests());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [timelineFilter, setTimelineFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [activeCard, setActiveCard] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({ show: false, mode: null, record: null });

  const statsCards = useMemo(() => {
    const total = allRequests.length;
    const newCount = allRequests.filter((r) => r.status === "New").length;
    const contacted = allRequests.filter((r) => r.status === "Contacted").length;
    const scheduled = allRequests.filter((r) => r.status === "Scheduled").length;
    const inProgress = allRequests.filter((r) => r.status === "In Progress").length;
    const rejected = allRequests.filter((r) => r.status === "Rejected").length;
    return [
      { value: total, subtitle: "Total consultation requests", color: "blue", icon: "FileText", label: "All Requests", filter: "all" },
      { value: newCount, subtitle: "New incoming leads", color: "blue", icon: "Mail", label: "New", filter: "New" },
      { value: contacted, subtitle: "Follow-up started", color: "amber", icon: "Phone", label: "Contacted", filter: "Contacted" },
      { value: scheduled, subtitle: "Demo calls booked", color: "purple", icon: "Calendar", label: "Scheduled", filter: "Scheduled" },
      { value: inProgress, subtitle: "Currently being handled", color: "blue", icon: "Clock", label: "In Progress", filter: "In Progress" },
      { value: rejected, subtitle: "Not qualified / closed", color: "red", icon: "XCircle", label: "Rejected", filter: "Rejected" },
    ];
  }, [allRequests]);

  const filtered = useMemo(() => {
    let data = allRequests;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.company.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q)
      );
    }

    if (statusFilter) {
      data = data.filter((r) => r.status === statusFilter);
    }

    if (specialtyFilter) {
      data = data.filter((r) => r.specialty === specialtyFilter);
    }

    if (timelineFilter) {
      data = data.filter((r) => r.timeline === timelineFilter);
    }

    if (assignedFilter) {
      data = data.filter((r) => r.assignedTo === assignedFilter);
    }

    return data;
  }, [allRequests, searchQuery, statusFilter, specialtyFilter, timelineFilter, assignedFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const resetPage = () => setCurrentPage(1);

  const handleStatusCardClick = (filterValue) => {
    setActiveCard(filterValue);
    if (filterValue === "all") {
      setStatusFilter("");
    } else {
      setStatusFilter(filterValue);
    }
    resetPage();
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setActiveCard(value || "all");
    resetPage();
  };

  const handleSearchChange = (v) => { setSearchQuery(v); resetPage(); };
  const handleSpecialtyChange = (v) => { setSpecialtyFilter(v); resetPage(); };
  const handleTimelineChange = (v) => { setTimelineFilter(v); resetPage(); };
  const handleAssignedChange = (v) => { setAssignedFilter(v); resetPage(); };

  const handleExportCSV = () => {
    const headers = ["Name", "Company", "Email", "Specialty", "Budget", "Timeline", "Status", "Scheduled On", "Assigned To"];
    const rows = filtered.map((r) =>
      [r.name, r.company, r.email, r.specialty, r.budget, r.timeline, r.status, r.scheduledOn, r.assignedTo]
        .map((c) => `"${c}"`)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "consultation_requests.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleView = (record) => setModal({ show: true, mode: "view", record });
  const handleEdit = (record) => setModal({ show: true, mode: "edit", record });

  const handleSave = (id, form) => {
    setAllRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: form.status, assignedTo: form.assignedTo, scheduledOn: form.scheduledOn } : r
      )
    );
  };

  const handleMarkRejected = (id) => {
    setAllRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
    );
  };

  const handleDelete = (id) => {
    setAllRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <ConsultationHeader />

      <ConsultationStats
        cards={statsCards}
        activeCard={activeCard}
        onCardClick={handleStatusCardClick}
      />

      <ConsultationFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        specialtyFilter={specialtyFilter}
        onSpecialtyChange={handleSpecialtyChange}
        timelineFilter={timelineFilter}
        onTimelineChange={handleTimelineChange}
        assignedFilter={assignedFilter}
        onAssignedChange={handleAssignedChange}
        onExportCSV={handleExportCSV}
      />

      <ConsultationTable
        records={paginated}
        onView={handleView}
        onEdit={handleEdit}
        onMarkRejected={handleMarkRejected}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filtered.length}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
      />

      {modal.show && (
        <ConsultationModal
          mode={modal.mode}
          record={modal.record}
          onClose={() => setModal({ show: false, mode: null, record: null })}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
