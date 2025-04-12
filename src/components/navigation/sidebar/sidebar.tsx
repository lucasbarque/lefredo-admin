'use client';

import { getRestaurantIsFirstCategoryAPI } from '@/actions/restaurant.action';
import { getUsersByRestaurantIdAPI } from '@/actions/user.action';
import { useClerk } from '@clerk/nextjs';
import {
  IconBook,
  IconBuildingStore,
  IconHome,
  IconLogout2,
} from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';

import { SidebarItem } from './sidebar-item';
import { SidebarProps } from './sidebar.types';

export function Sidebar({ children }: SidebarProps) {
  const router = useRouter();
  const { signOut } = useClerk();
  const pathname = usePathname();

  async function handleClickMenu() {
    const currentUser = await getUsersByRestaurantIdAPI();
    const { isFirstCategory } = await getRestaurantIsFirstCategoryAPI();

    if (currentUser?.onboardingFinished === false) {
      return router.push('/onboarding');
    }

    if (isFirstCategory) {
      return router.push('/first-category-create');
    }

    return router.push('/menu-list');
  }

  return (
    <div className='flex'>
      <div className='h-[calc(100vh-80px)] w-full max-w-[300px] border-r border-gray-200 px-6 py-8'>
        <SidebarItem
          isActive={pathname === '/welcome'}
          title='Dashboard'
          icon={<IconHome size={24} />}
          onClick={() => router.push('/welcome')}
        />

        <SidebarItem
          isActive={!['/my-store', '/welcome'].includes(pathname)}
          title='Cardápio'
          icon={<IconBook size={24} />}
          onClick={handleClickMenu}
        />
        <SidebarItem
          title='Minha Loja'
          onClick={() => router.push('/my-store')}
          isActive={pathname === '/my-store'}
          icon={<IconBuildingStore size={24} />}
        />
        <SidebarItem
          title='Sair'
          icon={<IconLogout2 size={24} />}
          onClick={() => signOut({ redirectUrl: '/login' })}
        />
      </div>
      {children}
    </div>
  );
}
