import clsx from 'clsx';
import { Controller } from 'react-hook-form';

import { InputGroupProps } from './input-radio.types';

export function InputRadio({
  name,
  control,
  selected,
  options,
  label,
  isOptional,
  error,
  ...rest
}: InputGroupProps) {
  return (
    <div className='flex w-full flex-col'>
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

      <Controller
        control={control}
        name={name}
        defaultValue={selected}
        render={({ field }) => (
          <div className='flex flex-col gap-2'>
            {options.map((option) => (
              <div className='flex items-center gap-3' key={option.title}>
                <input
                  id={option.title}
                  type='radio'
                  className='checked:border-brand-default max-h-[20px] min-h-[20px] max-w-[20px] min-w-[20px] cursor-pointer appearance-none rounded-full border border-gray-600 bg-gray-100 checked:border-[6px]'
                  onChange={field.onChange}
                  checked={selected === option.value}
                  value={option.value}
                  {...rest}
                />

                <label
                  htmlFor={option.title}
                  key={option.title}
                  className='w-full cursor-pointer items-center'
                >
                  <span className='text-title-secondary font-medium'>
                    {option.title}
                  </span>
                </label>
              </div>
            ))}
          </div>
        )}
      />
      {error && (
        <div className='mt-[6px] flex items-center gap-[6px]'>{error}</div>
      )}
    </div>
  );
}
