import { Badge } from '../../../components/ui/Badge';
import { Users } from 'lucide-react';

const statusOrder = { present: 0, late: 1, absent: 2 };

export default function LiveTable({ records = [] }) {
  const sorted = [...records].sort(
    (a, b) => (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9)
  );

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--glass-shadow)',
      }}
    >
      {/* Card header */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '2px solid #EEF2FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 'var(--radius-md)',
              background: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Users size={16} color="var(--primary)" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
              Attendance Log
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {records.length} record{records.length !== 1 ? 's' : ''} captured
            </p>
          </div>
        </div>

        {/* Status summary pills */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { label: 'Present', color: 'var(--success)', bg: 'var(--success-bg)', key: 'present' },
            { label: 'Late',    color: 'var(--warning)', bg: 'var(--warning-bg)', key: 'late'    },
            { label: 'Absent',  color: 'var(--danger)',  bg: 'var(--danger-bg)',  key: 'absent'  },
          ].map(({ label, color, bg, key }) => {
            const count = records.filter((r) => r.status === key).length;
            return (
              <div
                key={key}
                style={{
                  background: bg,
                  color,
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <span style={{ fontWeight: 800 }}>{count}</span> {label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Table */}
      {sorted.length === 0 ? (
        <div
          style={{
            padding: '64px 32px',
            textAlign: 'center',
            color: 'var(--text-muted)',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-xl)',
              background: '#F8FAFF',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
            }}
          >
            <Users size={22} color="var(--text-muted)" />
          </div>
          <p style={{ fontWeight: 600, marginBottom: 4, color: 'var(--text-secondary)' }}>
            Waiting for taps…
          </p>
          <p style={{ fontSize: '0.8125rem' }}>Student check-ins will appear here in real time.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EEF2FF' }}>
                {['#', 'Roll No', 'Student Name', 'Status', 'Time'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '10px 16px',
                      textAlign: 'left',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      background: '#F8FAFF',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr
                  key={row.roll + i}
                  style={{ borderBottom: i < sorted.length - 1 ? '1px solid #F1F5F9' : 'none' }}
                  className={row.isNew ? 'table-row-new' : ''}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                >
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)', width: 40 }}>
                    {i + 1}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.8125rem',
                        background: '#EFF6FF',
                        color: 'var(--primary)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 600,
                      }}
                    >
                      {row.roll}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {row.name}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Badge status={row.status}>{row.status}</Badge>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                    {row.time || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}