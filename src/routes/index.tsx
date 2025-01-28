import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Home } from '@pages/private/home';
import { Login } from '@pages/public/login';

import { DEFAULT_ROUTES } from '../constants/routes';
import { HandleRoutes } from './handle-routes';

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HandleRoutes />}>
          <Route path={DEFAULT_ROUTES.LOGIN} element={<Login />} />
        </Route>

        <Route element={<HandleRoutes isPrivate />}>
          <Route
            index
            element={<Navigate to={DEFAULT_ROUTES.HOME} replace />}
          />
          <Route path={DEFAULT_ROUTES.HOME} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
