import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { CreateCategoryForm } from './create-category.types';

export function useCreateCategory() {
  const inputSchema = yup.object({
    name: yup
      .string()
      .min(3, 'Digite no mínimo 3 caracteres')
      .max(40, 'Digite no máximo 40 caracteres')
      .required('Nome da categoria é obrigatório'),
    observations: yup.string().optional().nullable(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryForm>({
    resolver: yupResolver(inputSchema),
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
