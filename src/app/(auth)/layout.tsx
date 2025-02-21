import { ReactNode } from 'react';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();

  if (userId) {
    redirect('/welcome');
  }

  return children;
}
