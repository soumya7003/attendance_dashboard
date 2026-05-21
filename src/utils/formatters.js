/**
 * Format a date to a readable string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '—';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
};

/**
 * Format a time (e.g., "09:00 AM")
 */
export const formatTime = (date) => {
  if (!date) return '—';
  const d = new Date(date);
  return d.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format a percentage (e.g., 85.5 → "85.5%")
 */
export const formatPercentage = (value) => {
  if (value === null || value === undefined) return '—';
  return `${Math.round(value * 10) / 10}%`;
};

/**
 * Format student name (capitalize each part)
 */
export const formatName = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
};