import { IconChevronUp, IconDotsVertical, IconPlus } from '@tabler/icons-react';
import clsx from 'clsx';

import { Button } from '@components/inputs/button';
import { ToggleSwitch } from '@components/inputs/toggle-switch';

import { ItemList } from '../item-list';

interface Media {
  id: string;
  title: string;
  filename: string;
}

interface ItemsProps {
  id: string;
  title: string;
  price: number;
  isActive: boolean;
  medias: Media[];
}

interface CategoryListProps {
  category: {
    id: string;
    title: string;
    isActive: boolean;
    items: ItemsProps[];
  };
}

export function CategoryList({ category }: CategoryListProps) {
  return (
    <div
      className={clsx('border border-line pt-6 rounded-md', {
        'pb-6': category.items.length === 0,
      })}
    >
      <div className='flex items-center justify-between px-6'>
        <div className='font-bold text-[22px] text-title-default'>
          {category.title}
        </div>
        <div className='flex items-center gap-6'>
          <Button
            leftIcon={<IconPlus size={16} />}
            family='secondary'
            size='sm'
          >
            Adicionar item
          </Button>
          <ToggleSwitch label='Ativado' id='teste' />
          <div className='flex items-center gap-2'>
            <IconChevronUp size={22} className='text-gray-600 cursor-pointer' />
            <IconDotsVertical
              size={22}
              className='text-gray-600 cursor-pointer'
            />
          </div>
        </div>
      </div>
      <div>
        {category.items.length > 0 && (
          <div className='mt-6 flex items-center px-6 border-b border-line pb-3'>
            <div className='font-semibold text-title-secondary w-[70%]'>
              Item
            </div>
            <div className='font-semibold text-title-secondary w-[15%] text-center'>
              Preço
            </div>
            <div className='font-semibold text-title-secondary w-[15%] text-center'>
              Status de venda
            </div>
          </div>
        )}

        {category.items.length > 0 && (
          <div className='flex flex-col divide-line divide-y-1'>
            {category.items.map((item) => (
              <ItemList
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                isActive={item.isActive}
                coverPhoto={
                  item.medias.length > 0 ? item.medias[0].filename : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
