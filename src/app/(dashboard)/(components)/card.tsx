import { ReactNode } from 'react';

import { IconCategory, IconFish, IconToolsKitchen } from '@tabler/icons-react';

import { LoadingSpinner } from '@/components/data-display/loading-spinner/loading-spinner';

export type CardTypes = 'category' | 'dish' | 'flavors';

export interface CardProps {
  title: string;
  value: number;
  type: CardTypes;
  isLoading: boolean;
}

export function Card({ title, value, type, isLoading }: CardProps) {
  const valueFormatted = String(value).padStart(2, '0');

  const icons: Record<CardTypes, ReactNode> = {
    category: <IconCategory size={24} className='text-brand-default' />,
    dish: <IconToolsKitchen size={24} className='text-brand-default' />,
    flavors: <IconFish size={24} className='text-brand-default' />,
  };

  return (
    <div className='flex w-full items-center gap-4 rounded-2xl p-5 shadow-[0px_1px_8.9px_0px_rgba(0,_0,_0,_0.13)]'>
      <div className='bg-brand-default/20 flex h-14 w-14 items-center justify-center rounded-full'>
        {icons[type]}
      </div>
      <div>
        <div className='font-medium text-gray-600'>{title}</div>
        <div className='text-title-default text-2xl font-extrabold'>
          {isLoading ? <LoadingSpinner family='secondary' /> : valueFormatted}
        </div>
      </div>
    </div>
  );
}
