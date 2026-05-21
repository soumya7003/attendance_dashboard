import { useAttendanceContext } from '../../context/AttendanceContext';
import { useNotifications } from '../../context/NotificationContext';
import { useWebSocket } from '../../hooks/useWebSocket';
import { Card } from '../../components/ui/Card';
import { WifiOff } from 'lucide-react';
import SessionSelector from './components/SessionSelector';
import LiveTable from './components/LiveTable';
import TapSimulator from './components/TapSimulator';
import { StatCard } from '../../components/stats/StatCard';
import { Users, UserCheck, Clock, UserX, Wifi } from 'lucide-react';

export default function LiveMonitor() {
  const { activeSession, liveRecords, stats, recordTap, isSessionActive } =
    useAttendanceContext();
  const { addNotification } = useNotifications();
  const { isConnected } = useWebSocket(activeSession?.id);

  if (!isSessionActive) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div className="glass-card text-center" style={{ maxWidth: 420, width: '100%' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-xl)',
              background: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)',
            }}
          >
            <WifiOff size={28} color="var(--primary)" />
          </div>
          <h3 style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: 8 }}>
            No Active Session
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Go to the <strong style={{ color: 'var(--primary)' }}>Sessions</strong> page to start a session and begin tracking attendance in real time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 page-content">
      {/* ── Page header ─────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Live Monitor
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 4 }}>
            {activeSession?.course} &nbsp;·&nbsp; {activeSession?.room} &nbsp;·&nbsp; {activeSession?.date}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isConnected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)', fontSize: '0.8125rem', fontWeight: 500 }}>
              <Wifi size={14} />
              <span>Real-time connected</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
              <WifiOff size={14} />
              <span>Mock mode</span>
            </div>
          )}
          <div className="badge-live">
            <span className="pulse-dot" />
            <span>LIVE</span>
            {activeSession?.courseCode && (
              <span style={{ fontWeight: 400, fontSize: '0.75rem' }}>{activeSession.courseCode}</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Stat cards ──────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 'var(--space-4)',
      }}>
        <StatCard title="Present"  value={stats.present}  icon={UserCheck} color="success" />
        <StatCard title="Late"     value={stats.late}     icon={Clock}     color="warning" />
        <StatCard title="Absent"   value={stats.absent}   icon={UserX}     color="danger"  />
        <StatCard title="Enrolled" value={stats.enrolled} icon={Users}     color="primary" />
      </div>

      {/* ── Live table ───────────────────────────────── */}
      <LiveTable records={liveRecords} />

      {/* ── Simulate tap ─────────────────────────────── */}
      <TapSimulator
        activeSession={activeSession}
        onTap={(student) => {
          recordTap(student);
          addNotification({
            type: 'tap',
            message: `${student.name} tapped in for ${activeSession?.courseCode}`,
          });
        }}
      />
    </div>
  );
}