import { Bell } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

export function NotificationBell({ onClick, className = '' }) {
  const { unreadCount } = useNotifications();

  return (
    <button
      onClick={onClick}
      className={`relative p-1 rounded-md hover:bg-glass-bg transition-colors ${className}`}
      aria-label="Notifications"
    >
      <Bell size={20} className="text-secondary" />
      {unreadCount > 0 && (
        <span className="notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
      )}
    </button>
  );
}