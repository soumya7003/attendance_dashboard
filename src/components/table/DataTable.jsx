import PropTypes from 'prop-types';
import { TableSkeleton } from './TableSkeleton';
import { EmptyState } from '../shared/EmptyState';
import { TablePagination } from './TablePagination';

export const DataTable = ({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  pagination,
  onPageChange,
  className = '',
}) => {
  if (loading) {
    return <TableSkeleton rows={5} columns={columns.length} />;
  }

  if (!data || data.length === 0) {
    return <EmptyState description={emptyMessage} />;
  }

  return (
    <div className="space-y-4">
      <div className="table-wrapper">
        <table className={`table ${className}`}>
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{ width: col.width }}
                  className={col.className}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? 'cursor-pointer' : ''}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx}>
                    {col.cell ? col.cell(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <TablePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.node.isRequired,
      accessor: PropTypes.string,
      cell: PropTypes.func,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      className: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.array,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  onRowClick: PropTypes.func,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  onPageChange: PropTypes.func,
  className: PropTypes.string,
};