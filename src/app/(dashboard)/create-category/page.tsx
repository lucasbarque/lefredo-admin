'use client';

import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputEditor } from '@/components/inputs/input-editor';

import { useCreateCategory } from './use-create-category';

export default function PageCreateCategory() {
  const { handleSubmit, onSubmit, control, errors, isSubmitting } =
    useCreateCategory();

  return (
    <section>
      <Header
        backButton={{ onClick: () => {}, title: 'Voltar' }}
        title='Nova categoria'
        description='Preencha as informações da nova categoria.'
      />
      <div className='pt-6'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id='name'
            name='name'
            label='Nome'
            control={control}
            error={errors.name?.message}
            countCharacters
            maxLength={40}
            placeholder='Exemplo: Salgados'
          />

          <div className='pt-2'>
            <InputEditor
              id='observations'
              name='observations'
              label='Observações'
              control={control}
              placeholder='Obs: Esse texto que será exibido em todos os produtos desta categoria'
              error={errors.observations?.message}
              isOptional
              maxLength={100}
            />
          </div>
          <div className='mt-4 flex justify-end gap-2.5'>
            <Button size='sm' family='secondary'>
              Cancelar
            </Button>
            <Button size='sm' disabled={isSubmitting}>
              Criar categoria
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
