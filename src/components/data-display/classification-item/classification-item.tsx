'use client';

import { useState } from 'react';

import { toggleDishesSpecsAPI } from '@/actions/dishes-specs.action';
import { toast } from 'sonner';

import { ToggleSwitch } from '@/components/inputs/toggle-switch';

import { ClassificatinItemProps } from './classification-item.types';

export function ClassificationItem({
  dishId,
  title,
  description,
  hashKey,
  icon,
  isActive = false,
}: ClassificatinItemProps) {
  const [isItemActive, setIsItemActive] = useState(isActive);
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggle() {
    setIsLoading(true);

    const response = await toggleDishesSpecsAPI(dishId, { key: hashKey });

    if (response.status === 200) {
      if (response.data.newStateIsActive !== isItemActive) {
        toast.success('Classificação do item atualizada com sucesso', {
          position: 'top-right',
        });
        setIsItemActive(!isItemActive);
      } else {
        toast.error('Falha ao atualizar classificação do item', {
          position: 'top-right',
        });
      }
    } else {
      toast.error('Falha ao atualizar classificação do item', {
        position: 'top-right',
      });
    }

    setIsLoading(false);
  }

  return (
    <div
      className='border-border-default group relative flex h-[8.375rem] gap-3 rounded-lg border p-4'
      data-is-active={isItemActive}
    >
      <ToggleSwitch
        disabled={isLoading}
        onCheckedChange={handleToggle}
        defaultChecked={isItemActive}
        checked={isItemActive}
        id={`is-${hashKey}-active`}
        name={`is-${hashKey}-active`}
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
