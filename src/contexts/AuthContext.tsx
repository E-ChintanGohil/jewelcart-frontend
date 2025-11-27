import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/lib/localStorage';
import { apiService } from '@/lib/apiService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<boolean>;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuthStatus = async () => {
      if (apiService.isAuthenticated()) {
        try {
          const userData = await apiService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          apiService.logout();
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      // Auto-detect login type based on current route
      const isAdminRoute = window.location.pathname.startsWith('/console');

      let response;
      if (isAdminRoute) {
        // Admin/staff login for console routes
        response = await apiService.login(email, password);
      } else {
        // Customer login for regular routes
        response = await apiService.customerLogin(email, password);
      }

      setUser(response.user);
      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<boolean> => {
    try {
      // Register as customer by default
      const response = await apiService.customerRegister(userData);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    apiService.logout();
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'ADMIN';

  const value: AuthContextType = {
    user,
    login,
    logout,
    register,
    isLoading,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};