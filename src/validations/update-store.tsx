import { z } from 'zod';

export const updateStoreSchema = z.object({
  name: z
    .string()
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(40, 'Digite no máximo 40 caracteres'),
  logo: z.string(),
  welcomeMessage: z.string().optional().nullable(),
});
