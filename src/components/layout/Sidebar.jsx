<<<<<<< HEAD
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/live', label: 'Live Monitor' },
  { to: '/reports', label: 'Reports' },
  { to: '/students', label: 'Students' },
  { to: '/courses', label: 'Courses' },
  { to: '/sessions', label: 'Sessions' },
  { to: '/devices', label: 'Devices' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/settings', label: 'Settings' },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-white/10 p-4 flex flex-col gap-2">
      <h2 className="text-lg font-bold mb-4">Attendify</h2>
      {NAV_ITEMS.map(item => (
        <Link
          key={item.to}
          to={item.to}
          className={`px-3 py-2 rounded-lg text-sm ${
            pathname === item.to ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-white/5'
          }`}
        >
          {item.label}
        </Link>
      ))}
=======
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  BookOpen,
  Calendar,
  Smartphone,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { path: '/live', label: 'Live Monitor', icon: LayoutDashboard },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
  { path: '/students', label: 'Students', icon: Users },
  { path: '/courses', label: 'Courses', icon: BookOpen },
  { path: '/sessions', label: 'Sessions', icon: Calendar },
  { path: '/devices', label: 'Devices', icon: Smartphone },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ collapsed, onCollapse }) {
  const { user, logout } = useAuth();

  const userInitials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <aside
      className="glass-sidebar"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        zIndex: 20,
        overflowX: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: '1.25rem 1rem',
          borderBottom: '1px solid var(--color-glass-border)',
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="logo-icon"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>A</span>
          </div>
          {!collapsed && (
            <span className="logo-text" style={{ fontSize: 18, fontWeight: 700, whiteSpace: 'nowrap' }}>
              Attendify
            </span>
          )}
        </div>

        <button
          onClick={() => onCollapse(!collapsed)}
          className="text-muted hover:text-primary transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{ flexShrink: 0 }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1.5rem 0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={20} className="nav-icon flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid var(--color-glass-border)', flexShrink: 0 }}>
        <button
          onClick={logout}
          className={`nav-item hover:text-danger ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>

        {!collapsed && user && (
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              paddingTop: 12,
              borderTop: '1px solid color-mix(in srgb, var(--color-glass-border) 50%, transparent)',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--color-primary-20, rgba(99,102,241,0.2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              {userInitials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </p>
              <p style={{ fontSize: 11, color: 'var(--color-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.email}
              </p>
            </div>
            <div
              style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)', flexShrink: 0 }}
              className="animate-pulse"
            />
          </div>
        )}

        {collapsed && user && (
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--color-primary-20, rgba(99,102,241,0.2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: 13,
                position: 'relative',
              }}
            >
              {userInitials}
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: 'var(--color-success)',
                  border: '2px solid var(--color-bg-base)',
                }}
              />
            </div>
          </div>
        )}
      </div>
>>>>>>> aa3a4ba6a433ca7f7d2f915da5b18db865688e0a
    </aside>
  );
}