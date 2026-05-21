import React from 'react';
import PropTypes from 'prop-types';

/**
 * Badge component for status pills (present/late/absent/online/offline/etc.)
 * Uses CSS classes: .badge, .badge-present, .badge-late, .badge-absent, etc.
 */
export const Badge = ({ status, children, showDot = true, className = '' }) => {
  const statusClass = {
    present: 'badge-present',
    late: 'badge-late',
    absent: 'badge-absent',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    online: 'badge-online',
    offline: 'badge-offline',
    info: 'badge-info',
    primary: 'badge-primary',
  }[status] || 'badge-info';

  return (
    <span className={`badge ${statusClass} ${className}`}>
      {showDot && <span className={`badge-dot ${statusClass}`} />}
      {children || status}
    </span>
  );
};

Badge.propTypes = {
  status: PropTypes.oneOf(['present', 'late', 'absent', 'success', 'warning', 'danger', 'online', 'offline', 'info', 'primary']),
  children: PropTypes.node,
  showDot: PropTypes.bool,
  className: PropTypes.string,
};