import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // CSS variable values resolved as inline styles — avoids broken Tailwind JIT syntax
  const SIDEBAR_WIDTH = 'var(--sidebar-width)';
  const SIDEBAR_COLLAPSED = 'var(--sidebar-collapsed)';
  const TOPBAR_HEIGHT = 'var(--topbar-height)';
  const CONTENT_PADDING = 'var(--content-padding)';

  const sidebarOffset = isMobile ? 0 : sidebarCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>
      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          inset: '0 auto 0 0',
          zIndex: 30,
          transform: !isMobile || mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapse={setSidebarCollapsed}
        />
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 20,
          }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content — offset by actual sidebar width */}
      <div
        style={{
          marginLeft: sidebarOffset,
          minHeight: '100vh',
          transition: 'margin-left 0.2s ease',
        }}
      >
        <Topbar
          onMenuClick={() => setMobileMenuOpen((p) => !p)}
          sidebarCollapsed={sidebarCollapsed}
          isMobile={isMobile}
        />

        {/* padding-top = topbar height so content isn't hidden under fixed topbar */}
        <main
          style={{
            paddingTop: TOPBAR_HEIGHT,
            padding: `calc(${TOPBAR_HEIGHT} + ${CONTENT_PADDING}) ${CONTENT_PADDING} ${CONTENT_PADDING}`,
          }}
        >
          <div style={{ maxWidth: 'var(--content-max-width)', margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}