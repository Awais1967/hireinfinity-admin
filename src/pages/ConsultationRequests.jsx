import { useState, useMemo } from "react";
import ConsultationHeader from "../components/consultation/ConsultationHeader";
import ConsultationFilters from "../components/consultation/ConsultationFilters";
import ConsultationStats from "../components/consultation/ConsultationStats";
import ConsultationTable from "../components/consultation/ConsultationTable";
import ConsultationModal from "../components/consultation/ConsultationModal";
import Pagination from "../components/consultation/Pagination";
import { generateAllRequests, statusCards } from "../data/consultationData";

const PAGE_SIZE = 10;

export default function ConsultationRequests() {
  const [allRequests, setAllRequests] = useState(() => generateAllRequests());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeCard, setActiveCard] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState({ show: false, mode: null, record: null });

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

    return data;
  }, [allRequests, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const handleStatusCardClick = (value) => {
    setActiveCard(value);
    if (value === "all") {
      setStatusFilter("");
    } else {
      setStatusFilter(value);
    }
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setActiveCard(value || "all");
    setCurrentPage(1);
  };

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

  const handleMarkConverted = (id) => {
    setAllRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Converted" } : r))
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

      <ConsultationFilters
        searchQuery={searchQuery}
        onSearchChange={(v) => {
          setSearchQuery(v);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        onExportCSV={handleExportCSV}
      />

      <ConsultationStats
        cards={statusCards}
        activeCard={activeCard}
        onCardClick={handleStatusCardClick}
      />

      <ConsultationTable
        records={paginated}
        onView={handleView}
        onEdit={handleEdit}
        onMarkConverted={handleMarkConverted}
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
