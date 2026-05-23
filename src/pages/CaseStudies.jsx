import { useState, useMemo } from "react";
import CaseStudiesHeader from "../components/caseStudies/CaseStudiesHeader";
import CaseStudiesStats from "../components/caseStudies/CaseStudiesStats";
import CaseStudiesFilters from "../components/caseStudies/CaseStudiesFilters";
import CaseStudiesTable from "../components/caseStudies/CaseStudiesTable";
import CaseStudyDetails from "../components/caseStudies/CaseStudyDetails";
import CaseStudyQuickActions from "../components/caseStudies/CaseStudyQuickActions";
import CaseStudyModal from "../components/caseStudies/CaseStudyModal";
import CaseStudyPreviewModal from "../components/caseStudies/CaseStudyPreviewModal";
import ReorderCaseStudiesModal from "../components/caseStudies/ReorderCaseStudiesModal";
import Pagination from "../components/caseStudies/Pagination";
import { initialCaseStudies } from "../data/caseStudiesData";

const PAGE_SIZE = 8;
let nextId = 100;

export default function CaseStudies() {
  const [records, setRecords] = useState(initialCaseStudies);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState({ show: false, mode: null, record: null });
  const [showPreview, setShowPreview] = useState(false);
  const [showReorder, setShowReorder] = useState(false);

  const stats = useMemo(() => ({
    total: records.length,
    published: records.filter((r) => r.status === "Published").length,
    draft: records.filter((r) => r.status === "Draft").length,
    archived: records.filter((r) => r.status === "Archived").length,
  }), [records]);

  const filtered = useMemo(() => {
    let data = records;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter((r) => r.title.toLowerCase().includes(q) || r.industry.toLowerCase().includes(q) || r.services.toLowerCase().includes(q) || r.results.toLowerCase().includes(q));
    }
    if (statusFilter) data = data.filter((r) => r.status === statusFilter);
    return data;
  }, [records, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const resetPage = () => setCurrentPage(1);

  const handleSave = (form) => {
    if (modal.mode === "edit") {
      setRecords((prev) => prev.map((r) => r.id === form.id ? { ...form } : r));
      setSelected((prev) => prev?.id === form.id ? form : prev);
    } else {
      const newRec = { ...form, id: nextId++ };
      setRecords((prev) => [...prev, newRec]);
    }
  };

  const toggleFeatured = (id) => setRecords((prev) => prev.map((r) => r.id === id ? { ...r, featured: !r.featured } : r));
  const handlePublish = (id) => setRecords((prev) => prev.map((r) => r.id === id ? { ...r, status: "Published" } : r));
  const handleDraft = (id) => setRecords((prev) => prev.map((r) => r.id === id ? { ...r, status: "Draft" } : r));
  const handleArchive = (id) => setRecords((prev) => prev.map((r) => r.id === id ? { ...r, status: "Archived" } : r));

  const handleDuplicate = (cs) => {
    const dup = { ...cs, id: nextId++, title: `${cs.title} (Copy)`, featured: false };
    setRecords((prev) => [...prev, dup]);
  };

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setSelected((prev) => prev?.id === id ? null : prev);
  };

  const handleExport = () => {
    const headers = ["Title", "Industry", "Services", "Results", "Status", "Featured", "Last Updated", "Technologies", "Impact"];
    const rows = filtered.map((r) => [r.title, r.industry, r.services, r.results, r.status, r.featured ? "Yes" : "No", r.lastUpdated, r.technologies, r.impact].map((c) => `"${c}"`).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "case_studies.csv"; a.click(); URL.revokeObjectURL(url);
  };

  const handleReorderSave = (items) => {
    setRecords(items);
  };

  const handleQuickAction = (action) => {
    if (action === "preview") setShowPreview(true);
    if (action === "export") handleExport();
    if (action === "reorder") setShowReorder(true);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <CaseStudiesHeader onAdd={() => setModal({ show: true, mode: "add", record: null })} />
      <CaseStudiesStats stats={stats} />
      <CaseStudiesFilters searchQuery={searchQuery} onSearchChange={(v) => { setSearchQuery(v); resetPage(); }} statusFilter={statusFilter} onStatusChange={(v) => { setStatusFilter(v); resetPage(); }} />

      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <CaseStudiesTable records={paginated} selectedId={selected?.id} onRowClick={setSelected} onToggleFeatured={toggleFeatured} onEdit={(r) => setModal({ show: true, mode: "edit", record: r })} onViewDetails={setSelected} onPublish={handlePublish} onDraft={handleDraft} onArchive={handleArchive} onDuplicate={handleDuplicate} onDelete={handleDelete} />
          <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} itemLabel="case studies" onPageChange={setCurrentPage} />
        </div>
        <div className="space-y-4">
          <CaseStudyDetails selected={selected} onEdit={(r) => setModal({ show: true, mode: "edit", record: r })} />
          <CaseStudyQuickActions onAction={handleQuickAction} />
        </div>
      </div>

      {modal.show && <CaseStudyModal mode={modal.mode} record={modal.record} onClose={() => setModal({ show: false, mode: null, record: null })} onSave={handleSave} />}
      {showPreview && <CaseStudyPreviewModal sections={records} onClose={() => setShowPreview(false)} />}
      {showReorder && <ReorderCaseStudiesModal records={records} onClose={() => setShowReorder(false)} onSave={handleReorderSave} />}
    </div>
  );
}
