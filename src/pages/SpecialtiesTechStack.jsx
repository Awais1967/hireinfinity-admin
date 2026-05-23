import { useState, useMemo } from "react";
import SpecialtiesHeader from "../components/specialties/SpecialtiesHeader";
import SpecialtiesTabs from "../components/specialties/SpecialtiesTabs";
import SpecialtiesTable from "../components/specialties/SpecialtiesTable";
import TechStackTable from "../components/specialties/TechStackTable";
import SpecialtyModal from "../components/specialties/SpecialtyModal";
import Pagination from "../components/specialties/Pagination";
import { initialSpecialties, initialTechTags } from "../data/specialtiesData";

const SPECIALTIES_PAGE_SIZE = 5;
const TECH_PAGE_SIZE = 8;

let nextSpecId = 100;
let nextTechId = 100;

export default function SpecialtiesTechStack() {
  const [activeTab, setActiveTab] = useState("specialties");
  const [specialties, setSpecialties] = useState(initialSpecialties);
  const [techTags, setTechTags] = useState(initialTechTags);
  const [specPage, setSpecPage] = useState(1);
  const [techPage, setTechPage] = useState(1);
  const [modal, setModal] = useState({ show: false, record: null });

  const sortedSpecs = useMemo(
    () => [...specialties].sort((a, b) => a.order - b.order),
    [specialties]
  );

  const sortedTech = useMemo(
    () => [...techTags].sort((a, b) => a.order - b.order),
    [techTags]
  );

  const specTotalPages = Math.ceil(sortedSpecs.length / SPECIALTIES_PAGE_SIZE);
  const techTotalPages = Math.ceil(sortedTech.length / TECH_PAGE_SIZE);

  const paginatedSpecs = useMemo(() => {
    const start = (specPage - 1) * SPECIALTIES_PAGE_SIZE;
    return sortedSpecs.slice(start, start + SPECIALTIES_PAGE_SIZE);
  }, [sortedSpecs, specPage]);

  const paginatedTech = useMemo(() => {
    const start = (techPage - 1) * TECH_PAGE_SIZE;
    return sortedTech.slice(start, start + TECH_PAGE_SIZE);
  }, [sortedTech, techPage]);

  const activeSpecialtyNames = useMemo(
    () => specialties.filter((s) => s.status === "Active").map((s) => s.name),
    [specialties]
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSpecPage(1);
    setTechPage(1);
  };

  const handleActivate = (id) => {
    const setter = activeTab === "specialties" ? setSpecialties : setTechTags;
    setter((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Active" } : i)));
  };

  const handleDeactivate = (id) => {
    const setter = activeTab === "specialties" ? setSpecialties : setTechTags;
    setter((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Inactive" } : i)));
  };

  const handleMoveUp = (id) => {
    const setter = activeTab === "specialties" ? setSpecialties : setTechTags;
    setter((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((i) => i.id === id);
      if (idx <= 0) return prev;
      const result = prev.map((i) => {
        if (i.id === sorted[idx].id) return { ...i, order: sorted[idx - 1].order };
        if (i.id === sorted[idx - 1].id) return { ...i, order: sorted[idx].order };
        return i;
      });
      return result;
    });
  };

  const handleMoveDown = (id) => {
    const setter = activeTab === "specialties" ? setSpecialties : setTechTags;
    setter((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((i) => i.id === id);
      if (idx < 0 || idx >= sorted.length - 1) return prev;
      const result = prev.map((i) => {
        if (i.id === sorted[idx].id) return { ...i, order: sorted[idx + 1].order };
        if (i.id === sorted[idx + 1].id) return { ...i, order: sorted[idx].order };
        return i;
      });
      return result;
    });
  };

  const handleDelete = (id) => {
    const setter = activeTab === "specialties" ? setSpecialties : setTechTags;
    setter((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSave = (form) => {
    if (activeTab === "specialties") {
      const existing = specialties.find((s) => s.id === form.id);
      if (existing) {
        setSpecialties((prev) => prev.map((s) => (s.id === form.id ? { ...form } : s)));
      } else {
        setSpecialties((prev) => [...prev, { ...form, id: nextSpecId++ }]);
      }
    } else {
      const existing = techTags.find((t) => t.id === form.id);
      if (existing) {
        setTechTags((prev) => prev.map((t) => (t.id === form.id ? { ...form } : t)));
      } else {
        setTechTags((prev) => [...prev, { ...form, id: nextTechId++ }]);
      }
    }
  };

  const currentLabel = activeTab === "specialties" ? "specialties" : "tech tags";
  const currentTotal = activeTab === "specialties" ? sortedSpecs.length : sortedTech.length;
  const currentPage = activeTab === "specialties" ? specPage : techPage;
  const currentTotalPages = activeTab === "specialties" ? specTotalPages : techTotalPages;
  const currentPageSize = activeTab === "specialties" ? SPECIALTIES_PAGE_SIZE : TECH_PAGE_SIZE;
  const setPage = activeTab === "specialties" ? setSpecPage : setTechPage;
  const currentRecords = activeTab === "specialties" ? paginatedSpecs : paginatedTech;

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <SpecialtiesHeader
        activeTab={activeTab}
        onAdd={() => setModal({ show: true, record: null })}
      />

      <SpecialtiesTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === "specialties" ? (
        <SpecialtiesTable
          records={currentRecords}
          onEdit={(record) => setModal({ show: true, record })}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onDelete={handleDelete}
        />
      ) : (
        <TechStackTable
          records={currentRecords}
          onEdit={(record) => setModal({ show: true, record })}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          onDelete={handleDelete}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={currentTotalPages}
        totalItems={currentTotal}
        pageSize={currentPageSize}
        itemLabel={currentLabel}
        onPageChange={setPage}
      />

      {modal.show && (
        <SpecialtyModal
          activeTab={activeTab}
          record={modal.record}
          onClose={() => setModal({ show: false, record: null })}
          onSave={handleSave}
          specialtyOptions={activeSpecialtyNames}
        />
      )}
    </div>
  );
}
