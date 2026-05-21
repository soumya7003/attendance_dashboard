import { useAttendanceContext } from '../../context/AttendanceContext';
import { useNotifications } from '../../context/NotificationContext';
import { useWebSocket } from '../../hooks/useWebSocket';
import { DataTable } from '../../components/table/DataTable';
import { StatCard } from '../../components/stats/StatCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Users, UserCheck, Clock, UserX, Wifi, WifiOff } from 'lucide-react';
import { useState } from 'react';

const columns = [
  { header: 'Roll No', accessor: 'roll' },
  { header: 'Name', accessor: 'name' },
  {
    header: 'Status',
    accessor: 'status',
    cell: (row) => <Badge status={row.status}>{row.status}</Badge>,
  },
  { header: 'Time', accessor: 'time', cell: (row) => row.time || '—' },
];

export default function LiveMonitor() {
  const { activeSession, liveRecords, stats, recordTap, isSessionActive } =
    useAttendanceContext();
  const { addNotification } = useNotifications();
  const { isConnected } = useWebSocket(activeSession?.id);
  const [simulateRoll, setSimulateRoll] = useState('');

  const handleSimulateTap = () => {
    if (!simulateRoll) return;
    const mockStudent = {
      roll: simulateRoll,
      name: `Student ${simulateRoll}`,
      status: 'present',
      time: new Date().toLocaleTimeString(),
    };
    recordTap(mockStudent);
    addNotification({
      type: 'tap',
      message: `${mockStudent.name} tapped in for ${activeSession?.courseCode}`,
    });
    setSimulateRoll('');
  };

  if (!isSessionActive) {
    return (
      <Card className="text-center py-12">
        <WifiOff className="mx-auto text-muted mb-2" size={32} />
        <p className="text-muted">No active session. Start a session from the Sessions page.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Live Monitor</h1>
          <p className="text-secondary text-sm mt-1">
            {activeSession?.course} • {activeSession?.room} • {activeSession?.date}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isConnected ? (
            <div className="flex items-center gap-2 text-success text-sm">
              <Wifi size={14} />
              <span>Real‑time connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted text-sm">
              <WifiOff size={14} />
              <span>Mock mode</span>
            </div>
          )}
          <div className="badge-live">
            <span className="pulse-dot" />
            <span>LIVE</span>
          </div>
        </div>
      </div>

      {/* Stat cards — minmax so they never overflow on narrow viewports */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'var(--space-4, 1rem)',
        }}
      >
        <StatCard title="Present"  value={stats.present}  icon={UserCheck} color="success"  />
        <StatCard title="Late"     value={stats.late}     icon={Clock}     color="warning"  />
        <StatCard title="Absent"   value={stats.absent}   icon={UserX}     color="danger"   />
        <StatCard title="Enrolled" value={stats.enrolled} icon={Users}     color="primary"  />
      </div>

      {/* Live records table */}
      <Card variant="default" className="p-0 overflow-hidden">
        <DataTable
          columns={columns}
          data={liveRecords}
          emptyMessage="No taps yet. Waiting for students…"
        />
      </Card>

      {/* Simulate tap */}
      <Card variant="sm" className="flex gap-4 items-end">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Roll number (e.g., S001)"
            className="input"
            value={simulateRoll}
            onChange={(e) => setSimulateRoll(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSimulateTap()}
          />
        </div>
        <Button onClick={handleSimulateTap} disabled={!simulateRoll}>
          Simulate Tap
        </Button>
      </Card>
    </div>
  );
}