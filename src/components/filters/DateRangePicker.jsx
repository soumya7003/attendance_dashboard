import PropTypes from 'prop-types';
import { Calendar } from 'lucide-react';

export const DateRangePicker = ({ startDate, endDate, onStartChange, onEndChange }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartChange(e.target.value)}
          className="input pl-9 h-9 w-36 text-sm"
        />
      </div>
      <span className="text-muted text-xs">to</span>
      <div className="relative">
        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndChange(e.target.value)}
          className="input pl-9 h-9 w-36 text-sm"
        />
      </div>
    </div>
  );
};

DateRangePicker.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onStartChange: PropTypes.func.isRequired,
  onEndChange: PropTypes.func.isRequired,
};