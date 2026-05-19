import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * MainLayout – The primary authenticated layout.
 * - Sidebar (fixed left)
 * - Topbar (floating glass at top)
 * - Main content area (scrollable, with padding)
 */
export default function MainLayout() {
  return (
    <div className="flex h-screen bg-[#0B1120]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}