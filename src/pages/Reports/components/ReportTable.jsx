import { Download, Mail, Phone, MoreVertical } from 'lucide-react';

export function ReportTable({ data, loading }) {
  if (loading) {
    return <TableSkeleton />;
  }

  if (!data || data.length === 0) {
    return <EmptyTableState />;
  }

  return (
    <div className="report-table-wrapper">
      <table className="report-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Status</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="table-row">
              <td>
                <div className="student-cell">
                  <div className="student-avatar">
                    {record.studentName.charAt(0)}
                  </div>
                  <div className="student-info">
                    <div className="student-name">{record.studentName}</div>
                    <div className="student-id">ID: {record.studentId || `STU${1000 + index}`}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="course-cell">
                  <span className="course-name">{record.courseName}</span>
                  <span className="course-code">{record.courseCode || 'CS101'}</span>
                </div>
              </td>
              <td>
                <span className={`status-badge status-${record.status}`}>
                  <span className="status-dot"></span>
                  {record.status}
                </span>
              </td>
              <td>
                <div className="date-cell">
                  {new Date(record.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </td>
              <td>
                <div className="time-cell">
                  {new Date(record.timestamp).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </td>
              <td>
                <div className="actions-cell">
                  <button className="action-btn" title="Send Email">
                    <Mail size={16} />
                  </button>
                  <button className="action-btn" title="Call">
                    <Phone size={16} />
                  </button>
                  <button className="action-btn" title="More">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="table-skeleton">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton skeleton-avatar"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-badge"></div>
          <div className="skeleton skeleton-text-sm"></div>
        </div>
      ))}
    </div>
  );
}

function EmptyTableState() {
  return (
    <div className="empty-table-state">
      <div className="empty-icon">📊</div>
      <h3 className="empty-title">No Records Found</h3>
      <p className="empty-description">
        Try adjusting your filters or date range to see attendance records.
      </p>
    </div>
  );
}

// Corresponding CSS
const styles = `
.report-table-wrapper {
  overflow-x: auto;
  border-radius: var(--radius-xl);
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.report-table thead {
  background: linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%);
  border-bottom: 2px solid var(--glass-border);
}

.report-table th {
  padding: var(--space-4) var(--space-5);
  text-align: left;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  white-space: nowrap;
}

.report-table tbody tr {
  border-bottom: 1px solid #F1F5F9;
  transition: all var(--transition-fast);
}

.report-table tbody tr:hover {
  background: #F8FAFC;
}

.report-table td {
  padding: var(--space-4) var(--space-5);
  vertical-align: middle;
}

/* Student Cell */
.student-cell {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.student-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.student-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.student-name {
  font-weight: 600;
  color: var(--text-primary);
}

.student-id {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Course Cell */
.course-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.course-name {
  font-weight: 500;
  color: var(--text-secondary);
}

.course-code {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: 'Courier New', monospace;
}

/* Status Badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.status-present {
  background: var(--success-bg);
  color: var(--success);
  border: 1px solid var(--success-border);
}

.status-present .status-dot {
  background: var(--success);
}

.status-late {
  background: var(--warning-bg);
  color: var(--warning);
  border: 1px solid var(--warning-border);
}

.status-late .status-dot {
  background: var(--warning);
}

.status-absent {
  background: var(--danger-bg);
  color: var(--danger);
  border: 1px solid var(--danger-border);
}

.status-absent .status-dot {
  background: var(--danger);
}

/* Date & Time Cells */
.date-cell {
  color: var(--text-secondary);
  font-weight: 500;
}

.time-cell {
  color: var(--text-muted);
  font-size: 0.8125rem;
}

/* Actions Cell */
.actions-cell {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-btn:hover {
  background: #F1F5F9;
  border-color: var(--glass-border);
  color: var(--primary);
}

/* Empty State */
.empty-table-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16) var(--space-6);
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.empty-description {
  color: var(--text-muted);
  max-width: 400px;
}

/* Skeleton Loading */
.table-skeleton {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.skeleton-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.skeleton {
  background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
}

.skeleton-text {
  height: 16px;
  flex: 1;
}

.skeleton-text-sm {
  height: 12px;
  width: 80px;
}

.skeleton-badge {
  height: 24px;
  width: 80px;
  border-radius: var(--radius-full);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Responsive */
@media (max-width: 767px) {
  .report-table th,
  .report-table td {
    padding: var(--space-3) var(--space-4);
  }
  
  .student-avatar {
    width: 36px;
    height: 36px;
    font-size: 0.8125rem;
  }
  
  .actions-cell {
    gap: 2px;
  }
  
  .action-btn {
    width: 28px;
    height: 28px;
  }
}
`;