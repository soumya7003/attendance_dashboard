import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

/**
 * Notification structure:
 * {
 *   id: string,
 *   type: 'info' | 'success' | 'warning' | 'error',
 *   title: string,
 *   message: string,
 *   timestamp: Date,
 *   read: boolean
 * }
 */
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Add a new notification (auto‑increment ID)
  const addNotification = useCallback(({ type = 'info', title, message }) => {
    const newNotification = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 6),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    return newNotification.id;
  }, []);

  // Mark a single notification as read
  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  }, []);

  // Remove a notification
  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Unread count for the bell badge
  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};