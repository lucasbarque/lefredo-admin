import { InputHTMLAttributes } from 'react';

export type InputProps = {
  name: string;
  control: any;
  label?: string;
  error?: string;
  viewPassword?: boolean;
  isPassword?: boolean;
  countCharacters?: boolean;
  countCharacterslength?: number;
} & InputHTMLAttributes<HTMLElement>;
