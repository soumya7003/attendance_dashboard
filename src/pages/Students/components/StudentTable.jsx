import { DataTable } from '../../../components/table/DataTable';
import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';
import { Edit, Trash2 } from 'lucide-react';

/**
 * StudentTable — wraps DataTable with student-specific columns.
 *
 * Props:
 *   students   array
 *   loading    boolean
 *   onEdit     (student) => void
 *   onDelete   (student) => void
 */
export function StudentTable({ students, loading, onEdit, onDelete }) {
  const columns = [
    {
      header: 'Roll No',
      accessor: 'roll',
      cell: (row) => (
        <span className="font-medium text-brand font-mono text-sm">{row.roll}</span>
      ),
    },
    {
      header: 'Name',
      accessor: 'name',
      cell: (row) => (
        <div>
          <p className="font-medium text-primary">{row.name}</p>
          <p className="text-xs text-muted">{row.email}</p>
        </div>
      ),
    },
    {
      header: 'Department',
      accessor: 'department',
      cell: (row) => (
        <span className="text-secondary text-sm">{row.department || '—'}</span>
      ),
    },
    {
      header: 'Status',
      accessor: 'enrollmentStatus',
      cell: (row) => (
        <Badge status={row.enrollmentStatus === 'active' ? 'success' : 'danger'}>
          {row.enrollmentStatus}
        </Badge>
      ),
    },
    {
      header: 'Card UID',
      accessor: 'cardUID',
      cell: (row) =>
        row.cardUID ? (
          <span className="font-mono text-xs text-secondary bg-overlay px-2 py-0.5 rounded">
            {row.cardUID}
          </span>
        ) : (
          <span className="text-muted text-sm">—</span>
        ),
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (row) => (
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(row)}
            className="p-1.5 rounded hover:bg-info-bg text-muted hover:text-primary transition-colors"
            title="Edit student"
            aria-label={`Edit ${row.name}`}
          >
            <Edit size={15} />
          </button>
          <button
            onClick={() => onDelete(row)}
            className="p-1.5 rounded hover:bg-danger-bg text-muted hover:text-danger transition-colors"
            title="Delete student"
            aria-label={`Delete ${row.name}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Card variant="default" className="p-0 overflow-hidden">
      <DataTable
        columns={columns}
        data={students}
        loading={loading}
        emptyMessage="No students found. Try adjusting your search or filters."
      />
    </Card>
  );
}