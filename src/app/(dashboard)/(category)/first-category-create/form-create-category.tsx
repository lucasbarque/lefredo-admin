'use client';

import { createSectionAPI } from '@/actions/section.action';
import { createFirstCategorySchema } from '@/validations/sections-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';

export function FormCreateCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createFirstCategorySchema>>({
    resolver: zodResolver(createFirstCategorySchema),
    defaultValues: {
      title: '',
    },
  });

  async function onSubmit(data: z.infer<typeof createFirstCategorySchema>) {
    const response = await createSectionAPI({
      title: data.title,
      description: null,
    });
    if (response.status === 201) {
      toast.success('Categoria criada com sucesso', {
        position: 'top-right',
      });
      queryClient.invalidateQueries({ queryKey: ['sections'] });
      router.push('/menu-list');
    } else {
      toast.error('Falha ao criar categoria. Tente novamente mais tarde.', {
        position: 'top-right',
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mt-5 flex w-full max-w-[464px] flex-col items-end gap-4'
    >
      <Input
        name='title'
        control={control}
        error={errors.title?.message}
        placeholder='Digite o nome da categoria'
      />
      <Button size='sm' type='submit'>
        Cadastrar primeira categoria
      </Button>
    </form>
  );
}
