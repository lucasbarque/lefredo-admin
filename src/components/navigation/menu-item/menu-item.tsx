import { ReactNode } from 'react';

import clsx from 'clsx';

interface MenuItemProps {
  variation?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  title: string;
  icon?: ReactNode;
}

export function MenuItem({
  variation = 'primary',
  title,
  icon,
}: MenuItemProps) {
  return (
    <span
      className={clsx(
        'flex cursor-pointer items-center gap-3 rounded-lg px-4 py-[10px] hover:bg-gray-400',
        variation === 'quaternary' && 'active:bg-transparent-dark-2'
      )}
    >
      {icon && icon}
      <span className='text-title-secondary font-medium'>{title}</span>
    </span>
  );
}
