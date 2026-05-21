import { useNotifications } from '../../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import { CheckCheck, BellOff, UserCheck, AlertTriangle, Info, XCircle } from 'lucide-react';

const typeIcon = {
  tap: UserCheck,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

export function NotificationDropdown({ onClose }) {
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotifications();

  const handleMarkAsRead = (id) => {
    markAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleClearAll = () => {
    clearAll();
  };

  return (
    <div className="dropdown-menu w-80 max-h-96 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-glass-border">
        <h4 className="text-sm font-semibold">Notifications</h4>
        <div className="flex gap-1">
          <button
            onClick={handleMarkAllAsRead}
            className="p-1 rounded hover:bg-glass-bg text-muted hover:text-primary transition"
            title="Mark all as read"
          >
            <CheckCheck size={14} />
          </button>
          <button
            onClick={handleClearAll}
            className="p-1 rounded hover:bg-glass-bg text-muted hover:text-danger transition"
            title="Clear all"
          >
            <BellOff size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="empty-state py-8">
            <BellOff size={32} className="text-muted mb-2" />
            <p className="text-xs text-muted">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-glass-border">
            {notifications.map((notif) => {
              const Icon = typeIcon[notif.type] || Info;
              const timeAgo = formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true });
              return (
                <div
                  key={notif.id}
                  className={`px-3 py-2 hover:bg-glass-bg transition cursor-pointer ${
                    !notif.read ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => handleMarkAsRead(notif.id)}
                >
                  <div className="flex gap-2">
                    <Icon size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-primary break-words">{notif.message}</p>
                      <p className="text-[10px] text-muted mt-1">{timeAgo}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="px-3 py-2 border-t border-glass-border text-center">
          <button onClick={onClose} className="text-xs text-muted hover:text-primary transition">
            Close
          </button>
        </div>
      )}
    </div>
  );
}