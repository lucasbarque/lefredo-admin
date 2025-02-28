import { ReactNode } from 'react';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className='h-[calc(100vh-80px)] w-full overflow-y-scroll p-8'>
      {children}
    </div>
  );
}
