import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ children, variant = 'default', className = '', ...props }) => {
  const variantClass = {
    default: 'glass-card',
    sm: 'glass-card-sm',
    interactive: 'glass-card interactive',
  }[variant];

  return (
    <div className={`${variantClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'sm', 'interactive']),
  className: PropTypes.string,
};