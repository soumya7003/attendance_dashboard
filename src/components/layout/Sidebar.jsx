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
    </aside>
  );
}