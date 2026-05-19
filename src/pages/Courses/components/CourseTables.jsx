import DataTable from '../../components/table/DataTable';
import Badge    from '../../components/ui/Badge';
import Button   from '../../components/ui/Button';

// ─── Column definitions ────────────────────────────────────────────────────────
// Each column maps a header label to an accessor key (or a custom render fn).
const COLUMNS = [
  {
    header: 'Code',
    accessor: 'code',
    render: (value) => (
      <span style={{
        fontFamily: 'JetBrains Mono, Fira Code, monospace',
        fontSize: '12px',
        fontWeight: 600,
        color: '#6366f1',
        background: 'rgba(99,102,241,0.1)',
        border: '1px solid rgba(99,102,241,0.2)',
        padding: '3px 8px',
        borderRadius: '6px',
        letterSpacing: '0.04em',
      }}>
        {value}
      </span>
    ),
  },
  {
    header: 'Name',
    accessor: 'name',
    render: (value) => (
      <span style={{ fontWeight: 500, color: '#f1f5f9' }}>{value}</span>
    ),
  },
  {
    header: 'Department',
    accessor: 'department',
    render: (value) => (
      <Badge variant="secondary">{value}</Badge>
    ),
  },
  {
    header: 'Enrolled',
    accessor: 'enrolled',
    render: (value) => (
      <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 500 }}>
        {value ?? 0}
      </span>
    ),
  },
  {
    header: 'Actions',
    accessor: 'id',
    render: () => (
      // MVP: Edit is a placeholder — not wired to any action yet.
      <Button variant="outline" size="sm" disabled>
        Edit
      </Button>
    ),
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
/**
 * CourseTable
 * Renders the list of courses using the shared DataTable primitive.
 *
 * @param {{ data: Array }} props
 *   data — array of course objects: { id, code, name, department, enrolled }
 */
export default function CourseTable({ data = [] }) {
  return (
    <DataTable
      columns={COLUMNS}
      data={data}
      emptyMessage="No courses found."
      rowKey="id"
    />
  );
}