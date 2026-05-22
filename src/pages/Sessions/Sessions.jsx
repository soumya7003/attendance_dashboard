import { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, BookOpen, Play, Square, Trash2, MoreVertical, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_SESSIONS = [
  {
    id: 1,
    courseCode: 'CS101',
    course: 'Introduction to Computer Science',
    room: 'Room 101',
    date: '2026-05-22',
    time: '09:00 AM',
    duration: '90 min',
    status: 'active',
    enrolled: 32,
    present: 28,
    late: 2,
    absent: 2,
  },
  {
    id: 2,
    courseCode: 'MA201',
    course: 'Calculus II',
    room: 'Room 204',
    date: '2026-05-22',
    time: '11:00 AM',
    duration: '60 min',
    status: 'scheduled',
    enrolled: 28,
    present: 0,
    late: 0,
    absent: 0,
  },
  {
    id: 3,
    courseCode: 'PH301',
    course: 'Quantum Mechanics',
    room: 'Lab 3',
    date: '2026-05-21',
    time: '02:00 PM',
    duration: '120 min',
    status: 'ended',
    enrolled: 20,
    present: 17,
    late: 1,
    absent: 2,
  },
  {
    id: 4,
    courseCode: 'EE102',
    course: 'Circuit Theory',
    room: 'Room 305',
    date: '2026-05-21',
    time: '10:00 AM',
    duration: '90 min',
    status: 'ended',
    enrolled: 35,
    present: 30,
    late: 3,
    absent: 2,
  },
  {
    id: 5,
    courseCode: 'CS202',
    course: 'Data Structures',
    room: 'Room 102',
    date: '2026-05-23',
    time: '09:00 AM',
    duration: '90 min',
    status: 'scheduled',
    enrolled: 30,
    present: 0,
    late: 0,
    absent: 0,
  },
];

const COURSES = ['CS101 — Introduction to Computer Science', 'MA201 — Calculus II', 'PH301 — Quantum Mechanics', 'EE102 — Circuit Theory', 'CS202 — Data Structures'];
const ROOMS = ['Room 101', 'Room 102', 'Room 204', 'Room 305', 'Lab 3', 'Auditorium A'];

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS = {
  active: {
    label: 'Active',
    color: 'var(--success)',
    bg: 'var(--success-bg)',
    border: 'var(--success-border)',
    Icon: Play,
  },
  scheduled: {
    label: 'Scheduled',
    color: 'var(--primary)',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    Icon: Clock,
  },
  ended: {
    label: 'Ended',
    color: 'var(--text-muted)',
    bg: '#F1F5F9',
    border: '#E2E8F0',
    Icon: CheckCircle,
  },
};

// ─── Attendance mini bar ──────────────────────────────────────────────────────
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

// ─── Session card ─────────────────────────────────────────────────────────────
function SessionCard({ session, onStart, onEnd, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { label, color, bg, border, Icon } = STATUS[session.status];

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
            width: 42,
            height: 42,
            borderRadius: 'var(--radius-md)',
            background: session.status === 'active' ? 'var(--success-bg, #F0FDF4)' : '#EFF6FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <BookOpen size={18} color={session.status === 'active' ? 'var(--success)' : 'var(--primary)'} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: 2 }}>
              {session.courseCode}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220 }}>
              {session.course}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Status badge */}
          {session.status === 'active' ? (
            <div className="badge-live">
              <span className="pulse-dot" />
              <span>LIVE</span>
            </div>
          ) : (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color,
              background: bg,
              border: `1px solid ${border}`,
            }}>
              <Icon size={11} />
              {label}
            </span>
          )}

          {/* More menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--glass-border)',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-muted)',
              }}
            >
              <MoreVertical size={14} />
            </button>
            {menuOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: 36,
                background: '#FFFFFF',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                minWidth: 160,
                zIndex: 100,
                overflow: 'hidden',
              }}
                onMouseLeave={() => setMenuOpen(false)}
              >
                {session.status === 'scheduled' && (
                  <button
                    onClick={() => { onStart(session.id); setMenuOpen(false); }}
                    style={menuItemStyle}
                  >
                    <Play size={13} color="var(--success)" />
                    <span>Start Session</span>
                  </button>
                )}
                {session.status === 'active' && (
                  <button
                    onClick={() => { onEnd(session.id); setMenuOpen(false); }}
                    style={menuItemStyle}
                  >
                    <Square size={13} color="var(--warning)" />
                    <span>End Session</span>
                  </button>
                )}
                <button
                  onClick={() => { onDelete(session.id); setMenuOpen(false); }}
                  style={{ ...menuItemStyle, color: 'var(--danger)' }}
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginBottom: 4 }}>
        {[
          { Icon: MapPin, text: session.room },
          { Icon: Calendar, text: session.date },
          { Icon: Clock, text: `${session.time} · ${session.duration}` },
          { Icon: Users, text: `${session.enrolled} students` },
        ].map(({ Icon: I, text }) => (
          <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <I size={11} />
            {text}
          </span>
        ))}
      </div>

      {/* Attendance bar — only for active/ended */}
      {session.status !== 'scheduled' && (
        <AttendanceBar
          present={session.present}
          late={session.late}
          absent={session.absent}
          enrolled={session.enrolled}
        />
      )}

      {/* Action buttons */}
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        {session.status === 'scheduled' && (
          <button
            onClick={() => onStart(session.id)}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.8125rem',
              padding: '7px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-primary)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37,99,235,0.2)',
            }}
          >
            <Play size={13} />
            Start Session
          </button>
        )}
        {session.status === 'active' && (
          <button
            onClick={() => onEnd(session.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.8125rem',
              padding: '7px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--danger-bg, #FEF2F2)',
              color: 'var(--danger)',
              border: '1px solid var(--danger-border, #FECACA)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Square size={13} />
            End Session
          </button>
        )}
        {session.status === 'ended' && (
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.8125rem',
              padding: '7px 16px',
              borderRadius: 'var(--radius-md)',
              background: '#F8FAFC',
              color: 'var(--text-secondary)',
              border: '1px solid var(--glass-border)',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            View Report
          </button>
        )}
      </div>
    </div>
  );
}

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

// ─── Create session modal ─────────────────────────────────────────────────────
function CreateSessionModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ course: '', room: '', date: '', time: '', duration: '90' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.course || !form.room || !form.date || !form.time) return;
    const [code, ...rest] = form.course.split(' — ');
    onCreate({
      id: Date.now(),
      courseCode: code,
      course: rest.join(' — '),
      room: form.room,
      date: form.date,
      time: form.time,
      duration: `${form.duration} min`,
      status: 'scheduled',
      enrolled: 30,
      present: 0,
      late: 0,
      absent: 0,
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(15,23,42,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
    }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        width: '100%',
        maxWidth: 480,
        boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
      }}>
        {/* Modal header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={18} color="var(--primary)" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Create Session</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Schedule a new attendance session</p>
          </div>
        </div>

        {/* Form fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Course</label>
            <select className="input" value={form.course} onChange={e => set('course', e.target.value)} style={{ width: '100%' }}>
              <option value="">Select a course…</option>
              {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Room</label>
            <select className="input" value={form.room} onChange={e => set('room', e.target.value)} style={{ width: '100%' }}>
              <option value="">Select a room…</option>
              {ROOMS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Date</label>
              <input
                type="date"
                className="input"
                style={{ width: '100%' }}
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>Start Time</label>
              <input
                type="time"
                className="input"
                style={{ width: '100%' }}
                value={form.time}
                onChange={e => set('time', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Duration (minutes)</label>
            <input
              type="number"
              className="input"
              style={{ width: '100%' }}
              value={form.duration}
              min={15}
              step={15}
              onChange={e => set('duration', e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '9px 20px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--glass-border)',
              background: '#F8FAFC',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!form.course || !form.room || !form.date || !form.time}
            style={{
              padding: '9px 24px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: form.course && form.room && form.date && form.time
                ? 'var(--gradient-primary)'
                : '#E2E8F0',
              color: form.course && form.room && form.date && form.time ? '#fff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: form.course && form.room && form.date && form.time ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              boxShadow: '0 2px 8px rgba(37,99,235,0.2)',
            }}
          >
            <Plus size={14} />
            Create Session
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'var(--text-secondary)',
  marginBottom: 6,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

// ─── Filter tab ───────────────────────────────────────────────────────────────
function FilterTab({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        padding: '7px 14px',
        borderRadius: 'var(--radius-md)',
        border: active ? '1px solid #BFDBFE' : '1px solid transparent',
        background: active ? '#EFF6FF' : 'transparent',
        color: active ? 'var(--primary)' : 'var(--text-muted)',
        fontWeight: active ? 700 : 500,
        fontSize: '0.8125rem',
        cursor: 'pointer',
        transition: 'all 150ms ease',
      }}
    >
      {label}
      <span style={{
        background: active ? 'var(--primary)' : '#E2E8F0',
        color: active ? '#fff' : 'var(--text-muted)',
        borderRadius: 999,
        fontSize: '0.6875rem',
        fontWeight: 700,
        padding: '1px 7px',
        minWidth: 20,
        textAlign: 'center',
      }}>
        {count}
      </span>
    </button>
  );
}

// ─── Main Sessions page ───────────────────────────────────────────────────────
export default function Sessions() {
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const handleStart = (id) =>
    setSessions(s => s.map(x => x.id === id ? { ...x, status: 'active' } : x));

  const handleEnd = (id) =>
    setSessions(s => s.map(x => x.id === id ? { ...x, status: 'ended' } : x));

  const handleDelete = (id) =>
    setSessions(s => s.filter(x => x.id !== id));

  const handleCreate = (session) =>
    setSessions(s => [session, ...s]);

  const counts = {
    all: sessions.length,
    active: sessions.filter(s => s.status === 'active').length,
    scheduled: sessions.filter(s => s.status === 'scheduled').length,
    ended: sessions.filter(s => s.status === 'ended').length,
  };

  const filtered = filter === 'all' ? sessions : sessions.filter(s => s.status === filter);

  return (
    <div className="space-y-6 page-content">
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Sessions
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 4 }}>
            Manage and monitor all attendance sessions
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '9px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--gradient-primary)',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(37,99,235,0.25)',
          }}
        >
          <Plus size={15} />
          New Session
        </button>
      </div>

      {/* Summary stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-4)' }}>
        {[
          { label: 'Total', value: counts.all, Icon: Calendar, color: 'primary', iconBg: '#EFF6FF', iconColor: 'var(--primary)' },
          { label: 'Active', value: counts.active, Icon: Play, color: 'success', iconBg: 'var(--success-bg)', iconColor: 'var(--success)' },
          { label: 'Scheduled', value: counts.scheduled, Icon: Clock, color: 'primary', iconBg: '#EFF6FF', iconColor: 'var(--primary)' },
          { label: 'Ended', value: counts.ended, Icon: CheckCircle, color: 'muted', iconBg: '#F1F5F9', iconColor: 'var(--text-muted)' },
        ].map(({ label, value, Icon, iconBg, iconColor }) => (
          <div key={label} style={{
            background: '#FFFFFF',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '18px 20px',
            boxShadow: 'var(--glass-shadow)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={15} color={iconColor} />
              </div>
            </div>
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.03em' }}>
              {value}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, fontWeight: 500 }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex',
        gap: 4,
        background: '#F8FAFC',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 5,
        width: 'fit-content',
        flexWrap: 'wrap',
      }}>
        {[
          { key: 'all', label: 'All Sessions' },
          { key: 'active', label: 'Active' },
          { key: 'scheduled', label: 'Scheduled' },
          { key: 'ended', label: 'Ended' },
        ].map(({ key, label }) => (
          <FilterTab
            key={key}
            label={label}
            count={counts[key]}
            active={filter === key}
            onClick={() => setFilter(key)}
          />
        ))}
      </div>

      {/* Session cards grid */}
      {filtered.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 32px',
          background: '#FFFFFF',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--glass-shadow)',
          textAlign: 'center',
        }}>
          <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-xl)', background: '#F8FAFF', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Calendar size={22} color="var(--text-muted)" />
          </div>
          <p style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>No sessions found</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Create a new session to get started.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-4)' }}>
          {filtered.map(session => (
            <SessionCard
              key={session.id}
              session={session}
              onStart={handleStart}
              onEnd={handleEnd}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <CreateSessionModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}