import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider }        from './context/ThemeContext.jsx'
import { AuthProvider }         from './context/AuthContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { AttendanceProvider }   from './context/AttendanceContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*
      Provider order matters:
      1. ThemeProvider    — outermost, affects all UI
      2. AuthProvider     — auth state available everywhere
      3. NotificationProvider — needs auth context (user ID)
      4. AttendanceProvider   — innermost app-level state
    */}
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <AttendanceProvider>
            <App />
          </AttendanceProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
