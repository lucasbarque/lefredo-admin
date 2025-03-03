import { InputHTMLAttributes } from 'react';

import { clsx } from 'clsx';
import { Controller } from 'react-hook-form';

import { InputErrorFeedback, InputLabel } from '../input/input';

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
  isOptional = false,
  withSideLabel,
  limitCash = 1000000,
  sideLabelText = 'XX',
  sideBarPosition = 'left',
  ...rest
}: InputProps) {
  const formatCurrencyAmount = (value: string) => {
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
        <InputLabel
          name={name}
          label={label}
          isOptional={isOptional}
          isDisabled={!!rest.disabled}
        />
      )}

      <div className='relative flex w-full items-center'>
        {withSideLabel && sideBarPosition === 'left' && (
          <div className='border-line text-text-default flex h-11 w-[53px] items-center justify-center rounded-s-md border-t border-b border-l'>
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
                const formattedValue = formatCurrencyAmount(numericValue);
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
                'border-line font-nunito-sans text-title-default placeholder:text-text-default hover:border-gray-3 focus:border-brand-default focus:ring-brand-default focus:text-title-default disabled:bg-gray-2 disabled:text-gray-6 relative h-11 w-full border px-4 outline-0 transition-all duration-200 focus:ring-[0.5px] focus:ring-offset-[0px]'
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

      {error && <InputErrorFeedback error={error} />}
    </div>
  );
}
