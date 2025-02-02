import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface SidebarItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  title: string;
  icon: ReactNode;
}
