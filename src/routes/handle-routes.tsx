import { DEFAULT_ROUTES } from '@constants/routes';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@hooks/useAuth';

interface HandleRoutesProps {
  isPrivate?: boolean;
}

export function HandleRoutes({ isPrivate = false }: HandleRoutesProps) {
  const { isAuthenticated } = useAuth();

  const isLoggedIn = isAuthenticated;
  const isAllowed = isLoggedIn === isPrivate;

  return isAllowed ? (
    <Outlet />
  ) : (
    <Navigate to={isPrivate ? DEFAULT_ROUTES.LOGIN : DEFAULT_ROUTES.HOME} />
  );
}
