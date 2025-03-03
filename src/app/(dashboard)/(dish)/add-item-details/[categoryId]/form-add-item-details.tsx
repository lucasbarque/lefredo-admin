'use client';

import Link from 'next/link';

import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputCashout } from '@/components/inputs/input-cashout';
import { InputEditor } from '@/components/inputs/input-editor';
import { Select } from '@/components/inputs/select';

import { FormAddItemDetailsProps } from './add-items-details.types';
import { useAddItemDetails } from './use-add-item-details';

export function FormAddItemDetails({ categoryId }: FormAddItemDetailsProps) {
  const { handleSubmit, onSubmit, control, errors, isSubmitting } =
    useAddItemDetails(categoryId);

  return (
    <>
      <div className='p-6'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-8 gap-3'
        >
          <div className='col-span-4'>
            <Input
              id='title'
              name='title'
              label='Nome do item'
              control={control}
              error={errors.title?.message}
              placeholder='Exemplo: X Salada'
            />
          </div>
          <div className='col-span-4'>
            <Input
              id='portion'
              name='portion'
              label='Porção'
              control={control}
              error={errors.portion?.message}
              placeholder='Exemplo: 01 unidade'
            />
          </div>
          <div className='col-span-4'>
            <InputCashout
              control={control}
              name='price'
              placeholder='0,00'
              withSideLabel
              sideLabelText='R$'
              limitCash={10000}
              label='Preço'
              error={errors.price?.message}
            />
          </div>
          <div className='col-span-2'>
            <Input
              id='prepTime'
              name='prepTime'
              label='Tempo de preparo'
              control={control}
              error={errors.prepTime?.message}
              placeholder='Exemplo: 01 Minuto'
              isOptional
            />
          </div>
          <div className='col-span-2'>
            <Select
              id='flagged'
              options={[
                { label: 'Sim', value: 'true' },
                { label: 'Não', value: 'false' },
              ]}
              name='flagged'
              error={errors.flagged?.message}
              control={control}
              label='Mais pedido/destaque'
              isOptional
            />
          </div>

          <div className='col-span-8'>
            <InputEditor
              id='description'
              name='description'
              label='Descrição'
              control={control}
              placeholder='Exemplo: Pão brioche, alface, tomate, cebola caramelizada.'
              error={errors.description?.message}
              isOptional
              maxLength={500}
            />
          </div>
        </form>
      </div>

      <div className='border-border-default mt-auto flex justify-end gap-4 border-t px-8 py-4'>
        <Link href='/menu-list'>
          <Button size='md' family='secondary'>
            Cancelar
          </Button>
        </Link>

        <Button
          size='md'
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Continuar
        </Button>
      </div>
    </>
  );
}
