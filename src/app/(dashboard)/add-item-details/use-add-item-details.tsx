import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const inputSchema = z.object({
  name: z
    .string()
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(40, 'Digite no máximo 40 caracteres'),
  category: z.string().nonempty('Selecione uma categoria'),
  portion: z.string().nonempty('Digite a porção'),
  flagged: z.string(),
  price: z.string().nonempty('Digite o preço'),
  time: z.string().optional().nullable(),
  observations: z.string(),
});

type InputSchema = z.infer<typeof inputSchema>;

export function useAddItemDetails() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      name: '',
      observations: '',
      category: '',
      portion: '',
      price: '',
      flagged: 'no',
      time: '',
    },
  });

  const onSubmit: SubmitHandler<InputSchema> = async () => {};

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
