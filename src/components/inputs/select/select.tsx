import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Controller } from 'react-hook-form';

import { InputLabel } from '../input';
import { SelectProps } from './select.types';

// Carrega o ReactSelect apenas no cliente, evitando problemas de hidratação
const ReactSelect = dynamic(() => import('react-select'), { ssr: false });

export function Select({
  id,
  label,
  error,
  control,
  name,
  placeholder = 'Selecione',
  isOptional = false,
  options,
  ...props
}: SelectProps) {
  return (
    <div
      data-is-disabled={props.disabled}
      className='flex w-full flex-col data-[is-disabled=true]:cursor-not-allowed'
    >
      {label && (
        <InputLabel
          name={name}
          label={label}
          isOptional={isOptional}
          isDisabled={!!props.disabled}
        />
      )}

      <div className='font-work-sans relative flex w-full items-center'>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <ReactSelect
              instanceId={id}
              className='w-full'
              placeholder={placeholder}
              value={options.find((item) => item.value === field.value)}
              //@ts-ignore
              onChange={(item: any) => field.onChange(item.value)}
              options={options}
              classNames={{
                control: () =>
                  clsx(
                    'h-11 !rounded-lg !border-border-default !transition-all !duration-300',
                    {
                      '!border-red-500 !bg-red-500/5': error,
                    }
                  ),
                placeholder: () => '!text-gray-500 !font-medium',
                dropdownIndicator: () =>
                  '!text-gray-600 !transition-all !duration-300 border-none',
                menuList: () => '!bg-brand-background !text-gray-500 !p-0',
                option: ({ isSelected, isFocused }) =>
                  clsx('!text-gray-500 hover:!text-gray-600', {
                    '!text-white hover:!text-white !bg-brand-default hover:!bg-brand-default':
                      isSelected,
                    '!text-title-default': isFocused,
                  }),
                singleValue: () => '!text-title-default font-medium ',
                indicatorSeparator: () => '!hidden',
              }}
              styles={{
                dropdownIndicator: (base, state) => ({
                  ...base,
                  rotate: state.selectProps.menuIsOpen ? '180deg' : '0deg',
                }),
                control: (base, state) => ({
                  ...base,
                  boxShadow: state.isFocused
                    ? '0 0 0 2px var(--color-brand-default)'
                    : 'none',
                  backgroundColor: state.isDisabled
                    ? 'rgb(242, 244, 247)'
                    : 'white',
                }),
              }}
              isDisabled={props.disabled}
              {...props}
            />
          )}
        />
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
