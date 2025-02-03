import React from 'react';

import * as Switch from '@radix-ui/react-switch';
import { clsx } from 'clsx';

type ToggleSwitchProps = React.ComponentProps<typeof Switch.Root> & {
  label?: string;
  id?: string;
};

type ToggleThumbProps = React.ComponentProps<typeof Switch.Thumb>;

const ToggleThumb = (props: ToggleThumbProps) => (
  <Switch.Thumb
    className={clsx(
      'block size-[18px] translate-x-1 rounded-full bg-white',
      'transition-transform duration-100',
      'will-change-transform data-[state=checked]:translate-x-[19px]'
    )}
    {...props}
  />
);

const ToggleSwitch = ({
  label,
  id = 'toggle-switch',
  ...props
}: ToggleSwitchProps) => {
  return (
    <div className='flex items-center flex-col'>
      {label && (
        <label
          className='text-title-secondary text-sm select-none'
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <Switch.Root
        className={clsx(
          'relative h-[24px] w-[42px] rounded-full cursor-pointer',
          'bg-border-default outline-none',
          'data-[state=checked]:bg-brand-default'
        )}
        id={id}
        {...props}
      >
        <ToggleThumb />
      </Switch.Root>
    </div>
  );
};

ToggleSwitch.Root = Switch.Root;
ToggleSwitch.Thumb = ToggleThumb;
export { ToggleSwitch };
