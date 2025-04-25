import { z } from 'zod';

const priceRegex =
  /^(?!0+(?:[.,]0{1,2})?$)(?:(?:[1-9]\d{0,2}(?:\.\d{3})*)|0)(?:[.,]\d{1,2})?$/;

export const createDishDetailsSchema = z.object({
  title: z
    .string()
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(500, 'Digite no máximo 500 caracteres'),
  portion: z.string().min(3, 'Digite a porção'),
  price: z
    .string()
    .regex(priceRegex, 'Digite um preço válido')
    .transform((value) => value.replace('.', '').replace(',', '.')),
  prepTime: z.string().nullable(),
  flagged: z.string(),
  description: z.string().nullable(),
  sectionId: z.string(),
});
