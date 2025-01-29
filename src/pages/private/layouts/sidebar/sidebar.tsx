import { IconBook, IconBuildingStore, IconLogout2 } from '@tabler/icons-react';

import { SidebarItem } from '@components/data-display/sidebar-item';

import { SidebarProps } from './sidebar.types';
import { useSidebar } from './use-sidebar';

export function Sidebar({ children }: SidebarProps) {
  const { handleLogout } = useSidebar();

  return (
    <div className='flex'>
      <div className='w-full max-w-[280px] border-r border-gray-200 h-[calc(100vh-80px)]'>
        <div className='flex gap-2 items-center mb-4 px-4'>
          <h2 className='text-xs font-bold'>Configurações</h2>
          <div className='w-full h-[1px] bg-gray-200' />
        </div>
        <SidebarItem isActive title='Cardápio' icon={<IconBook size={24} />} />
        <SidebarItem
          title='Minha Loja'
          icon={<IconBuildingStore size={24} />}
        />
        <SidebarItem
          title='Sair'
          icon={<IconLogout2 size={24} />}
          onClick={() => handleLogout()}
        />
      </div>
      <div className='p-6'>{children}</div>
    </div>
  );
}
