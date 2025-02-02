import { IconBook, IconBuildingStore, IconLogout2 } from '@tabler/icons-react';

import { SidebarItem } from '@components/navigation/sidebar-item';

import { SidebarProps } from './sidebar.types';
import { useSidebar } from './use-sidebar';

export function Sidebar({ children }: SidebarProps) {
  const { handleLogout } = useSidebar();

  return (
    <div className='flex'>
      <div className='w-full max-w-[300px] px-6 py-8 border-r border-gray-200 h-[calc(100vh-80px)]'>
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
      <div className='p-6 w-full h-[calc(100vh-80px)] overflow-y-scroll'>
        {children}
      </div>
    </div>
  );
}
