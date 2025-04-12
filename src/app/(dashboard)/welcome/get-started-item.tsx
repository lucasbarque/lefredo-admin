import { ReactNode } from 'react';

import {
  IconArrowRight,
  IconCategory,
  IconCheck,
  IconPhotoUp,
  IconToolsKitchen,
} from '@tabler/icons-react';
import Link from 'next/link';

export type GetStartedTypes = 'category' | 'upload' | 'dish' | 'active';

export interface GetStatedItemProps {
  isChecked?: boolean;
  title: string;
  text: string;
  type: GetStartedTypes;
}

export function GetStartedItem({
  isChecked = false,
  title,
  text,
  type,
}: GetStatedItemProps) {
  const icons: Record<GetStartedTypes, ReactNode> = {
    category: (
      <IconCategory
        size={24}
        className='group-data-[is-checked=false]:text-brand-default group-data-[is-checked=true]:text-gray-500'
      />
    ),
    active: (
      <IconCheck
        size={24}
        className='group-data-[is-checked=false]:text-brand-default group-data-[is-checked=true]:text-gray-500'
      />
    ),
    dish: (
      <IconToolsKitchen
        size={24}
        className='group-data-[is-checked=false]:text-brand-default group-data-[is-checked=true]:text-gray-500'
      />
    ),
    upload: (
      <IconPhotoUp
        size={24}
        className='group-data-[is-checked=false]:text-brand-default group-data-[is-checked=true]:text-gray-500'
      />
    ),
  };

  return (
    <Link
      href={type === 'upload' ? '/my-store' : '/menu-list'}
      data-is-checked={isChecked}
      className='group flex w-full items-center gap-4 rounded-2xl p-4 shadow-[0px_1px_8.9px_0px_rgba(0,_0,_0,_0.13)] data-[is-checked=true]:opacity-80'
    >
      <div className='group-data-[is-checked=false]:bg-brand-default/20 flex h-14 w-14 shrink-0 items-center justify-center rounded-full group-data-[is-checked=true]:bg-gray-500/18'>
        {icons[type]}
      </div>
      <div className='flex-1'>
        <div className='text-title-default group-data-[is-checked=true]:text-text-default font-extrabold group-data-[is-checked=true]:line-through'>
          {title}
        </div>
        <div className='text-text-default group-data-[is-checked=true]:line-through'>
          {text}
        </div>
      </div>
      <div className='group-data-[is-checked=false]:bg-brand-default flex h-14 w-14 shrink-0 items-center justify-center rounded-full group-data-[is-checked=true]:bg-gray-500/18'>
        {isChecked ? (
          <IconCheck size={24} className='text-gray-500' />
        ) : (
          <IconArrowRight size={32} className='text-white' />
        )}
      </div>
    </Link>
  );
}
