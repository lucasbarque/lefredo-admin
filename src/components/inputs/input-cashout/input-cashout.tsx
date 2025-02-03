import { InputHTMLAttributes } from 'react';

import { clsx } from 'clsx';
import { Controller } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLElement> {
  name: string;
  control: any;
  withSideLabel?: boolean;
  sideBarPosition?: 'left' | 'right';
  sideLabelText?: string;
  label?: string;
  error?: string;
  limitCash?: number;
  isOptional?: boolean;
}

export function InputCashout({
  label,
  error,
  name,
  control,
  isOptional,
  withSideLabel,
  limitCash = 1000000,
  sideLabelText = 'XX',
  sideBarPosition = 'left',
  ...rest
}: InputProps) {
  const formatCurrency = (value: string) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
    return formatter.format(Number(value) / 100);
  };
  return (
    <div className='flex w-full flex-col'>
      {label && (
        <label
          className={clsx('mb-[6px] font-medium', {
            'text-gray-400': rest.disabled,
            'text-gray-500': !rest.disabled,
          })}
          htmlFor={name}
        >
          <div className='flex items-center justify-between w-full'>
            {label}
          </div>
          {isOptional && (
            <span className='ml-2 text-body-3-regular'>(opcional)</span>
          )}
        </label>
      )}

      <div className='relative flex w-full items-center'>
        {withSideLabel && sideBarPosition === 'left' && (
          <div className='flex h-full w-[53px] items-center justify-center rounded-s-md border-b border-l border-t border-line py-2 text-text-default'>
            {sideLabelText}
          </div>
        )}

        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              type='text'
              id={name}
              value={field.value}
              onChange={(e) => {
                const rawValue = e.target.value;
                const numericValue = rawValue.replace(/\D/g, '');
                if (Number(numericValue) / 100 > limitCash) return;
                const formattedValue = formatCurrency(numericValue);
                field.onChange(formattedValue); // Atualize o valor diretamente no react-hook-form
              }}
              className={clsx(
                {
                  'rounded-e-md': sideBarPosition === 'left',
                  'rounded-s-md': sideBarPosition === 'right',
                  'rounded-md': !withSideLabel,
                  'bg-[#FCEDEF] ring-2 ring-danger-pure': error,
                  'focus:ring-brand-medium-2': !error,
                },
                'relative w-full border border-line px-4 py-2 font-nunito-sans text-text-default outline-0 transition-all duration-200 placeholder:text-text-default hover:border-gray-3 focus:border-brand-default focus:ring-[0.5px] focus:ring-brand-default focus:ring-offset-[0px] focus:text-title-default disabled:bg-gray-2 disabled:text-gray-6'
              )}
              {...rest}
            />
          )}
        />

        {withSideLabel && sideBarPosition === 'right' && (
          <div className='flex h-full w-[53px] items-center justify-center rounded-e-md border-b border-r border-t border-gray-4 py-3 font-nunito-sans text-gray-5'>
            {sideLabelText}
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
