import clsx from 'clsx';
import { Controller } from 'react-hook-form';

import { InputLabel } from '../input/input';
import { FormEditor } from './form-editor';
import { InputEditorProps } from './input-editor.types';

export function InputEditor({
  control,
  name,
  label,
  error,
  isOptional = false,
  height,
  maxLength,
  showErrorMessage = true,
  ...props
}: InputEditorProps) {
  return (
    <div className='flex w-full flex-col' translate='no'>
      {label && (
        <InputLabel
          name={name}
          label={label}
          isOptional={isOptional}
          isDisabled={!!props.disabled}
        />
      )}
      <div
        className={clsx('rounded-md', {
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
              disabled={props.disabled}
            />
          )}
        />
      </div>

      {error && showErrorMessage && (
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
