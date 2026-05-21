import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// ── Layouts ──────────────────────────────────────────────────
import MainLayout  from '../components/layout/MainLayout.jsx'
import AuthLayout  from '../components/layout/AuthLayout.jsx'   // fixed filename

// ── Pages ────────────────────────────────────────────────────
import LiveMonitor   from '../pages/LiveMonitor/LiveMonitor.jsx'
import Reports       from '../pages/Reports/Reports.jsx'
import Students      from '../pages/Students/Students.jsx'
import Courses       from '../pages/Courses/Courses.jsx'
import Sessions      from '../pages/Sessions/Sessions.jsx'
import Devices       from '../pages/Devices/Devices.jsx'
import Notifications from '../pages/Notifications/Notifications.jsx'
import Settings      from '../pages/Settings/Settings.jsx'

// ── Auth guard (swap `true` with real auth check in Step 7) ──
const isAuthenticated = true

function ProtectedRoute({ children }) {
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

// ── 404 page ─────────────────────────────────────────────────
function NotFound() {
  return (
    <div style={{
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      height:         '100vh',
      gap:            '12px',
      fontFamily:     'Inter, sans-serif',
      color:          'var(--text-secondary)',
    }}>
      <span style={{ fontSize: '3rem' }}>404</span>
      <span style={{ fontSize: '1rem' }}>Page not found</span>
      <a href="/live" style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>
        ← Back to dashboard
      </a>
    </div>
  )
}

// ── Router ───────────────────────────────────────────────────
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Default redirect ─────────────────────────── */}
        <Route index element={<Navigate to="/live" replace />} />

        {/* ── Auth routes (no sidebar/topbar) ──────────── */}
        <Route element={<AuthLayout />}>
          {/*
            Login page will go here in a future step:
            <Route path="/login" element={<Login />} />
          */}
        </Route>

        {/* ── Protected app routes (with MainLayout shell) */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Core dashboard pages */}
          <Route path="/live"          element={<LiveMonitor />} />
          <Route path="/reports"       element={<Reports />} />
          <Route path="/students"      element={<Students />} />
          <Route path="/courses"       element={<Courses />} />
          <Route path="/sessions"      element={<Sessions />} />
          <Route path="/devices"       element={<Devices />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings"      element={<Settings />} />
        </Route>

        {/* ── 404 catch-all ─────────────────────────────── */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}