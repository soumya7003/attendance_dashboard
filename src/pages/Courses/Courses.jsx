import { useState } from 'react';
import { useCourses } from '../../hooks/useCourses';
import { DataTable } from '../../components/table/DataTable';
import { FilterBar } from '../../components/filters/FilterBar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '../../components/shared/ConfirmDialog';

const columns = [
  { header: 'Code', accessor: 'code' },
  { header: 'Course Name', accessor: 'name' },
  { header: 'Department', accessor: 'department' },
  { header: 'Enrolled', accessor: 'enrolled' },
  {
    header: 'Actions',
    accessor: 'id',
    cell: (row, onEdit, onDelete) => (
      <div className="flex gap-2">
        <button onClick={() => onEdit(row)} className="text-primary hover:text-primary/80">
          <Edit size={16} />
        </button>
        <button onClick={() => onDelete(row)} className="text-danger hover:text-danger/80">
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];

export default function Courses() {
  const { courses, loading, addCourse, updateCourse, deleteCourse } = useCourses();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({ code: '', name: '', department: '' });

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({ code: course.code, name: course.name, department: course.department });
    } else {
      setEditingCourse(null);
      setFormData({ code: '', name: '', department: '' });
    }
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editingCourse) {
      await updateCourse(editingCourse.id, formData);
    } else {
      await addCourse(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteTarget) {
      await deleteCourse(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Courses</h1>
          <p className="text-secondary text-sm mt-1">Manage course catalogue</p>
        </div>
        <Button onClick={() => handleOpenModal()} icon={Plus}>
          Add Course
        </Button>
      </div>

      <FilterBar>
        <input type="text" placeholder="Search courses..." className="input h-9 w-64 text-sm" />
      </FilterBar>

      <Card variant="default" className="p-0 overflow-hidden">
        <DataTable
          columns={columns.map(col => ({
            ...col,
            cell: col.accessor === 'id' 
              ? (row) => col.cell(row, handleOpenModal, setDeleteTarget)
              : col.cell
          }))}
          data={courses}
          loading={loading}
          emptyMessage="No courses found"
        />
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCourse ? 'Edit Course' : 'Add Course'}>
        <div className="space-y-4">
          <Input label="Course Code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} />
          <Input label="Course Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <Input label="Department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>{editingCourse ? 'Update' : 'Create'}</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Course"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}