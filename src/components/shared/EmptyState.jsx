import React from 'react';
import PropTypes from 'prop-types';
import { Inbox } from 'lucide-react';

export const EmptyState = ({ title = 'No data', description = 'No items to display', icon: Icon = Inbox, action }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={24} />
      </div>
      <h4 className="text-base font-semibold text-primary">{title}</h4>
      <p className="text-sm text-muted">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.elementType,
  action: PropTypes.node,
};