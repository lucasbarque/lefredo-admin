import clsx from 'clsx';

import { ButtonProps } from './button.types';

export function Button({
  children,
  size = 'md',
  fullSize = false,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex items-center hover:bg-admin-brand-hover bg-admin-brand-default text-white cursor-pointer justify-center gap-2 rounded-lg font-medium transition duration-300 ease-in-out disabled:opacity-40',
        {
          'h-10 px-4': size === 'sm',
          'h-11 px-5': size === 'md',
          'w-full': fullSize,
        }
      )}
      {...props}
    >
      {leftIcon && leftIcon}

      {children}

      {rightIcon && rightIcon}
    </button>
  );
}
