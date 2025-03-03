'use client';

import { useUser } from '@clerk/nextjs';
import { IconUser } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { NavbarProps } from './navbar.types';

export function Navbar({ children }: NavbarProps) {
  const { user } = useUser();

  return (
    <>
      <div className='flex h-20 w-full items-center justify-between gap-2 px-6 shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.1)]'>
        <Link href='/welcome'>
          <Image
            src='/assets/images/logo.svg'
            alt=''
            width={60}
            height={100}
            priority
            className='h-auto w-auto'
          />
        </Link>
        <div className='flex cursor-pointer items-center gap-2'>
          <div className='text-title-default cursor-pointer rounded-md p-2 transition-all duration-500 hover:bg-gray-200'>
            <IconUser size={24} />
          </div>
          <div className='text-title-default font-bold'>
            {user?.firstName + ' ' + user?.lastName}
          </div>
        </div>
      </div>
      <>{children}</>
    </>
  );
}
