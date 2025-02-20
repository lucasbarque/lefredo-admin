import { IconPlus } from '@tabler/icons-react';

import { Header } from '@components/data-display/header';
import { Button } from '@components/inputs/button';
import { Input } from '@components/inputs/input';
import { InputCashout } from '@components/inputs/input-cashout/input-cashout';
import { StepperBar } from '@components/inputs/stepper-bar';

import { ItemAdditional } from './item-additional';
import { useAddItemAdditionals } from './use-add-item-additionals';

export function AddItemAdditionals() {
  const { handleSubmit, onSubmit, control, errors, isSubmitting } =
    useAddItemAdditionals();

  return (
    <div className='flex h-[calc(100vh-80px)] w-full flex-col overflow-y-auto'>
      <div className='flex items-end justify-between px-6 pt-6'>
        <Header
          backButton={{ onClick: () => {}, title: 'Voltar' }}
          title='Adicionar item'
        />
        <StepperBar currentStepperIndex={2} />
      </div>

      <div className='p-6'>
        <div className='text-title-default text-2xl font-extrabold'>
          Itens adicionais
        </div>
        <p className='text-text-default font-bold'>
          Indique aqui se o item tem adicionais. (opcional)
        </p>
      </div>

      <div className='max-w-[780px] px-6'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-3'>
            <Input
              id='name'
              name='name'
              label='Nome'
              control={control}
              error={errors.name?.message}
              placeholder='Exemplo: Alface'
            />

            <InputCashout
              control={control}
              name='price'
              placeholder='0,00'
              withSideLabel
              sideLabelText='R$'
              limitCash={10000}
              label='Valor'
              error={errors.price?.message}
            />
          </div>
          <div className='mt-1 flex items-center justify-end gap-3'>
            <Button size='sm' family='secondary'>
              Cancelar
            </Button>
            <Button
              size='sm'
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Adicionar
            </Button>
          </div>
        </form>

        <div className='mt-4 space-y-3'>
          <ItemAdditional id='1' name='Alface' price={4000} />
          <ItemAdditional id='2' name='Alface' price={4000} />
          <ItemAdditional id='3' name='Alface' price={4000} />
        </div>

        <div className='mt-2 flex items-center justify-center'>
          <Button family='tertiary' size='sm'>
            <Button.Icon>
              <IconPlus size={18} />
            </Button.Icon>
            Criar outro item adicional
          </Button>
        </div>
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
