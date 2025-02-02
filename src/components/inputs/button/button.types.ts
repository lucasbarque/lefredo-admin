import { ComponentProps, ReactNode } from 'react';

export type ButtonProps = ComponentProps<'button'> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  family?: 'primary' | 'secondary';
  size?: 'md' | 'sm' | 'lg';
  fullSize?: boolean;
};
