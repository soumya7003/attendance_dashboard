import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ─── Layouts ──────────────────────────────────────────────────────────────────
import MainLayout  from "../components/layout/MainLayout";
import AuthLayout  from "../components/layout/AuthLayput"; // matches filename in project

// ─── Auth Guard ───────────────────────────────────────────────────────────────
import { useAuth } from "../hooks/useAuth";

// ─── Lazy Pages ───────────────────────────────────────────────────────────────
const Login         = lazy(() => import("../pages/Auth/Login"));
const LiveMonitor   = lazy(() => import("../pages/LiveMonitor/LiveMonitor"));
const Reports       = lazy(() => import("../pages/Reports/Reports"));
const Students      = lazy(() => import("../pages/Students/Students"));
const Courses       = lazy(() => import("../pages/Courses/Courses"));
const Sessions      = lazy(() => import("../pages/Sessions/Sessions"));
const Devices       = lazy(() => import("../pages/Devices/Devices"));
const Notifications = lazy(() => import("../pages/Notifications/Notifications"));
const Settings      = lazy(() => import("../pages/Settings/Settings"));

// ─── Route Fallback (Suspense) ────────────────────────────────────────────────
function PageLoader() {
  return (
    <div style={{
      position: "fixed", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#030712",
      flexDirection: "column", gap: "16px",
    }}>
      <div style={{
        width: "40px", height: "40px",
        border: "3px solid rgba(99,102,241,0.15)",
        borderTop: "3px solid #6366f1",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <span style={{ color: "#475569", fontSize: "13px", fontFamily: "sans-serif" }}>
        Loading…
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

// ─── Protected Route Guard ────────────────────────────────────────────────────
// Wraps any route that requires an authenticated session.
// Redirects to /login (preserving the intended destination) if not logged in.
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (!user)   return <Navigate to="/login" replace />;

  return children;
}

// ─── Public Route Guard ───────────────────────────────────────────────────────
// Prevents authenticated users from re-visiting /login.
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (user)    return <Navigate to="/live" replace />;

  return children;
}

// ─── Not Found ─────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#030712", color: "#f1f5f9",
      fontFamily: "sans-serif", gap: "12px",
    }}>
      <div style={{ fontSize: "60px" }}>🔍</div>
      <div style={{ fontSize: "22px", fontWeight: 700 }}>404 — Page Not Found</div>
      <div style={{ color: "#64748b", fontSize: "14px" }}>
        The page you're looking for doesn't exist.
      </div>
      <a
        href="/live"
        style={{
          marginTop: "8px", padding: "10px 24px", borderRadius: "10px",
          background: "linear-gradient(135deg, #6366f1, #4f46e5)",
          color: "#fff", fontSize: "14px", fontWeight: 600,
          textDecoration: "none",
        }}
      >
        ← Back to Dashboard
      </a>
    </div>
  );
}

// ─── App Router ───────────────────────────────────────────────────────────────
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ── Public: Auth routes (redirect away if already logged in) ── */}
          <Route
            element={
              <PublicRoute>
                <AuthLayout />
              </PublicRoute>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>

          {/* ── Protected: Main app routes ── */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Default redirect */}
            <Route index                    element={<Navigate to="/live" replace />} />
            <Route path="/"                 element={<Navigate to="/live" replace />} />

            {/* Core pages */}
            <Route path="/live"             element={<LiveMonitor />}   />
            <Route path="/reports"          element={<Reports />}       />
            <Route path="/students"         element={<Students />}      />
            <Route path="/courses"          element={<Courses />}       />
            <Route path="/sessions"         element={<Sessions />}      />
            <Route path="/devices"          element={<Devices />}       />
            <Route path="/notifications"    element={<Notifications />} />
            <Route path="/settings"         element={<Settings />}      />
          </Route>

          {/* ── 404 catch-all ── */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}