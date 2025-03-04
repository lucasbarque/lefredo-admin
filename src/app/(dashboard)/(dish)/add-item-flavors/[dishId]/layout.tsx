import { ReactNode } from 'react';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-[calc(100vh-80px)] w-full flex-col overflow-y-auto'>
      {children}
    </div>
  );
}
