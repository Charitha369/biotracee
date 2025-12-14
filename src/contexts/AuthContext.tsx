import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Simulated user storage (in real app, this would be backend)
const USERS_KEY = 'fingerprint_app_users';
const SESSION_KEY = 'fingerprint_app_session';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

const getStoredUsers = (): StoredUser[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUser = (user: StoredUser) => {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      const sessionUser = JSON.parse(session);
      setUser(sessionUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getStoredUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const sessionUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
      setUser(sessionUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getStoredUsers();
    if (users.some(u => u.email === email)) {
      return false; // Email already exists
    }
    
    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };
    
    saveUser(newUser);
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(sessionUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
