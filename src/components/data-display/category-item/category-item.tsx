'use client';

import { deleteSectionAPI } from '@/actions/section.action';
import { IconEdit, IconGripVertical, IconTrash } from '@tabler/icons-react';
import { toast } from 'sonner';

import { CategoryItemProps } from './category-item.types';

export function CategoryItem({ id, title }: CategoryItemProps) {
  async function handleDelete(id: string) {
    const responseStatus = await deleteSectionAPI(id);
    if (responseStatus === 200) {
      return toast.success('Categoria deletada com sucesso.', {
        position: 'top-right',
      });
    }
    toast.error('Erro ao deletar categoria. Tente novamente mais tarde', {
      position: 'top-right',
    });
  }

  return (
    <div className='flex h-[50px] w-full items-center'>
      <IconGripVertical size={24} className='text-text-default cursor-move' />
      <div className='border-line flex h-full w-full items-center justify-between rounded-md border px-4 select-none'>
        <span className='text-title-default text-sm font-semibold'>
          {title}
        </span>
        <div className='flex items-center gap-2.5'>
          <IconEdit size={24} className='text-title-secondary cursor-pointer' />
          <IconTrash
            size={24}
            className='text-title-secondary cursor-pointer'
            onClick={() => handleDelete(id)}
          />
        </div>
      </div>
    </div>
  );
}
