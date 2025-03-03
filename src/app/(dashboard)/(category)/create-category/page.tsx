'use client';

import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputEditor } from '@/components/inputs/input-editor';

import { useCreateCategory } from './use-create-category';

export default function PageCreateCategory() {
  const { handleSubmit, onSubmit, control, errors, isSubmitting, router } =
    useCreateCategory();

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
              {isSubmitting ? 'Carregando' : 'Criar categoria'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
