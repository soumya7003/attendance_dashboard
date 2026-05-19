import { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { useAttendance } from '../../context/AttendanceContext';
import NotificationBell from '../notifications/NotificationBell';
import NotificationDropdown from '../notifications/NotificationDropdown';

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const { unreadCount } = useNotifications();
  const { sessionId } = useAttendance();
  const isLive = !!sessionId; // true if a session is active

  // Close user menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Will integrate with global search later (e.g., navigate to /search?q=...)
    console.log('Search:', searchQuery);
  };

  return (
    <header className="glass-card mx-4 mt-4 rounded-2xl border-t-0 flex items-center justify-between px-6 py-3">
      {/* Search */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search students, sessions..."
          className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-80 transition-all"
          aria-label="Search"
        />
      </form>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Live indicator */}
        {isLive && (
          <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-semibold text-cyan-300">LIVE</span>
          </div>
        )}

        {/* Notification bell with dropdown */}
        <NotificationBell />

        {/* User dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition"
            aria-label="User menu"
          >
            <User size={20} />
            <ChevronDown size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 glass-panel rounded-xl py-2 z-50 animate-slide-up">
              <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/10 transition">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/10 transition">
                Account Settings
              </button>
              <hr className="my-1 border-white/10" />
              <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}