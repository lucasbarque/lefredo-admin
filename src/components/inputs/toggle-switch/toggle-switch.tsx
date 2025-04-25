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

const ToggleSwitch = ({ label, ...props }: ToggleSwitchProps) => {
  return (
    <div
      className={clsx('flex flex-col items-center', {
        'animate-pulse': props.disabled === true,
      })}
    >
      {label && (
        <label
          className='text-title-secondary cursor-pointer text-sm select-none'
          htmlFor={props.id}
        >
          {label}
        </label>
      )}
      <Switch.Root
        className={clsx(
          'relative h-[24px] w-[42px] cursor-pointer rounded-full',
          'bg-border-default outline-none',
          'data-[state=checked]:bg-brand-default'
        )}
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
