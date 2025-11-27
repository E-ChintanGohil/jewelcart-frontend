// Route protection component with role-based access control

import React from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { UserRole } from '@/types/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
  allowedRoles = [UserRole.ADMIN, UserRole.STAFF],
  fallback,
  redirectTo
}) => {
  const { isLoading, isAuthorized } = useRequireAuth({ allowedRoles, redirectTo });

  // Show loading state
  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Card className="w-full max-w-md">
            <CardContent className="flex items-center justify-center p-8">
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">Verifying access...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    );
  }

  // If authorized, render children
  if (isAuthorized) {
    return <>{children}</>;
  }

  // If not authorized, the hook handles redirects
  return null;
};

// Convenience components for specific roles
export const RequireAdmin: React.FC<Omit<RequireAuthProps, 'allowedRoles'>> = (props) => (
  <RequireAuth {...props} allowedRoles={[UserRole.ADMIN]} />
);

export const RequireStaff: React.FC<Omit<RequireAuthProps, 'allowedRoles'>> = (props) => (
  <RequireAuth {...props} allowedRoles={[UserRole.ADMIN, UserRole.STAFF]} />
);

export const RequireCustomer: React.FC<Omit<RequireAuthProps, 'allowedRoles'>> = (props) => (
  <RequireAuth {...props} allowedRoles={[UserRole.CUSTOMER]} />
);