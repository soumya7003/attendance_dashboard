import { useState } from 'react';
import { useStudents } from '../../hooks/useStudents';
import { FilterChips } from '../../components/filters/FilterChips';
import { Button } from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { ConfirmDialog } from '../../components/shared/ConfirmDialog';

import { AddStudentModal } from './components/AddStudentModal';
import { StudentSearch } from './components/StudentSearch';
import { StudentTable } from './components/StudentTable';

export default function Students() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ department: '', enrollmentStatus: '' });
  const [activeChips, setActiveChips] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { students, loading, total, addStudent, updateStudent, deleteStudent } =
    useStudents({ search, ...filters });

  /* ── filter helpers ───────────────────────────────────────── */
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (value) {
      setActiveChips((prev) => [
        ...prev.filter((c) => c.id !== key),
        { id: key, label: `${key}: ${value}` },
      ]);
    } else {
      setActiveChips((prev) => prev.filter((c) => c.id !== key));
    }
  };

  const removeChip = (id) => handleFilterChange(id, '');
  const clearAll = () => {
    setFilters({ department: '', enrollmentStatus: '' });
    setActiveChips([]);
  };

  /* ── modal helpers ────────────────────────────────────────── */
  const openAdd = () => {
    setEditingStudent(null);
    setModalOpen(true);
  };

  const openEdit = (student) => {
    setEditingStudent(student);
    setModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    if (editingStudent) await updateStudent(editingStudent.id, formData);
    else await addStudent(formData);
  };

  const handleDeleteConfirm = async () => {
    const id = deleteTarget?.id;
    setDeleteTarget(null);
    if (id) await deleteStudent(id);
  };

  /* ── render ───────────────────────────────────────────────── */
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Students</h1>
          <p className="text-secondary text-sm mt-1">
            Manage student records ({total} total)
          </p>
        </div>
        <Button onClick={openAdd} icon={Plus}>
          Add Student
        </Button>
      </div>

      {/* Search + filters */}
      <StudentSearch
        search={search}
        onSearchChange={setSearch}
        department={filters.department}
        status={filters.enrollmentStatus}
        onFilterChange={handleFilterChange}
      />

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <FilterChips filters={activeChips} onRemove={removeChip} />
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear all
          </Button>
        </div>
      )}

      {/* Table */}
      <StudentTable
        students={students}
        loading={loading}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      {/* Add / Edit modal */}
      <AddStudentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        editingStudent={editingStudent}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Student"
        message={`Are you sure you want to delete ${deleteTarget?.name}? This action cannot be undone.`}
      />
    </div>
  );
}