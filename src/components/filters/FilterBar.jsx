import PropTypes from 'prop-types';
import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const FilterBar = ({ children, activeFilters = 0, onClearAll }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card-sm mb-4">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted" />
          <span className="text-sm font-medium">Filters</span>
          {activeFilters > 0 && (
            <span className="badge badge-info text-xs">{activeFilters} active</span>
          )}
        </div>
        <div className="flex gap-2">
          {activeFilters > 0 && onClearAll && (
            <Button size="sm" variant="ghost" onClick={onClearAll}>
              Clear all
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {expanded && (
        <div className="p-3 pt-0 border-t border-glass-border mt-2">
          <div className="flex flex-wrap gap-4">{children}</div>
        </div>
      )}
    </div>
  );
};

FilterBar.propTypes = {
  children: PropTypes.node,
  activeFilters: PropTypes.number,
  onClearAll: PropTypes.func,
};