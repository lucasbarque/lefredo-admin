import { cn } from '@/lib/utils';
import { IconAlertTriangle } from '@tabler/icons-react';

import { AlertMessageProps } from './alert-message.types';

export function AlertMessage({
  title,
  description,
  type,
  className,
}: AlertMessageProps) {
  return (
    <div
      data-type={type}
      className={cn(
        'group flex w-full items-center gap-4 rounded-md px-4 py-4 data-[type=danger]:bg-red-500/20 data-[type=warning]:bg-amber-500/20',
        className
      )}
    >
      <IconAlertTriangle
        size={18}
        className='group-data-[type=danger]:text-red-600 group-data-[type=warning]:text-amber-600'
      />
      <div className='leading-5'>
        <p className='font-semibold group-data-[type=danger]:text-red-600 group-data-[type=warning]:text-amber-600'>
          {title}
        </p>
        {description && (
          <p className='group-data-[type=danger]:text-red-600/70'>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
