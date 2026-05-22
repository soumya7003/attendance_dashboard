import { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const DEPARTMENTS = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Electronics'];

/**
 * StudentSearch — search bar + department & status selects.
 *
 * Props:
 *   search          string
 *   onSearchChange  (value: string) => void
 *   department      string
 *   status          string
 *   onFilterChange  (key: 'department' | 'enrollmentStatus', value: string) => void
 *   autoFocus?      boolean
 */
export function StudentSearch({
  search,
  onSearchChange,
  department,
  status,
  onFilterChange,
  autoFocus = false,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Search input */}
      <div className="relative flex-1" style={{ minWidth: 220, maxWidth: 420 }}>
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          size={15}
        />
        <input
          ref={inputRef}
          type="text"
          className="input pl-9 pr-8 h-9 w-full"
          placeholder="Search by name, roll, email…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Department filter */}
      <select
        className="input h-9"
        style={{ minWidth: 160 }}
        value={department}
        onChange={(e) => onFilterChange('department', e.target.value)}
      >
        <option value="">All Departments</option>
        {DEPARTMENTS.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {/* Status filter */}
      <select
        className="input h-9"
        style={{ minWidth: 130 }}
        value={status}
        onChange={(e) => onFilterChange('enrollmentStatus', e.target.value)}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}