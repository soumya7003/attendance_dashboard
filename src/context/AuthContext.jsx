import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Mock user object
const MOCK_USER = {
  id: "u_001",
  name: "Alex Morgan",
  email: "alex.morgan@attendify.school",
  role: "admin", // "admin" | "teacher"
  avatar: null,  // null = show initials fallback
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(MOCK_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800));
    setUser(MOCK_USER);
    setIsLoggedIn(true);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
