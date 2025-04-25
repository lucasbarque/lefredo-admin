import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  amount: number | string,
  type: 'to-real' | 'to-decimal'
) => {
  switch (type) {
    case 'to-real':
      const numericValue = Number(amount);
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(numericValue);
    case 'to-decimal':
      const stringValue = String(amount);
      const normalizedValue = stringValue.replace(/\./g, '').replace(',', '.');
      const numericValue1 = parseFloat(normalizedValue);
      const valueInCents = Math.round(numericValue1 * 100);
      return String(valueInCents);
    default:
      throw new Error(`Tipo de formatação inválido: ${type}`);
  }
};

export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');

export const extname = (filePath: string) => {
  if (typeof filePath !== 'string') {
    throw new TypeError('O argumento deve ser uma string');
  }

  const lastSlash = Math.max(
    filePath.lastIndexOf('/'),
    filePath.lastIndexOf('\\')
  );

  const base = lastSlash !== -1 ? filePath.slice(lastSlash + 1) : filePath;

  const lastDot = base.lastIndexOf('.');

  if (lastDot <= 0) return '';

  return base.slice(lastDot);
};

export async function fetcher<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    method: options.method ?? 'GET',
    ...options,
  });

  if (!res.ok) {
    const error = new Error('Request failed');
    (error as any).status = res.status;
    throw error;
  }

  return (await res.json()) as T;
}
