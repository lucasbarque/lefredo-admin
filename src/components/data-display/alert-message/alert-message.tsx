import { IconAlertTriangle } from '@tabler/icons-react';

import { AlertMessageProps } from './alert-message.types';

export function AlertMessage({ text, type }: AlertMessageProps) {
  return (
    <div
      data-type={type}
      className='group flex h-10 w-full items-center gap-2 rounded-md px-4 data-[type=danger]:bg-red-500/20 data-[type=warning]:bg-amber-500/20'
    >
      <IconAlertTriangle
        size={18}
        className='group-data-[type=danger]:text-red-600 group-data-[type=warning]:text-amber-600'
      />
      <span className='font-semibold group-data-[type=danger]:text-red-600 group-data-[type=warning]:text-amber-600'>
        {text}
      </span>
    </div>
  );
}
