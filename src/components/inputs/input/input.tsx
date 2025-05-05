'use client';

import { useState } from 'react';

import {
  IconExclamationCircle,
  IconEye,
  IconEyeClosed,
} from '@tabler/icons-react';
import { clsx } from 'clsx';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from 'react-hook-form';

import { InputProps } from './input.types';

export function InputErrorFeedback({
  error,
  name,
}: {
  error: string;
  name: string;
}) {
  return (
    <div className='mt-1 flex items-center gap-1 text-red-500'>
      <IconExclamationCircle size={16} />
      <span data-testid={`error-input-${name}`}>{error}</span>
    </div>
  );
}

export function InputLabel({
  name,
  label,
  isOptional,
  isDisabled,
}: {
  name: string;
  label: string;
  isOptional: boolean;
  isDisabled: boolean;
}) {
  return (
    <label
      data-is-disabled={isDisabled}
      className='font-work-sans font-medium text-gray-600 data-[is-disabled=true]:text-gray-500'
      htmlFor={name}
    >
      {label}
      {isOptional && (
        <span className='font-work-sans text-sm font-normal text-gray-500'>
          {' '}
          (Opcional)
        </span>
      )}
    </label>
  );
}

export function Input({
  isPassword,
  isOptional = false,
  label,
  error,
  name,
  control,
  countCharacters,
  countCharacterslength = 40,
  ...rest
}: InputProps) {
  const [viewPassword, setViewPassword] = useState(false);
  const [count, setCount] = useState(0);

  const onChangeText = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    field.onChange(event);

    const value = event.target.value;
    setCount(value.length);
  };

  return (
    <div
      className='group flex w-full flex-col'
      data-is-error={error ? 'true' : 'false'}
    >
      {label && (
        <InputLabel
          name={name}
          label={label}
          isOptional={isOptional}
          isDisabled={!!rest.disabled}
        />
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
              onChange={(e) => onChangeText(e, field)}
              className='border-border-default text-title-default outline-brand-default group-data-[is-error=true]:bg-danger-light h-11 w-full rounded-lg border bg-white px-[15px] font-normal placeholder-gray-500 group-data-[is-error=true]:border-red-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-gray-600'
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

      <div className='justify-betweeen flex items-center'>
        {error && <InputErrorFeedback error={error} name={name} />}

        {countCharacters && (
          <span
            className={clsx('ml-auto text-sm text-gray-600', {
              'text-red-500': error,
            })}
          >
            {count}/{countCharacterslength}
          </span>
        )}
      </div>
    </div>
  );
}
