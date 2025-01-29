import { IconUser } from '@tabler/icons-react';

import { NavbarProps } from './navbar.types';
import ImgLogo from '/assets/images/logo.svg';

export function Navbar({ children }: NavbarProps) {
  return (
    <>
      <div className='w-full h-20 flex items-center px-6 gap-2 shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.1)] justify-between'>
        <img src={ImgLogo} alt='' width={60} />
        <div className='flex items-center gap-2 cursor-pointer'>
          <div className='hover:bg-gray-200 p-2 rounded-md cursor-pointer transition-all duration-500'>
            <IconUser size={24} />
          </div>
          <div className='font-medium'>Lucas Barque</div>
        </div>
      </div>
      <>{children}</>
    </>
  );
}
