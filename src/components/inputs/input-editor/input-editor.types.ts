import { InputHTMLAttributes } from 'react';

export type InputEditorProps = InputHTMLAttributes<HTMLElement> & {
  control?: any;
  name: string;
  label?: string;
  error?: string;
  isOptional?: boolean;
  height?: string;
  maxLength?: number;
  showErrorMessage?: boolean;
};
