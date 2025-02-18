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

      <div className='relative flex w-full items-center'>
        {withSideLabel && sideBarPosition === 'left' && (
          <div className='border-line text-text-default flex h-full w-[53px] items-center justify-center rounded-s-md border-t border-b border-l py-2'>
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
                  'border-red-500 bg-red-500/5 ring-0': error,
                  'focus:ring-0': !error,
                },
                'border-line font-nunito-sans text-title-default placeholder:text-text-default hover:border-gray-3 focus:border-brand-default focus:ring-brand-default focus:text-title-default disabled:bg-gray-2 disabled:text-gray-6 relative w-full border px-4 py-2 outline-0 transition-all duration-200 focus:ring-[0.5px] focus:ring-offset-[0px]'
              )}
              {...rest}
            />
          )}
        />

        {withSideLabel && sideBarPosition === 'right' && (
          <div className='border-gray-4 font-nunito-sans text-gray-5 flex h-full w-[53px] items-center justify-center rounded-e-md border-t border-r border-b py-3'>
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
