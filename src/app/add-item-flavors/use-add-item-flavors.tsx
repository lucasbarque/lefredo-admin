import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const inputSchema = z.object({
  select: z.string(),
});

type InputSchema = z.infer<typeof inputSchema>;

export function useAddItemFlavors() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      select: 'no',
    },
  });
  const select = watch('select');

  const onSubmit: SubmitHandler<InputSchema> = async () => {};

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    select,
  };
}
