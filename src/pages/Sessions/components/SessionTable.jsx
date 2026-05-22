import { Play, Square, Trash2, MapPin, Calendar, Clock, Users, CheckCircle, BookOpen, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const STATUS = {
  active: { label: 'Active', color: 'var(--success)', bg: 'var(--success-bg)', border: 'var(--success-border, #BBF7D0)', Icon: Play },
  scheduled: { label: 'Scheduled', color: 'var(--primary)', bg: '#EFF6FF', border: '#BFDBFE', Icon: Clock },
  ended: { label: 'Ended', color: 'var(--text-muted)', bg: '#F1F5F9', border: '#E2E8F0', Icon: CheckCircle },
};

function AttendanceBar({ present, late, absent, enrolled }) {
  if (!enrolled) return null;
  const pPct = (present / enrolled) * 100;
  const lPct = (late / enrolled) * 100;
  const aPct = (absent / enrolled) * 100;
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 5, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <span style={{ color: 'var(--success)', fontWeight: 600 }}>{present} present</span>
        <span>·</span>
        <span style={{ color: 'var(--warning)', fontWeight: 600 }}>{late} late</span>
        <span>·</span>
        <span style={{ color: 'var(--danger)', fontWeight: 600 }}>{absent} absent</span>
        <span style={{ marginLeft: 'auto' }}>{enrolled} enrolled</span>
      </div>
      <div style={{ height: 5, borderRadius: 999, background: '#E2E8F0', overflow: 'hidden', display: 'flex' }}>
        <div style={{ width: `${pPct}%`, background: 'var(--success)', transition: 'width 0.4s ease' }} />
        <div style={{ width: `${lPct}%`, background: 'var(--warning)', transition: 'width 0.4s ease' }} />
        <div style={{ width: `${aPct}%`, background: 'var(--danger)', transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
}

export function SessionCard({ session, onStart, onEnd, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { label, color, bg, border, Icon } = STATUS[session.status];

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    width: '100%',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.8125rem',
    color: 'var(--text-primary)',
    fontWeight: 500,
    textAlign: 'left',
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: `1px solid ${session.status === 'active' ? 'var(--success-border, #BBF7D0)' : 'var(--glass-border)'}`,
        borderRadius: 'var(--radius-xl)',
        padding: '20px 24px',
        boxShadow: session.status === 'active'
          ? '0 0 0 3px rgba(34,197,94,0.08), var(--glass-shadow)'
          : 'var(--glass-shadow)',
        transition: 'all 200ms ease',
        position: 'relative',
      }}
      onMouseEnter={e => { if (session.status !== 'active') e.currentTarget.style.borderColor = '#BFDBFE'; }}
      onMouseLeave={e => { if (session.status !== 'active') e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 42, height: 42,
            borderRadius: 'var(--radius-md)',
            background: session.status === 'active' ? 'var(--success-bg, #F0FDF4)' : '#EFF6FF',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <BookOpen size={18} color={session.status === 'active' ? 'var(--success)' : 'var(--primary)'} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: 2 }}>{session.courseCode}</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220 }}>{session.course}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {session.status === 'active' ? (
            <div className="badge-live"><span className="pulse-dot" /><span>LIVE</span></div>
          ) : (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '4px 10px', borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem', fontWeight: 600, color, background: bg, border: `1px solid ${border}`,
            }}>
              <Icon size={11} />{label}
            </span>
          )}

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                width: 30, height: 30, borderRadius: 'var(--radius-md)',
                border: '1px solid var(--glass-border)', background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-muted)',
              }}
            >
              <MoreVertical size={14} />
            </button>
            {menuOpen && (
              <div
                style={{
                  position: 'absolute', right: 0, top: 36, background: '#FFFFFF',
                  border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 160, zIndex: 100, overflow: 'hidden',
                }}
                onMouseLeave={() => setMenuOpen(false)}
              >
                {session.status === 'scheduled' && (
                  <button onClick={() => { onStart(session.id); setMenuOpen(false); }} style={menuItemStyle}>
                    <Play size={13} color="var(--success)" /><span>Start Session</span>
                  </button>
                )}
                {session.status === 'active' && (
                  <button onClick={() => { onEnd(session.id); setMenuOpen(false); }} style={menuItemStyle}>
                    <Square size={13} color="var(--warning)" /><span>End Session</span>
                  </button>
                )}
                <button onClick={() => { onDelete(session.id); setMenuOpen(false); }} style={{ ...menuItemStyle, color: 'var(--danger)' }}>
                  <Trash2 size={13} /><span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginBottom: 4 }}>
        {[
          { I: MapPin, t: session.room },
          { I: Calendar, t: session.date },
          { I: Clock, t: `${session.time} · ${session.duration}` },
          { I: Users, t: `${session.enrolled} students` },
        ].map(({ I, t }) => (
          <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <I size={11} />{t}
          </span>
        ))}
      </div>

      {session.status !== 'scheduled' && (
        <AttendanceBar present={session.present} late={session.late} absent={session.absent} enrolled={session.enrolled} />
      )}

      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        {session.status === 'scheduled' && (
          <button
            onClick={() => onStart(session.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: '0.8125rem', padding: '7px 16px', borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-primary)', color: '#fff', border: 'none',
              fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,235,0.2)',
            }}
          >
            <Play size={13} />Start Session
          </button>
        )}
        {session.status === 'active' && (
          <button
            onClick={() => onEnd(session.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: '0.8125rem', padding: '7px 16px', borderRadius: 'var(--radius-md)',
              background: 'var(--danger-bg, #FEF2F2)', color: 'var(--danger)',
              border: '1px solid var(--danger-border, #FECACA)', fontWeight: 600, cursor: 'pointer',
            }}
          >
            <Square size={13} />End Session
          </button>
        )}
        {session.status === 'ended' && (
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: '0.8125rem', padding: '7px 16px', borderRadius: 'var(--radius-md)',
            background: '#F8FAFC', color: 'var(--text-secondary)',
            border: '1px solid var(--glass-border)', fontWeight: 500, cursor: 'pointer',
          }}>
            View Report
          </button>
        )}
      </div>
    </div>
  );
}