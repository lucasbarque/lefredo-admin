'use client';

import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputCashout } from '@/components/inputs/input-cashout/input-cashout';
import { InputEditor } from '@/components/inputs/input-editor';
import { Select } from '@/components/inputs/select';
import { StepperBar } from '@/components/inputs/stepper-bar';

import { useAddItemDetails } from './use-add-item-details';

export default function PageAddItemDetails() {
  const { handleSubmit, onSubmit, control, errors, isSubmitting } =
    useAddItemDetails();

  return (
    <div className='flex h-[calc(100vh-80px)] w-full flex-col overflow-y-auto'>
      <div className='flex items-end justify-between px-6 pt-6'>
        <Header
          backButton={{ onClick: () => {}, title: 'Voltar' }}
          title='Adicionar item'
        />
        <StepperBar currentStepperIndex={0} />
      </div>

      <div className='p-6'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-8 gap-3'
        >
          <div className='col-span-4'>
            <Select
              options={[
                { label: 'Selecione', value: '' },
                { label: 'Salgados', value: 'salgados' },
                { label: 'Bebidas', value: 'bebidas' },
              ]}
              name='category'
              error={errors.category?.message}
              control={control}
              label='Categoria'
            />
          </div>
          <div className='col-span-2'>
            <Input
              id='portion'
              name='portion'
              label='Porção'
              control={control}
              error={errors.portion?.message}
              placeholder='Exemplo: 01 unidade'
            />
          </div>
          <div className='col-span-2'>
            <Select
              options={[
                { label: 'Sim', value: 'yes' },
                { label: 'Não', value: 'no' },
              ]}
              name='flagged'
              error={errors.flagged?.message}
              control={control}
              label='Mais pedido/destaque'
              isOptional
            />
          </div>

          <div className='col-span-4'>
            <Input
              id='name'
              name='name'
              label='Nome do item'
              control={control}
              error={errors.name?.message}
              placeholder='Exemplo: X Salada'
            />
          </div>

          <div className='col-span-2'>
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
            <Select
              options={[
                { label: 'Selecione', value: '' },
                { label: '2 Minutos', value: '2' },
                { label: '5 Minutos', value: '5' },
              ]}
              name='time'
              error={errors.time?.message}
              control={control}
              label='Tempo de preparo'
              placeholder='Selecione'
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
              error={errors.observations?.message}
              isOptional
              maxLength={500}
            />
          </div>
        </form>
      </div>

      <div className='border-border-default mt-auto flex justify-end gap-4 border-t px-8 py-4'>
        <Button size='md' family='secondary'>
          Cancelar
        </Button>
        <Button
          size='md'
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
