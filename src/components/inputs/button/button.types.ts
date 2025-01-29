import { ComponentProps, ReactNode } from 'react';

export type ButtonProps = ComponentProps<'button'> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'md' | 'sm';
  fullSize?: boolean;
};
