import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../routes/route-paths';
import { LocalStore } from '../utils/storage';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = LocalStore.getAuthStatus();
    
    if (!isAuthenticated) {
      navigate(routePaths.auth.login);
    }
  }, [navigate]);

  if (LocalStore.getAuthStatus()) {
    return <>{children}</>;
  }

  return null;
}