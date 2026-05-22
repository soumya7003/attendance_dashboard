import { useState } from 'react';
import { Plus } from 'lucide-react';

const COURSES = [
  'CS101 — Introduction to Computer Science',
  'MA201 — Calculus II',
  'PH301 — Quantum Mechanics',
  'EE102 — Circuit Theory',
  'CS202 — Data Structures',
];
const ROOMS = ['Room 101', 'Room 102', 'Room 204', 'Room 305', 'Lab 3', 'Auditorium A'];

const labelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'var(--text-secondary)',
  marginBottom: 6,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

export default function CreateSessionModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ course: '', room: '', date: '', time: '', duration: '90' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const valid = form.course && form.room && form.date && form.time;

  const handleSubmit = () => {
    if (!valid) return;
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
    <div
      style={{
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={18} color="var(--primary)" />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Create Session</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Schedule a new attendance session</p>
          </div>
        </div>

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
              <input type="date" className="input" style={{ width: '100%' }} value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Start Time</label>
              <input type="time" className="input" style={{ width: '100%' }} value={form.time} onChange={e => set('time', e.target.value)} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Duration (minutes)</label>
            <input type="number" className="input" style={{ width: '100%' }} value={form.duration} min={15} step={15} onChange={e => set('duration', e.target.value)} />
          </div>
        </div>

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
            disabled={!valid}
            style={{
              padding: '9px 24px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: valid ? 'var(--gradient-primary)' : '#E2E8F0',
              color: valid ? '#fff' : 'var(--text-muted)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: valid ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              boxShadow: valid ? '0 2px 8px rgba(37,99,235,0.2)' : 'none',
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