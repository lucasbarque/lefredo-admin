import { IconChevronRight } from '@tabler/icons-react';

import { StepperBarProps } from './stepper-bar.types';

const items = ['Detalhes', 'Fotos', 'Adicionais', 'Classificação', 'Sabores'];

export function StepperBar({ currentStepperIndex }: StepperBarProps) {
  return (
    <div className='flex items-center gap-3'>
      {items.map((item, index) => (
        <div key={index} className='flex items-center gap-3'>
          <button
            data-is-active={currentStepperIndex === index}
            className='group flex items-center gap-3'
          >
            <div className='group-data-[is-active=true]:border-brand-default font-work-sans group-data-[is-active=true]:text-brand-default flex h-6 w-6 items-center justify-center rounded-full border font-semibold text-gray-500'>
              {index + 1}
            </div>
            <div className='group-data-[is-active=true]:text-brand-default font-work-sans font-medium text-gray-500'>
              {item}
            </div>
          </button>
          {index < items.length - 1 && (
            <IconChevronRight size={16} className='text-gray-500' />
          )}
        </div>
      ))}
    </div>
  );
}
