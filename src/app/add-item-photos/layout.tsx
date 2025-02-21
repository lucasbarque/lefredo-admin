import { ReactNode } from 'react';

import { Navbar } from '@/components/navigation/navbar';
import { Sidebar } from '@/components/navigation/sidebar';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className='h-screen overflow-hidden'>
      <Navbar>
        <Sidebar>
          <div className='flex h-[calc(100vh-80px)] w-full flex-col overflow-y-auto'>
            {children}
          </div>
        </Sidebar>
      </Navbar>
    </div>
  );
}
