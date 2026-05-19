import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService'; // will be created later

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('attendify-token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const userData = await authService.me(token);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // Token invalid or expired
          localStorage.removeItem('attendify-token');
          setToken(null);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoading(false);
    };
    validateToken();
  }, [token]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { accessToken, user: userData } = response;
      localStorage.setItem('attendify-token', accessToken);
      setToken(accessToken);
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (token) await authService.logout(token);
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('attendify-token');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [token]);

  const refreshToken = useCallback(async () => {
    if (!token) return false;
    try {
      const newToken = await authService.refresh(token);
      localStorage.setItem('attendify-token', newToken);
      setToken(newToken);
      return true;
    } catch (error) {
      logout();
      return false;
    }
  }, [token, logout]);

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};