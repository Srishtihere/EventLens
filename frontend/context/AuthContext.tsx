import React, { createContext, useState, useContext, useEffect } from 'react';
import { storage } from './storage';

interface UserProfile {
  first_name: string;
  last_name: string;
  role: 'organizer' | 'attendee' | null;
  bio: string;
}

interface AuthContextType {
  token: string | null;
  profile: UserProfile | null;
  setToken: (token: string | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadAuth = async () => {
      const savedToken = await storage.getItem('token');
      if (savedToken) setToken(savedToken);
    };
    loadAuth();
  }, []);

  const logout = async () => {
    setToken(null);
    setProfile(null);
    await storage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, profile, setToken, setProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export { storage };
