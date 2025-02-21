import { ReactNode } from 'react';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { Navbar } from '@/components/navigation/navbar';
import { Sidebar } from '@/components/navigation/sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/login');
  }

  return (
    <div className='h-screen overflow-hidden'>
      <Navbar>
        <Sidebar>{children}</Sidebar>
      </Navbar>
    </div>
  );
}
