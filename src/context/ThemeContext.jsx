import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

/**
 * Theme Provider component
 * - Stores current theme ('dark' or 'light')
 * - Persists theme preference in localStorage
 * - Defaults to 'dark' as per design system
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('attendify-theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    localStorage.setItem('attendify-theme', theme);
    // Apply theme to document root for global overrides if needed
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};