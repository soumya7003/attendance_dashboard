import { useState } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { useAttendanceContext } from '../../context/AttendanceContext';
import { useNotifications } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { Dropdown } from '../ui/Dropdown';

export default function Topbar({ onMenuClick, sidebarCollapsed, isMobile }) {
  const { isSessionActive, activeSession } = useAttendanceContext();
  const { unreadCount } = useNotifications();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Inline styles — CSS variable utilities like left-[--sidebar-width] are invalid Tailwind JIT
  const leftOffset = isMobile
    ? 0
    : sidebarCollapsed
    ? 'var(--sidebar-collapsed)'
    : 'var(--sidebar-width)';

  const userDropdownItems = [
    { label: 'Profile', icon: null, onClick: () => console.log('Profile') },
    { label: 'Settings', icon: null, onClick: () => console.log('Settings') },
    { divider: true },
    { label: 'Logout', icon: null, onClick: logout, danger: true },
  ];

  return (
    <header
      className="glass-topbar"
      style={{
        position: 'fixed',
        top: 0,
        left: leftOffset,
        right: 0,
        height: 'var(--topbar-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        zIndex: 10,
        transition: 'left 0.2s ease',
      }}
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="text-muted hover:text-primary"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        )}

        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            size={16}
          />
          <input
            type="text"
            placeholder="Search students, courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-9 w-80 h-9 text-sm"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {isSessionActive && activeSession && (
          <div className="badge-live">
            <span className="pulse-dot" />
            <span>LIVE</span>
            <span className="hidden sm:inline text-xs font-normal ml-1">
              {activeSession.courseCode}
            </span>
          </div>
        )}

        <div className="relative">
          <button
            className="relative p-1 rounded-md hover:bg-glass-bg transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-secondary" />
            {unreadCount > 0 && (
              <span className="notif-badge">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>

        <Dropdown
          trigger={
            <button className="flex items-center gap-2 p-1 rounded-md hover:bg-glass-bg transition-colors">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="hidden md:inline text-sm font-medium">
                {user?.name?.split(' ')[0]}
              </span>
              <ChevronDown size={14} className="text-muted hidden md:block" />
            </button>
          }
          items={userDropdownItems}
          align="right"
        />
      </div>
    </header>
  );
}
