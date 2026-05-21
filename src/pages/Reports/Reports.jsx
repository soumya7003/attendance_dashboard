import { useState } from 'react';
import { useAttendance } from '../../hooks/useAttendance';
import { DataTable } from '../../components/table/DataTable';
import { DateRangePicker } from '../../components/filters/DateRangePicker';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/stats/StatCard';
import { Users, UserCheck, Clock, UserX } from 'lucide-react';

const columns = [
  { header: 'Student', accessor: 'studentName' },
  { header: 'Course', accessor: 'courseName' },
  { header: 'Status', accessor: 'status', cell: (row) => <Badge status={row.status}>{row.status}</Badge> },
  { header: 'Date', accessor: 'timestamp', cell: (row) => new Date(row.timestamp).toLocaleDateString() },
];

export default function Reports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { attendance, loading, stats } = useAttendance({ startDate, endDate });

  const total = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'present').length;
  const lateCount = attendance.filter(a => a.status === 'late').length;
  const absentCount = attendance.filter(a => a.status === 'absent').length;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Reports</h1><p className="text-secondary">Attendance analytics</p></div>
      <DateRangePicker startDate={startDate} endDate={endDate} onStartChange={setStartDate} onEndChange={setEndDate} />
      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Records" value={total} icon={Users} color="primary" />
        <StatCard title="Present" value={presentCount} icon={UserCheck} color="success" />
        <StatCard title="Late" value={lateCount} icon={Clock} color="warning" />
        <StatCard title="Absent" value={absentCount} icon={UserX} color="danger" />
      </div>
      <Card className="p-0 overflow-hidden"><DataTable columns={columns} data={attendance} loading={loading} /></Card>
    </div>
  );
}