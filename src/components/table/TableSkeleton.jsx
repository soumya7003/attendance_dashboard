import PropTypes from 'prop-types';

export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {Array(columns).fill().map((_, i) => (
              <th key={i}>
                <div className="skeleton h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(rows).fill().map((_, rowIdx) => (
            <tr key={rowIdx}>
              {Array(columns).fill().map((_, colIdx) => (
                <td key={colIdx}>
                  <div className="skeleton h-6 w-full rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TableSkeleton.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
};