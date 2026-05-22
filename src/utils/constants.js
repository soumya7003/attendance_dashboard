// Attendance status constants
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  LATE: 'late',
  ABSENT: 'absent',
};

// Device status
export const DEVICE_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  MAINTENANCE: 'maintenance',
};

// Enrollment status
export const ENROLLMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  GRADUATED: 'graduated',
};

// Color maps for badges (uses CSS classes from your design system)
export const STATUS_COLORS = {
  present: 'badge-present',
  late: 'badge-late',
  absent: 'badge-absent',
  online: 'badge-online',
  offline: 'badge-offline',
  maintenance: 'badge-warning',
  active: 'badge-success',
  inactive: 'badge-danger',
  graduated: 'badge-info',
  default: 'badge-info',
};

// Notification types
export const NOTIFICATION_TYPES = {
  TAP: 'tap',
  WARNING: 'warning',
  INFO: 'info',
  ERROR: 'error',
};