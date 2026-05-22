import { useNotifications } from '../../context/NotificationContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/shared/EmptyState';
import { BellOff, CheckCheck, Trash2, UserCheck, AlertTriangle, Info, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const typeIcon = {
  tap: UserCheck,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gradient">Notifications</h1>
          <p className="text-secondary text-sm mt-1">Stay updated with attendance events and alerts</p>
        </div>
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={markAllAsRead} icon={CheckCheck}>
                Mark all read
              </Button>
              <Button variant="danger" size="sm" onClick={clearAll} icon={Trash2}>
                Clear all
              </Button>
            </>
          )}
        </div>
      </div>

      <Card variant="default" className="p-0 overflow-hidden">
        {notifications.length === 0 ? (
          <EmptyState
            icon={BellOff}
            title="All caught up!"
            description="No notifications to display"
          />
        ) : (
          <div className="divide-y divide-glass-border">
            {notifications.map((notif) => {
              const Icon = typeIcon[notif.type] || Info;
              const timeAgo = formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true });
              return (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-glass-bg transition cursor-pointer ${
                    !notif.read ? 'bg-primary/5 border-l-2 border-primary' : ''
                  }`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{notif.message}</p>
                      <p className="text-xs text-muted mt-1">{timeAgo}</p>
                    </div>
                    {!notif.read && <div className="w-2 h-2 rounded-full bg-primary mt-2" />}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}