'use client';

import { getUsersByRestaurantIdAPI } from '@/actions/users.action';
import { useClerk } from '@clerk/nextjs';
import { IconBook, IconBuildingStore, IconLogout2 } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';

import { SidebarItem } from '@/components/navigation/sidebar-item';

import { SidebarProps } from './sidebar.types';

export function Sidebar({ children }: SidebarProps) {
  const router = useRouter();
  const { signOut } = useClerk();
  const pathname = usePathname();

  async function handleClickMenu() {
    const currentUser = await getUsersByRestaurantIdAPI();

    if (!currentUser?.onboardingFinished) {
      router.push('/onboarding');
    }
  }

  return (
    <div className='flex'>
      <div className='h-[calc(100vh-80px)] w-full max-w-[300px] border-r border-gray-200 px-6 py-8'>
        <SidebarItem
          isActive={pathname === '/onboarding'}
          title='Cardápio'
          icon={<IconBook size={24} />}
          href=''
          onClick={handleClickMenu}
        />
        <SidebarItem
          title='Minha Loja'
          href='/my-store'
          isActive={pathname === '/my-store'}
          icon={<IconBuildingStore size={24} />}
        />
        <SidebarItem
          title='Sair'
          href=''
          icon={<IconLogout2 size={24} />}
          onClick={() => signOut({ redirectUrl: '/login' })}
        />
      </div>
      {children}
    </div>
  );
}
