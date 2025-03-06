import { z } from 'zod';

export const createFlavorSchema = z.object({
  title: z
    .string()
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(500, 'Digite no máximo 500 caracteres'),
  label: z
    .string()
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(100, 'Digite no máximo 100 caracteres'),
  price: z
    .string()
    .transform((value) => value.replace('.', '').replace(',', '.')),
  description: z.string(),
});
