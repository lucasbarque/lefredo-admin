import { IconEdit, IconGripVertical, IconTrash } from '@tabler/icons-react';
import Image from 'next/image';

import imgCoxinha from '../../../public/assets/images/coxinha.jpg';

export function ItemFlavor() {
  return (
    <div className='flex w-full items-center gap-2'>
      <IconGripVertical size={24} className='text-text-default cursor-move' />
      <div className='border-line flex h-full w-full items-center justify-between gap-3 rounded-md border p-3'>
        <Image
          src={imgCoxinha}
          alt=''
          className='h-[5.625rem] w-[5.625rem] rounded-md object-cover'
          height={90}
          width={90}
        />
        <div className='flex flex-1 flex-col gap-2'>
          <span className='text-title-default line-clamp-1 text-lg font-semibold'>
            Salgados
          </span>
          <p className='text-text-default line-clamp-1 text-sm'>
            Feita com massa de mandioca, experimente agora mesmo.
          </p>
          <div className='text-title-default text-sm font-semibold'>
            R$ 15,00
          </div>
        </div>
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
