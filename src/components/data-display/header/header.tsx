import { IconChevronLeft } from '@tabler/icons-react';

import { Button } from '@/components/inputs/button';

import { HeaderProps } from './header.types';

export function Header({ title, description, backButton }: HeaderProps) {
  return (
    <div>
      {backButton && (
        <Button family='tertiary' size='sm' onClick={backButton.onClick}>
          <Button.Icon>
            <IconChevronLeft size={16} />
          </Button.Icon>
          {backButton.title}
        </Button>
      )}

      <h2 className='text-title-default text-[1.75rem] leading-none font-extrabold'>
        {title}
      </h2>
      {description && (
        <p className='text-text-default max-w-[390px] text-lg'>{description}</p>
      )}
    </div>
  );
}
