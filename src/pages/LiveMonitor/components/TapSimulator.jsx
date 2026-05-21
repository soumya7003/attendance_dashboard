import { useState } from 'react';
import { Zap, Hash } from 'lucide-react';

const STATUS_OPTIONS = ['present', 'late', 'absent'];
const STATUS_COLORS = {
  present: { color: 'var(--success)', bg: 'var(--success-bg)', border: 'var(--success-border)' },
  late:    { color: 'var(--warning)', bg: 'var(--warning-bg)', border: 'var(--warning-border)' },
  absent:  { color: 'var(--danger)',  bg: 'var(--danger-bg)',  border: 'var(--danger-border)' },
};

export default function TapSimulator({ activeSession, onTap }) {
  const [roll, setRoll] = useState('');
  const [status, setStatus] = useState('present');
  const [flash, setFlash] = useState(false);

  const handleTap = () => {
    if (!roll.trim()) return;
    onTap({
      roll: roll.trim().toUpperCase(),
      name: `Student ${roll.trim().toUpperCase()}`,
      status,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      isNew: true,
    });
    setRoll('');
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5) var(--space-6)',
        boxShadow: 'var(--glass-shadow)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
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
          <Zap size={16} color="var(--primary)" />
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
            Simulate NFC Tap
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Manually record a student tap for testing
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {/* Roll input */}
        <div style={{ flex: '1 1 180px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Roll Number
          </label>
          <div style={{ position: 'relative' }}>
            <Hash
              size={14}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
            <input
              type="text"
              placeholder="e.g. S001"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTap()}
              className="input"
              style={{ paddingLeft: 34, textTransform: 'uppercase' }}
            />
          </div>
        </div>

        {/* Status selector */}
        <div style={{ flex: '0 0 auto' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Status
          </label>
          <div style={{ display: 'flex', gap: 6 }}>
            {STATUS_OPTIONS.map((s) => {
              const { color, bg, border } = STATUS_COLORS[s];
              const active = status === s;
              return (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  style={{
                    height: 40,
                    padding: '0 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${active ? border : 'var(--glass-border)'}`,
                    background: active ? bg : '#F8FAFC',
                    color: active ? color : 'var(--text-secondary)',
                    fontSize: '0.8125rem',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 150ms ease',
                  }}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleTap}
          disabled={!roll.trim()}
          style={{
            height: 40,
            padding: '0 24px',
            borderRadius: 'var(--radius-md)',
            background: flash
              ? 'var(--success)'
              : roll.trim()
              ? 'var(--gradient-primary)'
              : '#E2E8F0',
            color: roll.trim() ? '#fff' : 'var(--text-muted)',
            border: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: roll.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 200ms ease',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: roll.trim() ? '0 2px 8px rgba(37,99,235,0.25)' : 'none',
            flexShrink: 0,
          }}
        >
          <Zap size={15} />
          {flash ? 'Tapped!' : 'Simulate Tap'}
        </button>
      </div>
    </div>
  );
}