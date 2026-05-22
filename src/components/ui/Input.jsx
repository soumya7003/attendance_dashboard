import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  label,
  type = 'text',
  error,
  hint,
  icon: Icon,
  className = '',
  wrapperClassName = '',
  ...props
}) => {
  return (
    <div className={`input-wrapper ${wrapperClassName}`}>
      {label && <label className="input-label">{label}</label>}
      <div className={Icon ? 'input-with-icon' : ''}>
        {Icon && <Icon className="input-icon" size={16} />}
        <input
          type={type}
          className={`input ${error ? 'input-error' : ''} ${className}`}
          {...props}
        />
      </div>
      {hint && <div className={`input-hint ${error ? 'error' : ''}`}>{error || hint}</div>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  hint: PropTypes.string,
  icon: PropTypes.elementType,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
};