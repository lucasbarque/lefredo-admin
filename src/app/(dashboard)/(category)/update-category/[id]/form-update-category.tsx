'use client';

import { updateSectionAPI } from '@/actions/sections.action';
import { updateCategorySchema } from '@/validations/sections-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputEditor } from '@/components/inputs/input-editor';

import { FormUpdateCategoryProps } from './update-category.types';

export function FormUpdateCategory({ initialData }: FormUpdateCategoryProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof updateCategorySchema>>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description || '',
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof updateCategorySchema>> = async (
    data
  ) => {
    const responseStatus = await updateSectionAPI(initialData.id, data);
    if (responseStatus === 200) {
      toast.success('Categoria atualizada com sucesso', {
        position: 'top-right',
      });
      return router.push('/menu-list');
    }
    toast.error('Falha ao atualizar categoria. Tente novamente mais tarde', {
      position: 'top-right',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        id='title'
        name='title'
        label='Título'
        control={control}
        error={errors.title?.message}
        countCharacters
        maxLength={40}
        placeholder='Exemplo: Salgados'
      />

      <InputEditor
        id='description'
        name='description'
        label='Observações'
        control={control}
        placeholder='Obs: Esse texto que será exibido em todos os produtos desta categoria'
        error={errors.description?.message}
        isOptional
        maxLength={500}
      />
      <div className='mt-4 flex justify-end gap-2.5'>
        <Button
          size='sm'
          family='secondary'
          type='button'
          disabled={isSubmitting}
          onClick={() => router.push('/menu-list')}
        >
          Cancelar
        </Button>
        <Button
          size='sm'
          disabled={isSubmitting}
          type='submit'
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Carregando' : 'Atualizar categoria'}
        </Button>
      </div>
    </form>
  );
}
