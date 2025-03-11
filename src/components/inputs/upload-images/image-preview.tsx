'use client';

import { IconEdit, IconX } from '@tabler/icons-react';
import Image from 'next/image';

import { ImagePreviewProps } from './image-preview.types';

export function ImagePreview({
  id,
  url,
  handleEdit,
  handleRemove,
  height = 300,
  isLoading,
}: ImagePreviewProps) {
  return (
    <div className='relative'>
      {isLoading ? (
        <div className='flex aspect-video animate-pulse items-center justify-center bg-gray-100'>
          <span className='text-sm font-semibold text-gray-600'>
            Carregando...
          </span>
        </div>
      ) : (
        <Image
          src={url}
          alt='Imagem'
          width={280}
          height={height}
          className='aspect-video h-full w-full object-cover'
          quality={60}
        />
      )}
      <div className='absolute top-2 right-2 flex gap-1'>
        <button
          onClick={() => handleEdit(id)}
          className='cursor-pointer rounded bg-white p-1 disabled:opacity-40'
          disabled={isLoading}
        >
          <IconEdit />
        </button>
        <button
          onClick={() => handleRemove(id)}
          className='cursor-pointer rounded bg-white p-1 disabled:opacity-40'
          disabled={isLoading}
        >
          <IconX />
        </button>
      </div>
    </div>
  );
}
