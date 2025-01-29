import clsx from 'clsx';

import { SidebarItemProps } from './sidebar-item.types';

export function SidebarItem({
  isActive = false,
  icon,
  title,
  ...rest
}: SidebarItemProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'h-12 flex items-center px-4 gap-2 cursor-pointer relative transition-all duration-500 w-full',
        {
          'bg-admin-brand-default/12 before:absolute before:bg-admin-brand-default before:w-[4px] before:h-full before:left-0 before:bottom-0':
            isActive,
          'hover:bg-gray-100': !isActive,
        }
      )}
    >
      <div
        className={clsx('', {
          'text-admin-brand-default': isActive,
          'text-admin-title-default': !isActive,
        })}
      >
        {icon}
      </div>
      <span
        className={clsx('text-sm font-bold', {
          'text-admin-brand-default': isActive,
          'text-admin-title-default': !isActive,
        })}
      >
        {title}
      </span>
    </button>
  );
}
