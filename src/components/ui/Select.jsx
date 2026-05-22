import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'lucide-react';

const Select = ({ label, options = [], value, onChange, error, placeholder, className = '', ...props }) => {

  const handleChange = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={handleChange}
          className={`input appearance-none ${error ? 'input-error' : ''} ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted"
          size={16}
        />
      </div>
      {error && <div className="input-hint error">{error}</div>}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any, label: PropTypes.string })),
  value: PropTypes.any,
  onChange: PropTypes.func,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export { Select };
export default Select;