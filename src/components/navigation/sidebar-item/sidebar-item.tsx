import clsx from 'clsx';
import Link from 'next/link';

import { SidebarItemProps } from './sidebar-item.types';

export function SidebarItem({
  isActive = false,
  icon,
  title,
  href,
  ...rest
}: SidebarItemProps) {
  return (
    <Link href={href}>
      <button
        {...rest}
        className={clsx(
          'relative flex h-12 w-full cursor-pointer items-center gap-2 rounded-md px-4 transition-all duration-500',
          {
            'bg-brand-default/12': isActive,
            'hover:bg-gray-100': !isActive,
          }
        )}
      >
        <div
          className={clsx('', {
            'text-brand-default': isActive,
            'text-title-default': !isActive,
          })}
        >
          {icon}
        </div>
        <span
          className={clsx('text-sm font-bold', {
            'text-brand-default': isActive,
            'text-title-default': !isActive,
          })}
        >
          {title}
        </span>
      </button>
    </Link>
  );
}
