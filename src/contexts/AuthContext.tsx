import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Default credentials
const DEFAULT_EMAIL = 'demo@example.com';
const DEFAULT_PASSWORD = 'password123';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // Mock authentication functions
  async function login(email: string, password: string) {
    // Check if credentials match the default ones
    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      const user = {
        id: '1',
        email,
        name: 'Demo User',
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      throw new Error('Invalid email or password');
    }
  }

  async function signup(email: string, password: string, name: string) {
    // In a real app, this would call an API
    const user = {
      id: '1',
      email,
      name,
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
  }

  function logout() {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  }

  async function resetPassword(email: string) {
    // In a real app, this would call an API
    console.log(`Password reset email sent to ${email}`);
  }

  useEffect(() => {
    // Check if user is stored in localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
