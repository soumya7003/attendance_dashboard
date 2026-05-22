import { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext(null);

// Mock initial notifications
const MOCK_NOTIFICATIONS = [
  {
    id: "n_001",
    type: "tap",       // "tap" | "warning" | "info" | "error"
    message: "Alice Johnson tapped in for CS101 — 09:02 AM",
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    read: false,
  },
  {
    id: "n_002",
    type: "warning",
    message: "Device RDR-03 in Room 204 went offline",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    read: false,
  },
  {
    id: "n_003",
    type: "tap",
    message: "Marcus Lee tapped in late for MATH202 — 10:18 AM",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: true,
  },
  {
    id: "n_004",
    type: "info",
    message: "Session for PHY301 has started in Room 101",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
  },
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = useCallback((notification) => {
    const newNotif = {
      id: `n_${Date.now()}`,
      read: false,
      timestamp: new Date().toISOString(),
      ...notification,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
