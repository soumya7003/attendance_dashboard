import { useState, useCallback, useRef } from 'react';

// ─── Hook ──────────────────────────────────────────────────────────────────────
import { useCourses } from '../../hooks/useCourses';

// ─── Page sub-components ───────────────────────────────────────────────────────
import CourseTable    from './components/CourseTable';
import AddCourseModal from './components/AddCourseModal';

// ─── Shared primitives ────────────────────────────────────────────────────────
import Button          from '../../components/ui/Button';
import Card            from '../../components/ui/Card';
import Input           from '../../components/ui/Input';
import Select          from '../../components/ui/Select';
import FilterBar       from '../../components/filters/FilterBar';
import FilterChips     from '../../components/filters/FilterChips';
import LoadingSpinner  from '../../components/shared/LoadingSpinner';
import EmptyState      from '../../components/shared/EmptyState';
import ErrorFallback   from '../../components/shared/ErrorFallback';

// ─── Constants ─────────────────────────────────────────────────────────────────
const DEPARTMENT_OPTIONS = [
  { label: 'All Departments', value: '' },
  { label: 'Science',             value: 'Science' },
  { label: 'Arts',                value: 'Arts' },
  { label: 'Engineering',         value: 'Engineering' },
  { label: 'Commerce',            value: 'Commerce' },
  { label: 'Mathematics',         value: 'Mathematics' },
  { label: 'Computer Science',    value: 'Computer Science' },
  { label: 'Information Technology', value: 'Information Technology' },
  { label: 'Electronics',         value: 'Electronics' },
  { label: 'Mechanical',          value: 'Mechanical' },
  { label: 'Civil',               value: 'Civil' },
];

const EMPTY_FILTERS = { department: '', minEnrolled: '', maxEnrolled: '' };

// Debounce delay (ms) for number inputs to avoid spamming the API.
const DEBOUNCE_MS = 400;

// ─── Helpers ───────────────────────────────────────────────────────────────────
/**
 * Build the list of active filter chips from current filter state.
 * Each chip has: { key, label, value }
 */
function buildChips(filters) {
  const chips = [];
  if (filters.department)  chips.push({ key: 'department',  label: `Dept: ${filters.department}` });
  if (filters.minEnrolled) chips.push({ key: 'minEnrolled', label: `Min Enrolled: ${filters.minEnrolled}` });
  if (filters.maxEnrolled) chips.push({ key: 'maxEnrolled', label: `Max Enrolled: ${filters.maxEnrolled}` });
  return chips;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Courses() {
  const { courses, loading, error, refetch } = useCourses();

  const [showFilters, setShowFilters] = useState(false);
  const [showModal,   setShowModal]   = useState(false);
  const [filters,     setFilters]     = useState(EMPTY_FILTERS);

  // Debounce timer ref for number inputs.
  const debounceTimer = useRef(null);

  // ─── Filter helpers ─────────────────────────────────────────────────────────
  const applyFilters = useCallback((nextFilters) => {
    refetch(nextFilters);
  }, [refetch]);

  const handleFilterChange = useCallback((field, value) => {
    const next = { ...filters, [field]: value };
    setFilters(next);

    const isNumber = field === 'minEnrolled' || field === 'maxEnrolled';
    if (isNumber) {
      // Debounce number inputs.
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => applyFilters(next), DEBOUNCE_MS);
    } else {
      // Apply immediately for selects.
      applyFilters(next);
    }
  }, [filters, applyFilters]);

  const removeFilter = useCallback((key) => {
    const next = { ...filters, [key]: '' };
    setFilters(next);
    applyFilters(next);
  }, [filters, applyFilters]);

  const clearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    applyFilters(EMPTY_FILTERS);
  }, [applyFilters]);

  // ─── Course added ────────────────────────────────────────────────────────────
  const handleCourseAdded = useCallback(() => {
    refetch(filters);
  }, [refetch, filters]);

  // ─── Derived ─────────────────────────────────────────────────────────────────
  const chips = buildChips(filters);
  const hasActiveFilters = chips.length > 0;

  // ─── Render helpers ──────────────────────────────────────────────────────────

  // Full-page loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  // Full-page error
  if (error) {
    return (
      <ErrorFallback
        message={error.message || 'Failed to load courses.'}
        onRetry={() => refetch(filters)}
      />
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div>

      {/* ── Page header ── */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Courses</h1>

        <Button onClick={() => setShowModal(true)}>
          + Add Course
        </Button>
      </div>

      {/* ── Filter toggle + active chips ── */}
      <div className="flex flex-wrap gap-2 mb-3 items-center">
        <Button
          variant="outline"
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
          aria-controls="courses-filter-bar"
        >
          {showFilters ? '🔼 Hide Filters' : '🔽 Filters'}
        </Button>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <FilterChips
            chips={chips}
            onRemove={(chip) => removeFilter(chip.key)}
            onClearAll={clearFilters}
          />
        )}
      </div>

      {/* ── Collapsible filter bar ── */}
      {showFilters && (
        <FilterBar id="courses-filter-bar">

          <Select
            label="Department"
            value={filters.department}
            onChange={(v) => handleFilterChange('department', v)}
            options={DEPARTMENT_OPTIONS}
          />

          <Input
            label="Min Enrolled"
            type="number"
            min={0}
            placeholder="e.g. 10"
            value={filters.minEnrolled}
            onChange={(v) => handleFilterChange('minEnrolled', v)}
          />

          <Input
            label="Max Enrolled"
            type="number"
            min={0}
            placeholder="e.g. 100"
            value={filters.maxEnrolled}
            onChange={(v) => handleFilterChange('maxEnrolled', v)}
          />

          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>

        </FilterBar>
      )}

      {/* ── Course table (empty state handled inside) ── */}
      {courses.length === 0 ? (
        <EmptyState
          title="No courses found"
          subtitle="Create your first course to get started."
          action={
            <Button onClick={() => setShowModal(true)}>
              + Add Course
            </Button>
          }
        />
      ) : (
        <Card>
          <CourseTable data={courses} />
        </Card>
      )}

      {/* ── Add Course modal ── */}
      <AddCourseModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleCourseAdded}
      />

    </div>
  );
}