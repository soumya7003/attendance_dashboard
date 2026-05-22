import { Calendar, BookOpen, MapPin, Clock } from 'lucide-react';

export default function SessionSelector({ sessions = [], activeSession, onSelect }) {
  if (!sessions.length) return null;

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5) var(--space-6)',
        boxShadow: 'var(--glass-shadow)',
        marginBottom: 'var(--space-4)',
      }}
    >
      <p
        style={{
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: 12,
        }}
      >
        Select Session
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sessions.map((s) => {
          const isActive = activeSession?.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 16px',
                borderRadius: 'var(--radius-lg)',
                border: `1px solid ${isActive ? '#BFDBFE' : 'var(--glass-border)'}`,
                background: isActive ? '#EFF6FF' : '#F8FAFC',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 150ms ease',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--primary)' : '#E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <BookOpen size={18} color={isActive ? '#fff' : 'var(--text-muted)'} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    color: isActive ? 'var(--primary)' : 'var(--text-primary)',
                    marginBottom: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.courseCode} — {s.course}
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {[
                    { icon: MapPin, text: s.room },
                    { icon: Calendar, text: s.date },
                    { icon: Clock, text: s.time },
                  ].map(({ icon: Icon, text }) =>
                    text ? (
                      <span
                        key={text}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <Icon size={11} />
                        {text}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
              {isActive && (
                <div className="badge-live" style={{ flexShrink: 0 }}>
                  <span className="pulse-dot" />
                  <span>LIVE</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}