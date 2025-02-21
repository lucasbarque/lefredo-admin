import { IconEdit, IconGripVertical, IconTrash } from '@tabler/icons-react';

export function CategoryItem() {
  return (
    <div className='flex h-[50px] w-full items-center'>
      <IconGripVertical size={24} className='text-text-default cursor-move' />
      <div className='border-line flex h-full w-full items-center justify-between rounded-md border px-4'>
        <span className='text-title-default text-sm font-semibold'>
          Salgados
        </span>
        <div className='flex items-center gap-2.5'>
          <IconEdit size={24} className='text-title-secondary cursor-pointer' />
          <IconTrash
            size={24}
            className='text-title-secondary cursor-pointer'
          />
        </div>
      </div>
    </div>
  );
}
