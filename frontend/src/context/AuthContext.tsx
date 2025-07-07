import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: 'student' | 'teacher' | 'admin') => Promise<boolean>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher' | 'admin';
    grade?: string;
    subject?: string;
  }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string, role: 'student' | 'teacher' | 'admin'): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const user: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role,
      };
      
      setAuthState({
        user,
        isAuthenticated: true,
      });
      
      return true;
    }
    
    return false;
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher' | 'admin';
    grade?: string;
    subject?: string;
  }): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration - in real app, this would be an API call
    const user: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
    };
    
    setAuthState({
      user,
      isAuthenticated: true,
    });
    
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};