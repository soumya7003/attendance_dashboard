import React from 'react';
import PropTypes from 'prop-types';

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }[size];

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClass} border-2 border-primary border-t-transparent rounded-full animate-spin`}
        style={{ borderWidth: size === 'sm' ? '2px' : '3px' }}
      />
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};