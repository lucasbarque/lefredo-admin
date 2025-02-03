import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { FirstCategoryCreate } from '@pages/private/first-category-create';
import { FirstStepsMenu } from '@pages/private/first-steps-menu';
import { Home } from '@pages/private/home';
import { LayoutsPrivate } from '@pages/private/layouts';
import { Login } from '@pages/public/login';

import { DEFAULT_ROUTES } from '../constants/routes';
import { HandleRoutes } from './handle-routes';

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HandleRoutes />}>
          <Route path={DEFAULT_ROUTES.LOGIN} element={<Login />} />
          <Route element={<LayoutsPrivate />}>
            {/* </Route>

        <Route element={<HandleRoutes isPrivate />}>
          <Route
            index
            element={<Navigate to={DEFAULT_ROUTES.HOME} replace />}
          /> */}
            <Route path={DEFAULT_ROUTES.HOME} element={<Home />} />
            <Route
              path={DEFAULT_ROUTES.FIRST_STEPS}
              element={<FirstStepsMenu />}
            />
            <Route
              path={DEFAULT_ROUTES.FIRST_CATEGORY_CREATE}
              element={<FirstCategoryCreate />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
