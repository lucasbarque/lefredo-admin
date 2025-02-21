import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CreateCategoryForm } from './create-category.types';

export function useCreateCategory() {
  const inputSchema = z.object({
    name: z
      .string()
      .min(3, 'Digite no mínimo 3 caracteres')
      .max(40, 'Digite no máximo 40 caracteres')
      .nonempty('Nome da categoria é obrigatório'),
    observations: z.string().optional().nullable(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryForm>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      name: '',
      observations: '',
    },
  });

  const onSubmit: SubmitHandler<CreateCategoryForm> = async () => {};

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
