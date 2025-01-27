import { useEffect } from 'react';

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import { useAuth } from '@contexts/AuthContext';

import { AuthCallback } from '@pages/callbacks/AuthCallback';
import {
  Account,
  CampaignDetails,
  CreateCampaign,
  Dashboard,
} from '@pages/signed-in';
import {
  BlockedAccount,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  SetPassword,
  VerifyAccount,
} from '@pages/signed-off';
import { LoadingStatesEnum } from '@enums/loading-states.enum';

export default function MainRoutes() {
  const { isAuthenticated, loadingState } = useAuth();

  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
  }

  function CheckLoggedUser() {
    return isAuthenticated ? <Navigate to='/dashboard' /> : <Outlet />;
  }

  useEffect(() => {
    isAuthenticated ? <Navigate to='/dashboard' /> : <Outlet />;
  }, [isAuthenticated]);

  if (loadingState !== LoadingStatesEnum.DONE) {
    // TODO: adicionar componente de Loading
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<CheckLoggedUser />}>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/register/verify-account' element={<VerifyAccount />} />
          <Route path='/register/set-password' element={<SetPassword />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/auth/callback' element={<AuthCallback />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/account' element={<Account />} />
          <Route path='/campaign/create/:slug' element={<CreateCampaign />} />
          <Route path='/campaign/:id' element={<CampaignDetails />} />
        </Route>

        <Route path='/blocked-account' element={<BlockedAccount />} />
      </Routes>
    </BrowserRouter>
  );
}
