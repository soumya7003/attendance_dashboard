<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

/**
 * Main entry point for the Attendify dashboard.
 * - StrictMode helps catch potential issues during development.
 * - BrowserRouter enables client‑side routing.
 * - Global styles are imported from styles/index.css (Tailwind + custom glass utilities).
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
=======
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
>>>>>>> aa3a4ba6a433ca7f7d2f915da5b18db865688e0a
