import { IconEdit, IconX } from '@tabler/icons-react';
import Image from 'next/image';

import { ImagePreviewProps } from './image-preview.types';

export function ImagePreview({
  url,
  handleEdit,
  index,
  handleRemove,
  height = 300,
  isLoading,
}: ImagePreviewProps) {
  return (
    <div className='relative'>
      {isLoading ? (
        <div
          className='flex animate-pulse items-center justify-center bg-gray-100'
          style={{ height: height + 'px' }}
        >
          <span className='text-sm font-semibold text-gray-600'>
            Carregando...
          </span>
        </div>
      ) : (
        <Image
          src={url}
          alt='Imagem'
          width={280}
          style={{ height: height + 'px' }}
          height={height}
          className='h-auto w-full object-cover'
          quality={60}
        />
      )}
      <div className='absolute top-2 right-2 flex gap-1'>
        <button
          onClick={() => handleEdit(index)}
          className='cursor-pointer rounded bg-white p-1'
        >
          <IconEdit />
        </button>
        <button
          onClick={() => handleRemove(index)}
          className='cursor-pointer rounded bg-white p-1'
        >
          <IconX />
        </button>
      </div>
    </div>
  );
}
