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
        'h-12 flex items-center px-4 gap-2 cursor-pointer relative transition-all duration-500 w-full rounded-md',
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
  );
}
