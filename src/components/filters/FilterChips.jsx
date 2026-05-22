import PropTypes from 'prop-types';
import { X } from 'lucide-react';

export const FilterChips = ({ filters, onRemove }) => {
  if (!filters || filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter, idx) => (
        <div
          key={idx}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs"
        >
          <span>{filter.label}</span>
          <button
            onClick={() => onRemove(filter.id)}
            className="hover:text-danger transition"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
};

FilterChips.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onRemove: PropTypes.func.isRequired,
};