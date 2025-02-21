import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const inputSchema = z.object({
  category: z.string(),
});

type CategoryFormSchema = z.infer<typeof inputSchema>;

export function useFirstCategoryCreate() {
  const {
    control,
    formState: { errors },
  } = useForm<CategoryFormSchema>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      category: '',
    },
  });
  return {
    control,
    errors,
  };
}
