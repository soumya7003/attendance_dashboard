import { useState } from 'react';
import { useSessions } from '../../hooks/useSessions';
import { useCourses } from '../../hooks/useCourses';
import { DataTable } from '../../components/table/DataTable';
import { FilterBar } from '../../components/filters/FilterBar';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Plus, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '../../components/shared/ConfirmDialog';

const columns = [
  { header: 'Date', accessor: 'date' },
  { header: 'Course', accessor: 'courseName' },
  { header: 'Room', accessor: 'room' },
  { header: 'Time', accessor: 'startTime', cell: (row) => `${row.startTime} - ${row.endTime}` },
  { header: 'Attendance', accessor: (row) => `${row.presentCount}/${row.totalEnrolled}` },
  { header: 'Actions', accessor: 'id', cell: (row, onDelete) => <button onClick={() => onDelete(row)} className="text-danger"><Trash2 size={16} /></button> },
];

export default function Sessions() {
  const { sessions, loading, createSession, deleteSession } = useSessions();
  const { courses } = useCourses();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({ courseId: '', room: '', date: '', startTime: '', endTime: '' });

  const handleSubmit = async () => {
    await createSession(formData);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between"><div><h1 className="text-2xl font-bold">Sessions</h1></div><Button onClick={() => setModalOpen(true)} icon={Plus}>Create Session</Button></div>
      <FilterBar><input placeholder="Filter by course..." className="input h-9 w-64 text-sm" /></FilterBar>
      <Card className="p-0 overflow-hidden"><DataTable columns={columns.map(col => ({ ...col, cell: col.accessor === 'id' ? (row) => col.cell(row, setDeleteTarget) : col.cell }))} data={sessions} loading={loading} /></Card>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create Session">
        <div className="space-y-3">
          <select className="input" value={formData.courseId} onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}><option value="">Select Course</option>{courses.map(c => <option key={c.id} value={c.id}>{c.code} - {c.name}</option>)}</select>
          <Input label="Room" value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })} />
          <Input type="date" label="Date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <Input type="time" label="Start Time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
          <Input type="time" label="End Time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} />
          <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={handleSubmit}>Create</Button></div>
        </div>
      </Modal>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={async () => { await deleteSession(deleteTarget.id); setDeleteTarget(null); }} title="Delete Session" message="This will delete the session record." />
    </div>
  );
}