'use client';

import { createSectionAPI } from '@/actions/section.action';
import { createCategorySchema } from '@/validations/sections-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputEditor } from '@/components/inputs/input-editor';

export default function PageCreateCategory() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (data: z.infer<typeof createCategorySchema>) => {
      // @ts-ignore
      return await createSectionAPI(data);
    },
    onSuccess: async (response) => {
      console.log(response);
      if (response.status === 201) {
        toast.success('Categoria criada com sucesso', {
          position: 'top-right',
        });
        router.push('/menu-list');
      } else if (response.status === 409) {
        setError('title', {
          message:
            'Digite um título diferente, já existe uma categoria cadastrada com este título.',
        });
        toast.warning('Já existe uma categoria cadastrada com este título.', {
          position: 'top-right',
        });
      } else {
        toast.error(
          'Falha ao cadastrar categoria. Tente novamente mais tarde',
          {
            position: 'top-right',
          }
        );
      }
    },
    onError: () => {
      toast.error('Falha ao cadastrar categoria. Tente novamente mais tarde', {
        position: 'top-right',
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createCategorySchema>> = (
    data
  ) => {
    createCategoryMutation.mutate(data);
  };

  return (
    <section>
      <Header
        backButton={{
          onClick: () => router.push('/menu-list'),
          title: 'Voltar',
        }}
        title='Nova categoria'
        description='Preencha as informações da nova categoria.'
      />
      <div className='pt-6'>
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
            maxLength={100}
          />
          <div className='mt-4 flex justify-end gap-2.5'>
            <Button
              size='sm'
              family='secondary'
              type='button'
              disabled={createCategoryMutation.isPending}
              onClick={() => router.push('/menu-list')}
            >
              Cancelar
            </Button>
            <Button
              size='sm'
              disabled={createCategoryMutation.isPending}
              type='submit'
              isLoading={createCategoryMutation.isPending}
            >
              {createCategoryMutation.isPending
                ? 'Carregando'
                : 'Criar categoria'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
