import { yupResolver } from '@hookform/resolvers/yup';
import { IconCamera, IconDotsVertical } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { InputCashout } from '@components/inputs/input-cashout/input-cashout';
import { ToggleSwitch } from '@components/inputs/toggle-switch';

interface FormPrice {
  price?: string;
}

interface ItemListProps {
  id: string;
  title: string;
  price: number;
  isActive: boolean;
  coverPhoto?: string;
}

export function ItemList({
  id,
  title,
  price,
  isActive,
  coverPhoto,
}: ItemListProps) {
  const inputSchema = yup.object({
    price: yup
      .string()
      .transform((value) => value.replace('.', '').replace(',', '.'))
      .matches(/^\d+(\.\d{1,2})?$/),
  });

  console.log(isActive);

  const { control } = useForm<FormPrice>({
    resolver: yupResolver(inputSchema),
    defaultValues: {
      price:
        new Intl.NumberFormat('pt-BR', {
          style: 'decimal',
          currency: 'BRL',
          minimumFractionDigits: 2,
        }).format(price / 100) ?? '0,00',
    },
  });

  return (
    <div className='flex items-center px-6 py-3'>
      <div className='w-[70%] flex items-center gap-4'>
        {coverPhoto ? (
          <img className='w-16 h-16 rounded-2xl' src={coverPhoto} alt='' />
        ) : (
          <div className='border border-dashed w-16 h-16 rounded-2xl border-line items-center justify-center flex'>
            <IconCamera size={24} className='text-border-default' />
          </div>
        )}

        <div className='text-sm font-medium text-title-secondary'>{title}</div>
      </div>
      <form className='w-[15%]'>
        <InputCashout
          id={id}
          control={control}
          name='price'
          placeholder='0,00'
          withSideLabel
          sideLabelText='R$'
          limitCash={10000}
        />
      </form>
      <div className='w-[15%] pr-6'>
        <div className='flex items-center w-full justify-center'>
          <div className='flex-1'>
            <ToggleSwitch label='Ativado' id='teste2' />
          </div>
          <IconDotsVertical
            size={22}
            className='text-gray-600 cursor-pointer'
          />
        </div>
      </div>
    </div>
  );
}
