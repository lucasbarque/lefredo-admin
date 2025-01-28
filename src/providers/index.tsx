import { ReactNode } from 'react';

import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '@contexts/AuthContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      {children}
      <ToastContainer />
    </AuthProvider>
  );
}
