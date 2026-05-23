import { useState, useMemo } from "react";
import WebsiteContentHeader from "../components/websiteContent/WebsiteContentHeader";
import WebsiteContentTabs from "../components/websiteContent/WebsiteContentTabs";
import WebsiteContentStats from "../components/websiteContent/WebsiteContentStats";
import WebsiteContentTable from "../components/websiteContent/WebsiteContentTable";
import WebsiteContentDetails from "../components/websiteContent/WebsiteContentDetails";
import WebsiteQuickActions from "../components/websiteContent/WebsiteQuickActions";
import WebsiteContentModal from "../components/websiteContent/WebsiteContentModal";
import WebsitePreviewModal from "../components/websiteContent/WebsitePreviewModal";
import TrashModal from "../components/websiteContent/TrashModal";
import ImportModal from "../components/websiteContent/ImportModal";
import { initialSections } from "../data/websiteContentData";

let nextId = 100;

export default function WebsiteContent() {
  const [sections, setSections] = useState(initialSections);
  const [deletedSections, setDeletedSections] = useState([]);
  const [activeTab, setActiveTab] = useState("All Sections");
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState({ show: false, mode: null, record: null });
  const [showPreview, setShowPreview] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const filtered = useMemo(() => {
    if (activeTab === "All Sections") return sections;
    return sections.filter((s) => s.type === activeTab);
  }, [sections, activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelected(null);
  };

  const handleSave = (form) => {
    if (modal.mode === "edit") {
      setSections((prev) => prev.map((s) => (s.id === form.id ? { ...form } : s)));
      setSelected((prev) => (prev?.id === form.id ? form : prev));
    } else {
      const newSec = { ...form, id: nextId++ };
      setSections((prev) => [...prev, newSec]);
    }
  };

  const handlePublish = (id) => setSections((prev) => prev.map((s) => s.id === id ? { ...s, status: "Published" } : s));
  const handleUnpublish = (id) => setSections((prev) => prev.map((s) => s.id === id ? { ...s, status: "Draft" } : s));
  const handleHide = (id) => setSections((prev) => prev.map((s) => s.id === id ? { ...s, status: "Hidden" } : s));

  const handleDuplicate = (sec) => {
    const dup = { ...sec, id: nextId++, sectionName: `${sec.sectionName} (Copy)`, lastUpdated: sec.lastUpdated };
    setSections((prev) => [...prev, dup]);
  };

  const handleMoveUp = (id) => {
    const idx = sections.findIndex((s) => s.id === id);
    if (idx <= 0) return;
    const copy = [...sections];
    [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
    setSections(copy);
  };

  const handleMoveDown = (id) => {
    const idx = sections.findIndex((s) => s.id === id);
    if (idx < 0 || idx >= sections.length - 1) return;
    const copy = [...sections];
    [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
    setSections(copy);
  };

  const handleDelete = (id) => {
    const sec = sections.find((s) => s.id === id);
    if (sec) {
      setDeletedSections((prev) => [...prev, sec]);
      setSections((prev) => prev.filter((s) => s.id !== id));
      setSelected((prev) => prev?.id === id ? null : prev);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(sections, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "website_content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (data) => {
    const mapped = data.map((item) => ({ ...item, id: nextId++, status: item.status || "Draft", lastUpdated: item.lastUpdated || new Date().toLocaleString() }));
    setSections((prev) => [...prev, ...mapped]);
  };

  const handleRestore = (id) => {
    const item = deletedSections.find((d) => d.id === id);
    if (item) {
      setSections((prev) => [...prev, { ...item, id: nextId++ }]);
      setDeletedSections((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleDeletePermanent = (id) => {
    setDeletedSections((prev) => prev.filter((d) => d.id !== id));
  };

  const handleQuickAction = (action) => {
    if (action === "preview") setShowPreview(true);
    if (action === "export") handleExport();
    if (action === "import") setShowImport(true);
    if (action === "trash") setShowTrash(true);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <WebsiteContentHeader
        onPreview={() => setShowPreview(true)}
        onAdd={() => setModal({ show: true, mode: "add", record: null })}
      />

      <WebsiteContentStats sections={sections} />

      <WebsiteContentTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <WebsiteContentTable
            records={filtered}
            selectedId={selected?.id}
            onRowClick={setSelected}
            onEdit={(record) => setModal({ show: true, mode: "edit", record })}
            onViewDetails={setSelected}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
            onHide={handleHide}
            onDuplicate={handleDuplicate}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onDelete={handleDelete}
          />
        </div>

        <div className="space-y-4">
          <WebsiteContentDetails
            selected={selected}
            onEdit={(record) => setModal({ show: true, mode: "edit", record })}
          />
          <WebsiteQuickActions onAction={handleQuickAction} />
        </div>
      </div>

      {modal.show && (
        <WebsiteContentModal
          mode={modal.mode}
          record={modal.record}
          onClose={() => setModal({ show: false, mode: null, record: null })}
          onSave={handleSave}
        />
      )}

      {showPreview && (
        <WebsitePreviewModal sections={sections} onClose={() => setShowPreview(false)} />
      )}

      {showTrash && (
        <TrashModal
          items={deletedSections}
          onClose={() => setShowTrash(false)}
          onRestore={handleRestore}
          onDeletePermanent={handleDeletePermanent}
        />
      )}

      {showImport && (
        <ImportModal
          onClose={() => setShowImport(false)}
          onImport={handleImport}
        />
      )}
    </div>
  );
}
