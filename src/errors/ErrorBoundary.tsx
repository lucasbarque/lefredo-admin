import { ReactNode, useEffect, useState } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorAPIResponse {
  statusCode: number;
  message: string;
  error?: string;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.debug(error);
      setHasError(true);
    };
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  return hasError ? (
    <div className='flex h-screen w-screen items-center justify-center text-white'>
      Ops, ocorreu um erro.
    </div>
  ) : (
    <>{children}</>
  );
}
