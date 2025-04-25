import { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'> & {
  family?: 'primary' | 'secondary' | 'tertiary';
  size?: 'md' | 'sm' | 'lg';
  fullSize?: boolean;
  isLoading?: boolean;
};

export type ButtonIconProps = ComponentProps<'span'>;
