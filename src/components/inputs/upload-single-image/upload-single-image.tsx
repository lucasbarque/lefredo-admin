/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useCallback, useRef, useState } from 'react';

import { extname } from '@/lib/utils';
import { IconCloudUpload, IconEdit, IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

import { LoadingSpinner } from '@/components/data-display/loading-spinner/loading-spinner';

import { CropModal } from './crop-modal';
import { UploadImageProps } from './upload-single-image.types';

export function UploadSingleImage({
  label,
  additionalInfo,
  onSubmit,
  onDelete,
  currentImage,
  cropConfig,
  isLoading = false,
}: UploadImageProps) {
  const [file, setFile] = useState<File | undefined>(currentImage?.file);
  const [fileUrl, setFileUrl] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState({
    ...cropConfig,
    x: 0,
    y: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setZoom(1);
      setFileUrl(URL.createObjectURL(file));
      setFile(file);
      setIsImageSelected(true);
    }
  };

  const resetInput = () => {
    if (onDelete) {
      onDelete(currentImage?.file.name || '');
    }
    if (onSubmit) {
      onSubmit(undefined);
    }
    setFile(undefined);
    setFileUrl('');
    setIsImageSelected(false);
    setZoom(1);
  };

  const handleEditImage = () => {
    if (currentImage) {
      setFileUrl(currentImage.url);
      setIsImageSelected(true);
    }
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleChangeZoom = (type: 'zoomIn' | 'zoomOut') => {
    if (type === 'zoomIn') {
      setZoom((oldState) => oldState + 0.1);
    } else {
      if (zoom === 1) return;
      setZoom((oldState) => oldState - 0.1);
    }
  };

  const onSubmitImage = () => {
    const image = new Image(cropConfig.width, cropConfig.height);
    image.crossOrigin = 'anonymous'; // Adiciona o atributo CORS
    image.src = fileUrl;

    const canvas = document.createElement('canvas');
    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;
    const ctx = canvas.getContext('2d');

    image.onload = () => {
      if (ctx) {
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
          image,
          croppedArea.x,
          croppedArea.y,
          croppedArea.width,
          croppedArea.height,
          0,
          0,
          croppedArea.width,
          croppedArea.height
        );
      }

      const base64Image = canvas.toDataURL(file?.type || 'image/png');

      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File(
            [blob],
            uuidv4() + extname(file?.name || 'image.png'),
            {
              type: file?.name || 'image/png',
            }
          );
          setFile(croppedFile);
          if (onSubmit) {
            onSubmit({
              file: croppedFile,
              url: base64Image,
            });
          }
          setIsImageSelected(false);
          setZoom(1);
        }
      }, file?.type || 'image/png');
    };
  };

  return (
    <Fragment>
      <div className='w-full max-w-[490px] rounded-md border border-slate-200 px-3 py-4'>
        {currentImage ? (
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

            <img src={currentImage.url} alt='img' />
            <div className='absolute top-4 right-4 flex gap-2'>
              <button
                type='button'
                onClick={handleEditImage}
                className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-white'
              >
                <IconEdit className='h-5 w-5' />
              </button>

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

      <CropModal
        isImageSelected={isImageSelected}
        setIsImageSelected={setIsImageSelected}
        onSubmitImage={onSubmitImage}
        fileUrl={fileUrl}
        crop={crop}
        zoom={zoom}
        setCrop={setCrop}
        onCropComplete={onCropComplete}
        setZoom={setZoom}
        handleChangeZoom={handleChangeZoom}
      />
    </Fragment>
  );
}
