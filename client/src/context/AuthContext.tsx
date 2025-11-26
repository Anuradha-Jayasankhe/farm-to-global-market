'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, tokenManager, ApiError } from '@/lib/api-client';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  subscription?: {
    plan: string;
    isActive: boolean;
  };
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = tokenManager.get();
      if (token) {
        try {
          const response = await apiClient.auth.getProfile();
          if (response.success && response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error('Failed to load user:', error);
          tokenManager.remove();
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.auth.login({ email, password });
      if (response.success && response.data) {
        tokenManager.set(response.data.token);
        setUser(response.data.user);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      tokenManager.remove();
      setUser(null);
    }
  };

  const register = async (data: any) => {
    try {
      const response = await apiClient.auth.register(data);
      if (response.success && response.data) {
        tokenManager.set(response.data.token);
        setUser(response.data.user);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
