import PropTypes from 'prop-types';

export const StatGrid = ({ children, columns = 4 }) => {
  const gridClass = {
    2: 'grid-2',
    3: 'grid-3',
    4: 'grid-stats',
  }[columns] || 'grid-stats';

  return <div className={gridClass}>{children}</div>;
};

StatGrid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.oneOf([2, 3, 4]),
};