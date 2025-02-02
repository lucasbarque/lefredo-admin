// import { Navigate, Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// import { useAuth } from '@hooks/useAuth';

// import { DEFAULT_ROUTES } from '@constants/routes';

// interface HandleRoutesProps {
//   isPrivate?: boolean;
// }

// export function HandleRoutes({ isPrivate = false }: HandleRoutesProps) {
export function HandleRoutes() {
  // const { isAuthenticated } = useAuth();

  // const isLoggedIn = isAuthenticated;
  // const isAllowed = isLoggedIn === isPrivate;

  // return isAllowed ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={isPrivate ? DEFAULT_ROUTES.LOGIN : DEFAULT_ROUTES.HOME} />
  // );
  return <Outlet />;
}
