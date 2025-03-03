import { ButtonHTMLAttributes } from 'react';

interface BackButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export interface HeaderProps {
  title: string;
  description?: string;
  backButton?: BackButton;
}
