// Role-based authentication hook for route protection

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface UseRequireAuthProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export const useRequireAuth = ({
  allowedRoles = [UserRole.ADMIN, UserRole.STAFF],
  redirectTo
}: UseRequireAuthProps = {}) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthorized = user && allowedRoles.includes(user.role as UserRole);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not logged in - redirect to appropriate login
        const consoleRoute = location.pathname.startsWith('/console');
        const loginPath = consoleRoute ? '/console/login' : '/login';
        navigate(loginPath, {
          state: { from: location.pathname },
          replace: true
        });
      } else if (!isAuthorized) {
        // Logged in but wrong role
        if (redirectTo) {
          navigate(redirectTo, { replace: true });
        } else {
          // Default redirects based on role
          switch (user.role) {
            case UserRole.ADMIN:
            case UserRole.STAFF:
              navigate('/console/dashboard', { replace: true });
              break;
            case UserRole.CUSTOMER:
            default:
              navigate('/', { replace: true });
              break;
          }
        }
      }
    }
  }, [user, isLoading, isAuthorized, navigate, location, allowedRoles, redirectTo]);

  return {
    user,
    isLoading,
    isAuthorized,
    hasRole: (role: UserRole) => user?.role === role,
    hasAnyRole: (roles: UserRole[]) => user ? roles.includes(user.role as UserRole) : false
  };
};