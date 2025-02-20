import { ReactNode } from 'react';

export interface ClassificatinItemProps {
  title: string;
  description: string;
  icon: ReactNode;
  isActive?: boolean;
}
