import PropTypes from 'prop-types';

export const StatCard = ({ title, value, icon: Icon, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
  };

  return (
    <div className="glass-card p-5 hover:transform hover:-translate-y-1 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-label text-muted mb-1">{title}</p>
          <p className="stat-number text-3xl font-extrabold">{value}</p>
          {trend && (
            <p className="text-xs text-muted mt-2">
              <span className={trend > 0 ? 'text-success' : 'text-danger'}>
                {trend > 0 ? `+${trend}` : trend}%
              </span>{' '}
              from last session
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
  trend: PropTypes.number,
  color: PropTypes.oneOf(['primary', 'success', 'warning', 'danger']),
};