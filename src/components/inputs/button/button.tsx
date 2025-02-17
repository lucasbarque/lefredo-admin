import clsx from 'clsx';

import { ButtonProps } from './button.types';

export function Button({
  children,
  family = 'primary',
  size = 'md',
  fullSize = false,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex items-center  cursor-pointer justify-center gap-2 rounded-lg font-medium transition duration-300 ease-in-out disabled:opacity-40',
        {
          'h-10 px-4': size === 'sm' && family !== 'tertiary',
          'h-11 px-5': size === 'md' && family !== 'tertiary',
          'h-14 px-5': size === 'lg' && family !== 'tertiary',
          'w-full': fullSize,

          'hover:bg-brand-hover bg-brand-default text-white':
            family === 'primary',
          'hover:bg-[#3F4D54]/6 bg-white text-brand-default border border-brand-default':
            family === 'secondary',

          'hover:text-button-hover bg-white text-brand-default':
            family === 'tertiary',
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
