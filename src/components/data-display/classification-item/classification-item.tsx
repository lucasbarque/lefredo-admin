import { useState } from 'react';

import { ToggleSwitch } from '@/components/inputs/toggle-switch';

import { ClassificatinItemProps } from './classification-item.types';

export function ClassificationItem({
  title,
  description,
  icon,
  isActive = false,
}: ClassificatinItemProps) {
  const [isItemActive, setIsItemActive] = useState(isActive);

  return (
    <div
      className='border-border-default group relative flex h-[8.375rem] gap-3 rounded-lg border p-4'
      data-is-active={isItemActive}
    >
      <ToggleSwitch
        id='teste'
        onCheckedChange={setIsItemActive}
        defaultChecked={isItemActive}
      />
      <div>
        <div className='text-title-secondary font-semibold'>{title}</div>
        <p className='pt-1 text-gray-600'>{description}</p>
      </div>
      <div className='group-data-[is-active=true]:bg-brand-default absolute top-0 right-0 flex h-8 w-11 items-center justify-center rounded-tr-lg rounded-bl-lg bg-gray-500 text-white'>
        {icon}
      </div>
    </div>
  );
}
