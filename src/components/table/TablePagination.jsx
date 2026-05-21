import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const TablePagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });
    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-glass-border">
      <div className="text-sm text-muted">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          icon={ChevronLeft}
        />
        {getPageNumbers().map((page, idx) => (
          <Button
            key={idx}
            size="sm"
            variant={page === currentPage ? 'primary' : 'outline'}
            disabled={page === '...'}
            onClick={() => typeof page === 'number' && onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          icon={ChevronRight}
        />
      </div>
    </div>
  );
};

TablePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};