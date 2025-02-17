import { FC, useEffect } from 'react';

import clsx from 'clsx';
import { Controller } from 'react-hook-form';

import { FormEditor } from '../form-editor';
import { InputEditorProps } from './input-editor.types';

export const InputEditor: FC<InputEditorProps> = ({
  control,
  name,
  label,
  error,
  isOptional,
  height,
  maxLength,
  showErrorMessage = true,
  ...props
}) => {
  useEffect(() => {
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.classList.add('notranslate');
  }, []);
  return (
    <div className='flex w-full flex-col' translate='no'>
      {label && (
        <label
          className={clsx('text-sm font-medium text-gray-600', {
            'text-red-500': error,
          })}
          htmlFor={name}
        >
          {label}
          {isOptional && (
            <span className='text-brand-text text-xs'> (Opcional)</span>
          )}
        </label>
      )}
      <div
        className={clsx('rounded-md ', {
          'ring-1 ring-red-500': error,
        })}
      >
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <FormEditor
              name={name}
              setUpdateHtmlContent={(value: string) =>
                onChange(value === '<p></p>' ? null : value)
              }
              htmlContentInitial={value}
              height={height}
              maxLength={maxLength}
              placeholder={props.placeholder}
            />
          )}
        />
      </div>
      {error && showErrorMessage && (
        <div
          data-testid={`error-input-${name}`}
          className='mt-[6px] flex items-center gap-[6px]'
        >
          {error}
        </div>
      )}
    </div>
  );
};
