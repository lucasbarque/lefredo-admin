'use client';

import { IconEdit, IconGripVertical, IconTrash } from '@tabler/icons-react';

import { ItemAdditionalProps } from './add-item-additionals.types';

export function ItemAdditional({
  id,
  name,
  price,
  setEditItem,
  handleDeleteItem,
}: ItemAdditionalProps) {
  return (
    <div className='mb-2 flex w-full cursor-grab items-center gap-3'>
      <IconGripVertical className='text-text-default' />
      <div className='border-border-default flex h-[3.125rem] w-full items-center justify-between rounded-md border px-4'>
        <span className='text-title-default font-semibold'>
          {`${name} - R$ ${new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            currency: 'BRL',
            minimumFractionDigits: 2,
          }).format(price / 100)}`}
        </span>
        <div className='flex gap-2'>
          <button
            type='button'
            className='cursor-pointer'
            onClick={() => setEditItem(id)}
          >
            <IconEdit className='text-title-secondary' />
          </button>
          <button
            type='button'
            className='cursor-pointer'
            onClick={() => handleDeleteItem(id)}
          >
            <IconTrash className='text-title-secondary' />
          </button>
        </div>
      </div>
    </div>
  );
}
