import { ComponentProps } from 'react';

type MenuBarItemProps = ComponentProps<'button'> & {
  isActive: boolean;
};

export function MenuBarItem({ isActive = false, ...props }: MenuBarItemProps) {
  return (
    <button
      type='button'
      data-is-active={isActive}
      className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-700 group-data-[is-disabled=true]:cursor-not-allowed group-data-[is-disabled=true]:opacity-50 hover:bg-gray-200 data-[is-active=true]:bg-gray-200 data-[is-active=true]:text-gray-800'
      {...props}
    />
  );
}
