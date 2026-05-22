import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

export function AttendanceChart({ data }) {
  // Calculate weekly trends
  const weeklyData = calculateWeeklyTrends(data);
  const maxValue = Math.max(...weeklyData.map(d => d.total));

  return (
    <div className="glass-card">
      <div className="chart-header">
        <div className="flex items-center gap-3">
          <div className="stat-card-icon stat-card-icon-primary">
            <BarChart3 size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-primary">Weekly Trends</h3>
            <p className="text-sm text-muted">Last 4 weeks attendance overview</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar size={16} className="text-muted" />
          <span className="text-secondary font-medium">Past Month</span>
        </div>
      </div>

      <div className="chart-container">
        {weeklyData.map((week, index) => (
          <div key={index} className="chart-bar-group">
            <div className="chart-bars">
              <div 
                className="chart-bar present"
                style={{ height: `${(week.present / maxValue) * 100}%` }}
                title={`${week.present} Present`}
              >
                <span className="chart-value">{week.present}</span>
              </div>
              <div 
                className="chart-bar late"
                style={{ height: `${(week.late / maxValue) * 100}%` }}
                title={`${week.late} Late`}
              >
                <span className="chart-value">{week.late}</span>
              </div>
              <div 
                className="chart-bar absent"
                style={{ height: `${(week.absent / maxValue) * 100}%` }}
                title={`${week.absent} Absent`}
              >
                <span className="chart-value">{week.absent}</span>
              </div>
            </div>
            <div className="chart-label">Week {index + 1}</div>
          </div>
        ))}
      </div>

      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-dot success"></div>
          <span>Present</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot warning"></div>
          <span>Late</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot danger"></div>
          <span>Absent</span>
        </div>
      </div>
    </div>
  );
}

function calculateWeeklyTrends(data) {
  // Mock data for demonstration - replace with actual calculation
  return [
    { week: 1, present: 145, late: 23, absent: 12, total: 180 },
    { week: 2, present: 158, late: 18, absent: 9, total: 185 },
    { week: 3, present: 162, late: 15, absent: 8, total: 185 },
    { week: 4, present: 170, late: 12, absent: 6, total: 188 },
  ];
}

// Add corresponding CSS
const styles = `
.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.chart-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: var(--space-4);
  height: 240px;
  padding: var(--space-4) 0;
  border-bottom: 2px solid #E2E8F0;
  margin-bottom: var(--space-4);
}

.chart-bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.chart-bars {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
  height: 100%;
}

.chart-bar {
  flex: 1;
  max-width: 40px;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  position: relative;
  transition: all var(--transition-base);
  cursor: pointer;
  min-height: 20px;
}

.chart-bar:hover {
  opacity: 0.8;
  transform: translateY(-4px);
}

.chart-bar.present {
  background: linear-gradient(180deg, var(--success) 0%, #059669 100%);
  box-shadow: 0 -2px 12px rgba(5, 150, 105, 0.3);
}

.chart-bar.late {
  background: linear-gradient(180deg, var(--warning) 0%, #D97706 100%);
  box-shadow: 0 -2px 12px rgba(217, 119, 6, 0.3);
}

.chart-bar.absent {
  background: linear-gradient(180deg, var(--danger) 0%, #DC2626 100%);
  box-shadow: 0 -2px 12px rgba(220, 38, 38, 0.3);
}

.chart-value {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-primary);
  opacity: 0;
  transition: opacity var(--transition-base);
}

.chart-bar:hover .chart-value {
  opacity: 1;
}

.chart-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-align: center;
}

.chart-legend {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
}

.legend-dot.success {
  background: var(--success);
}

.legend-dot.warning {
  background: var(--warning);
}

.legend-dot.danger {
  background: var(--danger);
}
`;