import { useState } from 'react';
import { useStudents } from '../../hooks/useStudents';
import { DataTable } from '../../components/table/DataTable';
import { FilterBar } from '../../components/filters/FilterBar';
import { FilterChips } from '../../components/filters/FilterChips';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { ConfirmDialog } from '../../components/shared/ConfirmDialog';

const columns = [
  { header: 'Roll No', accessor: 'roll' },
  { header: 'Name', accessor: 'name' },
  { header: 'Email', accessor: 'email' },
  { header: 'Department', accessor: 'department' },
  {
    header: 'Status',
    accessor: 'enrollmentStatus',
    cell: (row) => <Badge status={row.enrollmentStatus === 'active' ? 'success' : 'danger'}>{row.enrollmentStatus}</Badge>,
  },
  { header: 'Card UID', accessor: 'cardUID', cell: (row) => row.cardUID || '—' },
  {
    header: 'Actions',
    accessor: 'id',
    cell: (row, onEdit, onDelete) => (
      <div className="flex gap-2">
        <button onClick={() => onEdit(row)} className="text-primary hover:text-primary/80"><Edit size={16} /></button>
        <button onClick={() => onDelete(row)} className="text-danger hover:text-danger/80"><Trash2 size={16} /></button>
      </div>
    ),
  },
];

export default function Students() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ department: '', enrollmentStatus: '' });
  const [activeChips, setActiveChips] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({ roll: '', name: '', email: '', department: '', enrollmentStatus: 'active', cardUID: '' });

  const { students, loading, total, addStudent, updateStudent, deleteStudent } = useStudents({ search, ...filters });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (value) setActiveChips(prev => [...prev.filter(c => c.id !== key), { id: key, label: `${key}: ${value}` }]);
    else setActiveChips(prev => prev.filter(c => c.id !== key));
  };

  const removeChip = (id) => handleFilterChange(id, '');
  const clearAll = () => { setFilters({ department: '', enrollmentStatus: '' }); setActiveChips([]); };

  const handleSubmit = async () => {
    if (editingStudent) await updateStudent(editingStudent.id, formData);
    else await addStudent(formData);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Students</h1>
          <p className="text-secondary text-sm mt-1">Manage student records ({total} total)</p>
        </div>
        <Button onClick={() => { setEditingStudent(null); setFormData({ roll: '', name: '', email: '', department: '', enrollmentStatus: 'active', cardUID: '' }); setModalOpen(true); }} icon={Plus}>Add Student</Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input type="text" placeholder="Search by name, roll, email..." className="input pl-9 h-9 w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="input h-9 w-40" value={filters.department} onChange={(e) => handleFilterChange('department', e.target.value)}>
          <option value="">All Depts</option>
          <option>Computer Science</option><option>Mathematics</option><option>Physics</option>
        </select>
        <select className="input h-9 w-40" value={filters.enrollmentStatus} onChange={(e) => handleFilterChange('enrollmentStatus', e.target.value)}>
          <option value="">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
        </select>
      </div>

      <FilterChips filters={activeChips} onRemove={removeChip} />
      {activeChips.length > 0 && <Button variant="ghost" size="sm" onClick={clearAll}>Clear all</Button>}

      <Card variant="default" className="p-0 overflow-hidden">
        <DataTable columns={columns.map(col => ({ ...col, cell: col.accessor === 'id' ? (row) => col.cell(row, setEditingStudent, setDeleteTarget) : col.cell }))} data={students} loading={loading} emptyMessage="No students found" />
      </Card>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingStudent ? 'Edit Student' : 'Add Student'}>
        <div className="space-y-3">
          <Input label="Roll Number" value={formData.roll} onChange={(e) => setFormData({ ...formData, roll: e.target.value })} />
          <Input label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <Input label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <Input label="Department" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
          <select className="input" value={formData.enrollmentStatus} onChange={(e) => setFormData({ ...formData, enrollmentStatus: e.target.value })}>
            <option value="active">Active</option><option value="inactive">Inactive</option>
          </select>
          <Input label="Card UID (optional)" value={formData.cardUID} onChange={(e) => setFormData({ ...formData, cardUID: e.target.value })} />
          <div className="flex justify-end gap-2 pt-4"><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={handleSubmit}>{editingStudent ? 'Update' : 'Create'}</Button></div>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={async () => { await deleteStudent(deleteTarget.id); setDeleteTarget(null); }} title="Delete Student" message={`Delete ${deleteTarget?.name}?`} />
    </div>
  );
}