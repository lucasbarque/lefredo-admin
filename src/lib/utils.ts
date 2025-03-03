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

  // Encontrar a posição do último separador de diretório ('/' ou '\')
  const lastSlash = Math.max(
    filePath.lastIndexOf('/'),
    filePath.lastIndexOf('\\')
  );

  // Obter a última parte do caminho (nome do arquivo)
  const base = lastSlash !== -1 ? filePath.slice(lastSlash + 1) : filePath;

  // Encontrar a última ocorrência do ponto
  const lastDot = base.lastIndexOf('.');

  // Se não houver ponto ou se o ponto estiver na primeira posição, não há extensão
  if (lastDot <= 0) return '';

  // Retornar a extensão (incluindo o ponto)
  return base.slice(lastDot);
};
