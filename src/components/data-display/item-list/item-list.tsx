import { yupResolver } from '@hookform/resolvers/yup';
import {
  IconCamera,
  IconDotsVertical,
  IconEdit,
  IconListDetails,
  IconTrash,
} from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { InputCashout } from '@components/inputs/input-cashout/input-cashout';
import { ToggleSwitch } from '@components/inputs/toggle-switch';
import { DropdownMenu } from '@components/navigation/dropdown-menu';

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
      <div className='flex w-[70%] items-center gap-4'>
        {coverPhoto ? (
          <img className='h-16 w-16 rounded-2xl' src={coverPhoto} alt='' />
        ) : (
          <div className='border-line flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed'>
            <IconCamera size={24} className='text-border-default' />
          </div>
        )}

        <div className='text-title-secondary text-sm font-medium'>{title}</div>
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
      <div className='w-[15%]'>
        <div className='flex w-full items-center justify-center'>
          <div className='flex-1'>
            <ToggleSwitch label='Ativado' id='teste2' />
          </div>
          <DropdownMenu>
            <DropdownMenu.Item>
              <DropdownMenu.Trigger>
                <IconDotsVertical
                  size={22}
                  className='z-1 cursor-pointer text-gray-600'
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                dropdownItems={[
                  {
                    icon: <IconEdit size={20} className='text-gray-700' />,
                    linkProps: { href: '#' },
                    title: 'Editar categoria',
                  },
                  {
                    icon: (
                      <IconListDetails size={20} className='text-gray-700' />
                    ),
                    linkProps: { href: '#' },
                    title: 'Duplicar item',
                  },
                ]}
                lastDropdownItems={[
                  {
                    icon: <IconTrash size={20} className='text-gray-700' />,
                    linkProps: { href: '#' },
                    title: 'Excluir item',
                  },
                ]}
              />
            </DropdownMenu.Item>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
