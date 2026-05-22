import { useState } from 'react';
import { useAttendance } from '../../hooks/useAttendance';
import { DataTable } from '../../components/table/DataTable';
import { DateRangePicker } from '../../components/filters/DateRangePicker';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/stats/StatCard';
import { Users, UserCheck, Clock, UserX, Download, Filter, BarChart3, TrendingUp } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

const columns = [
  { 
    header: 'Student', 
    accessor: 'studentName',
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
          {row.studentName.charAt(0)}
        </div>
        <span className="font-medium text-primary">{row.studentName}</span>
      </div>
    )
  },
  { 
    header: 'Course', 
    accessor: 'courseName',
    cell: (row) => (
      <span className="text-secondary font-medium">{row.courseName}</span>
    )
  },
  { 
    header: 'Status', 
    accessor: 'status', 
    cell: (row) => <Badge status={row.status}>{row.status}</Badge> 
  },
  { 
    header: 'Date', 
    accessor: 'timestamp', 
    cell: (row) => (
      <span className="text-secondary">{new Date(row.timestamp).toLocaleDateString()}</span>
    )
  },
  { 
    header: 'Time', 
    accessor: 'timestamp', 
    cell: (row) => (
      <span className="text-muted text-sm">{new Date(row.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    )
  },
];

export default function Reports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { attendance, loading, stats } = useAttendance({ startDate, endDate });

  const total = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'present').length;
  const lateCount = attendance.filter(a => a.status === 'late').length;
  const absentCount = attendance.filter(a => a.status === 'absent').length;
  const attendanceRate = total > 0 ? ((presentCount / total) * 100).toFixed(1) : 0;

  const handleExport = () => {
    // Export functionality
    console.log('Exporting report...');
  };

  return (
    <div className="reports-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Attendance Reports</h1>
          <p className="text-secondary text-base">Comprehensive analytics and insights</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={18} />
            <span>Advanced Filters</span>
          </button>
          <button className="btn-primary flex items-center gap-2" onClick={handleExport}>
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="glass-card-sm mb-6">
        <DateRangePicker 
          startDate={startDate} 
          endDate={endDate} 
          onStartChange={setStartDate} 
          onEndChange={setEndDate} 
        />
      </div>

      {/* Stats Grid */}
      <div className="grid-stats mb-6">
        <div className="stat-card stat-card-primary">
          <div className="stat-card-content">
            <div className="stat-card-icon stat-card-icon-primary">
              <Users size={22} />
            </div>
            <div className="stat-card-data">
              <div className="stat-label">Total Records</div>
              <div className="stat-number">{total.toLocaleString()}</div>
              <div className="stat-trend">
                <TrendingUp size={14} />
                <span>All time data</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-card-content">
            <div className="stat-card-icon stat-card-icon-success">
              <UserCheck size={22} />
            </div>
            <div className="stat-card-data">
              <div className="stat-label">Present</div>
              <div className="stat-number">{presentCount.toLocaleString()}</div>
              <div className="stat-trend success">
                <TrendingUp size={14} />
                <span>{attendanceRate}% rate</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-card-content">
            <div className="stat-card-icon stat-card-icon-warning">
              <Clock size={22} />
            </div>
            <div className="stat-card-data">
              <div className="stat-label">Late Arrivals</div>
              <div className="stat-number">{lateCount.toLocaleString()}</div>
              <div className="stat-trend warning">
                <span>{total > 0 ? ((lateCount / total) * 100).toFixed(1) : 0}% of total</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-danger">
          <div className="stat-card-content">
            <div className="stat-card-icon stat-card-icon-danger">
              <UserX size={22} />
            </div>
            <div className="stat-card-data">
              <div className="stat-label">Absent</div>
              <div className="stat-number">{absentCount.toLocaleString()}</div>
              <div className="stat-trend danger">
                <span>{total > 0 ? ((absentCount / total) * 100).toFixed(1) : 0}% of total</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="glass-card mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="stat-card-icon stat-card-icon-primary">
            <BarChart3 size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-primary">Quick Insights</h3>
            <p className="text-sm text-muted">Key metrics at a glance</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="insight-item">
            <div className="insight-label">Attendance Rate</div>
            <div className="insight-value success">{attendanceRate}%</div>
          </div>
          <div className="insight-item">
            <div className="insight-label">Average Daily</div>
            <div className="insight-value primary">{Math.round(total / 30)}</div>
          </div>
          <div className="insight-item">
            <div className="insight-label">Punctuality Score</div>
            <div className="insight-value warning">
              {total > 0 ? (100 - (lateCount / total) * 100).toFixed(1) : 0}%
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <Card className="p-0 overflow-hidden">
        <div className="table-header">
          <h3 className="font-semibold text-primary">Attendance Records</h3>
          <p className="text-sm text-muted">{total} total entries</p>
        </div>
        <DataTable columns={columns} data={attendance} loading={loading} />
      </Card>
    </div>
  );
}