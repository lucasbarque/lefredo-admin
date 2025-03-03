import { createDishAPI } from '@/actions/dish.action';
import { createDishDetailsSchema } from '@/validations/dish-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function useAddItemDetails(categoryId: string) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createDishDetailsSchema>>({
    resolver: zodResolver(createDishDetailsSchema),
    defaultValues: {
      title: '',
      portion: '',
      price: '0,00',
      flagged: 'false',
      prepTime: '',
      description: '',
      sectionId: categoryId,
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<
    z.infer<typeof createDishDetailsSchema>
  > = async (data) => {
    const response = await createDishAPI(data);

    if (response.status !== 201) {
      return toast.error(
        'Falha ao criar item. Por favor, tente novamente mais tarde'
      );
    }
    toast.success('Item criado com sucesso.', { position: 'top-right' });
    router.replace(`/add-item-photos/${response.data.id}`);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
