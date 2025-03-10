import { createSectionAPI } from '@/actions/section.action';
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
    const responseStatus = await createSectionAPI(data);

    if (responseStatus === 201) {
      toast.success('Categoria criada com sucesso', {
        position: 'top-right',
      });
      return router.push('/menu-list');
    }
    toast.error('Falha ao cadastrar categoria. Tente novamente mais tarde', {
      position: 'top-right',
    });
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
