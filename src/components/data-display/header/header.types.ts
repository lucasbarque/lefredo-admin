import { MouseEventHandler } from 'react';

export interface HeaderProps {
  title: string;
  description?: string;
  backButton?: {
    title: string;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  };
}
