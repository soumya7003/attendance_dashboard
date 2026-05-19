import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PieChart, 
  Users, 
  BookOpen, 
  Calendar, 
  Monitor, 
  Bell, 
  Settings,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';

const navItems = [
  { path: '/live', label: 'Live Monitor', icon: LayoutDashboard },
  { path: '/reports', label: 'Reports', icon: PieChart },
  { path: '/students', label: 'Students', icon: Users },
  { path: '/courses', label: 'Courses', icon: BookOpen },
  { path: '/sessions', label: 'Sessions', icon: Calendar },
  { path: '/devices', label: 'Devices', icon: Monitor },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();

  return (
    <aside className="w-64 glass-card rounded-none border-l-0 border-y-0 flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Attendify
        </h1>
        <p className="text-xs text-slate-500 mt-1">Smart RFID Attendance</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          // Show badge on Notifications if unread > 0
          const showBadge = item.path === '/notifications' && unreadCount > 0;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {showBadge && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User profile & actions */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@attendify.com'}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={toggleTheme}
            className="flex-1 flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg py-2 transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button
            onClick={logout}
            className="flex-1 flex items-center justify-center gap-2 text-xs text-red-400 hover:text-red-300 bg-white/5 hover:bg-white/10 rounded-lg py-2 transition"
            aria-label="Logout"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}