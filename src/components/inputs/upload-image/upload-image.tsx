/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect, useRef, useState } from 'react';

import { IconCloudUpload, IconX } from '@tabler/icons-react';
import clsx from 'clsx';

import { LoadingSpinner } from '@/components/data-display/loading-spinner/loading-spinner';

import { UploadImageProps } from './upload-image.types';

export function UploadImage({
  label,
  additionalInfo,
  onSubmit,
  onDelete,
  currentImage,
  isLoading = false,
}: UploadImageProps) {
  const [fileUrl, setFileUrl] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (onSubmit) {
        onSubmit({
          file,
          url: fileUrl,
        });
      }
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const resetInput = () => {
    if (onDelete) {
      onDelete(currentImage?.file.name || '');
    }
    if (onSubmit) {
      onSubmit(undefined);
    }
    setFileUrl('');
  };

  useEffect(() => {
    if (currentImage?.url) {
      setFileUrl(currentImage.url);
    }
  }, [currentImage]);

  return (
    <Fragment>
      <div className='w-full max-w-[490px] rounded-md border border-slate-200 px-3 py-4'>
        {fileUrl ? (
          <div
            className={clsx('relative w-full', {
              'animate-pulse before:absolute before:inset-0 before:bg-black/40 before:backdrop-blur-xs':
                isLoading,
            })}
          >
            {isLoading && (
              <LoadingSpinner
                family='secondary'
                className='absolute inset-0 top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2'
              />
            )}

            <img src={fileUrl} alt='img' />
            <div className='absolute top-4 right-4 flex gap-2'>
              <button
                type='button'
                onClick={resetInput}
                className='flex h-8 w-8 items-center justify-center rounded-md bg-white'
              >
                <IconX className='h-5 w-5 cursor-pointer' />
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor='upload-file'
            data-active={isDragActive}
            className='data-[active=true]:border-brand-default hover:border-brand-default border-border-default relative flex w-full flex-col items-center rounded-md border-2 border-dashed p-6'
          >
            <div className='flex h-[68px] w-[68px] items-center justify-center rounded-full bg-slate-300'>
              <IconCloudUpload className='text-gray-600' size={40} />
            </div>

            <div className='mt-4 mb-5'>
              <p className='text-title-default text-center font-semibold'>
                {label}
              </p>
              {additionalInfo && (
                <p className='text-body-3-regular mt-1 text-gray-600'>
                  {additionalInfo}
                </p>
              )}
            </div>
            <span className='text-title-secondary border-border-default rounded-md border px-10 py-2 font-semibold hover:bg-gray-400/50'>
              Escolher imagem
            </span>

            <input
              type='file'
              id='upload-file'
              className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
              onChange={onChange}
              multiple
              onDragEnter={() => setIsDragActive(true)}
              onFocus={() => setIsDragActive(true)}
              onClick={() => setIsDragActive(true)}
              onDragLeave={() => setIsDragActive(false)}
              onBlur={() => setIsDragActive(false)}
              onDrop={() => setIsDragActive(false)}
              ref={inputRef}
              disabled={isLoading}
            />
          </label>
        )}
      </div>
    </Fragment>
  );
}
