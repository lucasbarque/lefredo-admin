import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';

import { StepperBarProps } from './stepper-bar.types';

export function StepperBar({ currentStepperIndex, items }: StepperBarProps) {
  return (
    <div className='flex items-center gap-3'>
      {items.map((item, index) => (
        <div key={index} className='flex items-center gap-3'>
          <Link
            href={item.link}
            data-is-active={currentStepperIndex === index}
            className='group flex cursor-pointer items-center gap-3'
          >
            <div className='group-data-[is-active=true]:border-brand-default font-work-sans group-data-[is-active=true]:text-brand-default flex h-6 w-6 items-center justify-center rounded-full border font-semibold text-gray-500'>
              {index + 1}
            </div>
            <div className='group-data-[is-active=true]:text-brand-default font-work-sans font-medium text-gray-500'>
              {item.title}
            </div>
          </Link>
          {index < items.length - 1 && (
            <IconChevronRight size={16} className='text-gray-500' />
          )}
        </div>
      ))}
    </div>
  );
}
