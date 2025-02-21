import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const inputSchema = z.object({
  name: z
    .string()
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(40, 'Digite no máximo 40 caracteres'),
  price: z.string().nonempty('Digite o preço'),
});

type InputSchema = z.infer<typeof inputSchema>;

export function useAddItemAdditionals() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      name: '',
      price: '',
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
