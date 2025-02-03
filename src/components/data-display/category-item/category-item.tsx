import { IconEdit, IconGripVertical, IconTrash } from '@tabler/icons-react';

export function CategoryItem() {
  return (
    <div className='h-[50px] w-full flex items-center'>
      <IconGripVertical size={24} className='text-text-default cursor-move' />
      <div className='border border-line rounded-md w-full h-full flex items-center px-4 justify-between'>
        <span className='text-title-default font-semibold text-sm'>
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
