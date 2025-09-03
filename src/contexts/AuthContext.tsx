import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Your specific admin credentials
  const ADMIN_EMAIL = 'zerguinea31@gmail.com';
  const ADMIN_PASSWORD = 'abdou1996#';

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setUserEmail(email);
      localStorage.setItem('admin_session', 'authenticated');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem('admin_session');
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (session === 'authenticated') {
      setIsAuthenticated(true);
      setUserEmail(ADMIN_EMAIL);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};