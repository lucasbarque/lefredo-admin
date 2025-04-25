import { InputHTMLAttributes } from 'react';

export interface SelectProps extends InputHTMLAttributes<HTMLElement> {
  id: string;
  name: string;
  control: any;
  label?: string;
  error?: string;
  placeholder?: string;
  isOptional?: boolean;
  required?: boolean;
  options: { value: string; label: string }[];
}
