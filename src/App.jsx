<<<<<<< HEAD
import { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { AttendanceProvider } from './context/AttendanceContext';
import LoadingSpinner from './components/shared/LoadingSpinner';

// Lazy load the router to reduce initial bundle size
const AppRouter = lazy(() => import('./routes/AppRouter'));

/**
 * App component assembles all global providers and renders the router.
 * - Suspense shows a loading spinner while the router chunk loads.
 * - Providers are ordered: Theme → Auth → Notifications → Attendance.
 * - No additional UI here – the router decides which layout/page to show.
 */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <AttendanceProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <AppRouter />
            </Suspense>
          </AttendanceProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
=======
import AppRouter from './routes/AppRouter.jsx'

export default function App() {
  return <AppRouter />
}
>>>>>>> aa3a4ba6a433ca7f7d2f915da5b18db865688e0a
