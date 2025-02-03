import { useState } from 'react';

import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import { clsx } from 'clsx';
import { Controller } from 'react-hook-form';

import { InputProps } from './input.types';

export function Input({
  isPassword,
  label,
  error,
  name,
  control,
  ...rest
}: InputProps) {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <div className='flex flex-col w-full'>
      {label && (
        <label
          className={clsx('text-sm font-medium text-gray-600', {
            'text-red-500': error,
          })}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <div className='relative flex w-full items-center'>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              {...rest}
              type={
                isPassword ? (viewPassword ? 'text' : 'password') : rest.type
              }
              id={name}
              value={field.value}
              onChange={field.onChange}
              className={clsx(
                {
                  'border-red-500 ring-red-500 focus:ring-red-500': error,
                  'focus:ring-0 focus:ring-brand-default': !error,
                },
                'h-11 w-full rounded-lg border border-border-default px-[15px] font-normal text-gray-500 placeholder-gray-500'
              )}
            />
          )}
        />

        {isPassword && (
          <div className='absolute right-3 z-50'>
            <button
              type='button'
              data-testid='reveal-password'
              onClick={() => setViewPassword(!viewPassword)}
              className='flex cursor-pointer items-center justify-center p-1'
            >
              {viewPassword ? (
                <IconEye size={24} className='text-gray-500' />
              ) : (
                <IconEyeClosed size={24} className='text-gray-500' />
              )}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div
          data-testid={`error-input-${name}`}
          className='mt-[6px] flex items-center gap-[6px] text-sm text-red-500'
        >
          {error}
        </div>
      )}
    </div>
  );
}
