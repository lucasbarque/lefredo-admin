import { IconCloudUpload } from '@tabler/icons-react';

import { DropzoneProps } from './dropzone.types';

export function Dropzone({
  isDragActive,
  inputRef,
  dropZoneProps,
  label,
  additionalInfo,
}: DropzoneProps) {
  return (
    <div
      data-active={isDragActive}
      onClick={() => inputRef.current?.click()}
      {...dropZoneProps}
      className='data-[active=true]:border-brand-default hover:border-brand-default border-border-default relative flex cursor-pointer flex-col items-center rounded-md border-2 border-dashed p-6'
    >
      <div className='flex h-[68px] w-[68px] items-center justify-center rounded-full bg-slate-300'>
        <IconCloudUpload className='text-gray-600' size={40} />
      </div>
      <div className='mt-4 mb-5'>
        <p className='text-title-default text-center font-semibold'>{label}</p>
        {additionalInfo && (
          <p className='text-body-3-regular mt-1 text-gray-600'>
            {additionalInfo}
          </p>
        )}
      </div>
      <span className='text-title-secondary border-border-default rounded-md border px-10 py-2 font-semibold hover:bg-gray-400/50'>
        Escolher imagens
      </span>
    </div>
  );
}
