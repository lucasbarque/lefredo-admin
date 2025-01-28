import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from './errors/ErrorBoundary';
import { Providers } from './providers';
import MainRoutes from './routes';

export function App() {
  return (
    <ErrorBoundary>
      <Providers>
        <MainRoutes />
        <Outlet />
      </Providers>
    </ErrorBoundary>
  );
}
