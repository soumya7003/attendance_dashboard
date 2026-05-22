import React from 'react';
import PropTypes from 'prop-types';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Toggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg-base"
      style={{ backgroundColor: isDark ? '#6366F1' : '#94A3B8' }}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform flex items-center justify-center ${
          isDark ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      >
        {isDark ? <Moon size={12} className="text-primary" /> : <Sun size={12} className="text-warning" />}
      </span>
    </button>
  );
};

Toggle.propTypes = {};