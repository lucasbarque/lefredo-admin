'use client';

import { useState } from 'react';

import { toggleDishesSpecsAPI } from '@/actions/dish-spec.action';
import { useMutation } from '@tanstack/react-query';
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

  const toggleMutation = useMutation({
    mutationKey: ['toggleDishSpecs', dishId, hashKey],
    mutationFn: () => toggleDishesSpecsAPI(dishId, { key: hashKey }),
    onSuccess: (response) => {
      if (response.status === 200) {
        if (response.data.newStateIsActive !== isItemActive) {
          setIsItemActive(response.data.newStateIsActive);
          toast.success('Classificação do item atualizada com sucesso', {
            position: 'top-right',
          });
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
    },
    onError: () => {
      toast.error('Falha ao atualizar classificação do item', {
        position: 'top-right',
      });
    },
  });

  function handleToggle() {
    toggleMutation.mutate();
  }

  return (
    <div
      className='border-border-default group relative flex h-[8.375rem] gap-3 rounded-lg border p-4'
      data-is-active={isItemActive}
    >
      <ToggleSwitch
        disabled={toggleMutation.isPending}
        onCheckedChange={handleToggle}
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
