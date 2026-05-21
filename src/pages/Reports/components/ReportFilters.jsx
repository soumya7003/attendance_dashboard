import { useState } from 'react';
import { Filter, X, Search } from 'lucide-react';

export function ReportFilters({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    course: 'all',
    searchTerm: ''
  });

  const handleApplyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters = {
      status: 'all',
      course: 'all',
      searchTerm: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="filter-container">
      <button 
        className="btn-secondary flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={18} />
        <span>Filters</span>
        {Object.values(filters).filter(v => v !== 'all' && v !== '').length > 0 && (
          <span className="filter-badge">{Object.values(filters).filter(v => v !== 'all' && v !== '').length}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="filter-overlay" onClick={() => setIsOpen(false)} />
          <div className="filter-panel">
            <div className="filter-header">
              <h3 className="font-semibold text-primary">Advanced Filters</h3>
              <button 
                className="icon-btn"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="filter-body">
              {/* Search */}
              <div className="filter-group">
                <label className="filter-label">Search Student</label>
                <div className="search-wrapper">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Enter student name..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="filter-group">
                <label className="filter-label">Attendance Status</label>
                <select
                  className="filter-select"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="all">All Statuses</option>
                  <option value="present">Present</option>
                  <option value="late">Late</option>
                  <option value="absent">Absent</option>
                </select>
              </div>

              {/* Course Filter */}
              <div className="filter-group">
                <label className="filter-label">Course</label>
                <select
                  className="filter-select"
                  value={filters.course}
                  onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                >
                  <option value="all">All Courses</option>
                  <option value="math">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                </select>
              </div>
            </div>

            <div className="filter-footer">
              <button className="btn-ghost" onClick={handleReset}>
                Reset All
              </button>
              <button className="btn-primary" onClick={handleApplyFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Corresponding CSS
const styles = `
.filter-container {
  position: relative;
}

.filter-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: var(--primary);
  color: #FFFFFF;
  border-radius: var(--radius-full);
  font-size: 0.6875rem;
  font-weight: 700;
}

.filter-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(2px);
  z-index: var(--z-overlay);
  animation: fadeIn 200ms ease-out;
}

.filter-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 360px;
  background: #FFFFFF;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--glass-shadow-lg);
  z-index: calc(var(--z-overlay) + 1);
  animation: slideDown 250ms ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--glass-border);
}

.filter-body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.filter-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.search-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.filter-input {
  width: 100%;
  height: 40px;
  padding: 0 var(--space-3) 0 36px;
  background: #F8FAFC;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.filter-input:focus {
  outline: none;
  background: #FFFFFF;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-subtle);
}

.filter-select {
  width: 100%;
  height: 40px;
  padding: 0 var(--space-3);
  background: #F8FAFC;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-select:focus {
  outline: none;
  background: #FFFFFF;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-subtle);
}

.filter-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-6);
  border-top: 1px solid var(--glass-border);
  background: #F8FAFC;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
}

.btn-ghost {
  padding: 8px 16px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-ghost:hover {
  background: #E2E8F0;
  color: var(--text-primary);
}

.icon-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.icon-btn:hover {
  background: #F1F5F9;
  color: var(--text-primary);
}

@media (max-width: 599px) {
  .filter-panel {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }
}
`;