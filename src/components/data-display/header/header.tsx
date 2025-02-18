import { IconChevronLeft } from '@tabler/icons-react';

import { Button } from '@components/inputs/button';

import { HeaderProps } from './header.types';

export function Header({ title, description, backButton }: HeaderProps) {
  return (
    <div>
      {backButton && (
        <div className='pb-3'>
          <Button family='tertiary' onClick={backButton.onClick}>
            <Button.Icon>
              <IconChevronLeft size={16} />
            </Button.Icon>
            {backButton.title}
          </Button>
        </div>
      )}

      <h2 className='font-extrabold text-[1.75rem] text-title-default'>
        {title}
      </h2>
      {description && (
        <p className='text-text-default max-w-[390px] text-lg'>{description}</p>
      )}
    </div>
  );
}
