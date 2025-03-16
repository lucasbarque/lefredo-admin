import { createSectionAPI } from '@/actions/section.action';
import { revalidateSectionsWithItems } from '@/app/actions';
import { createCategorySchema } from '@/validations/sections-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export function useCreateCategory() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createCategorySchema>> = async (
    data
  ) => {
    // @ts-ignore
    const response = await createSectionAPI(data);

    if (response.status === 201) {
      toast.success('Categoria criada com sucesso', {
        position: 'top-right',
      });
      await revalidateSectionsWithItems();
      return router.push('/menu-list');
    } else if (response.status === 409) {
      setError('title', {
        message:
          'Digite um título diferente, já existe uma categoria com este título cadastrado.',
      });
      toast.error('Falha ao cadastrar categoria. Título já existe.', {
        position: 'top-right',
      });
    } else {
      toast.error('Falha ao cadastrar categoria. Tente novamente mais tarde', {
        position: 'top-right',
      });
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    router,
  };
}
