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