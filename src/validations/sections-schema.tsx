import { z } from 'zod';

export const createCategorySchema = z.object({
  title: z
    .string()
    .nonempty()
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(40, 'Digite no máximo 40 caracteres'),
  description: z.string().nullable(),
});

export const updateCategorySchema = z.object({
  title: z
    .string()
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(40, 'Digite no máximo 40 caracteres'),
  description: z.string().nullable(),
});
