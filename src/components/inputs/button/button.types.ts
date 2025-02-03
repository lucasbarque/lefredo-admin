import { ComponentProps, ReactNode } from 'react';

export type ButtonProps = ComponentProps<'button'> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  family?: 'primary' | 'secondary' | 'tertiary';
  size?: 'md' | 'sm' | 'lg';
  fullSize?: boolean;
};
