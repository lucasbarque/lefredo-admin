import { InputHTMLAttributes } from 'react';

export interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  selected: string;
  label?: string;
  isOptional?: boolean;
  error?: string;
  options: Array<{
    title: string;
    value: string;
  }>;
}
