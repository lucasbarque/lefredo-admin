import { IconPlus } from '@tabler/icons-react';

import { Header } from '@components/data-display/header';
import { Button } from '@components/inputs/button';
import { InputRadio } from '@components/inputs/input-radio';
import { StepperBar } from '@components/inputs/stepper-bar';

import { FormAddFlavor } from './form-add-flavor';
import { ItemFlavor } from './item-flavor';
import { useAddItemFlavors } from './use-add-item-flavors';

export function AddItemFlavors() {
  const { control, select } = useAddItemFlavors();

  return (
    <div className='flex h-[calc(100vh-80px)] w-full flex-col overflow-y-auto'>
      <div className='flex items-end justify-between px-6 pt-6'>
        <Header
          backButton={{ onClick: () => {}, title: 'Voltar' }}
          title='Adicionar item'
        />
        <StepperBar currentStepperIndex={4} />
      </div>

      <div className='p-6'>
        <div className='text-title-default text-2xl font-extrabold'>
          Sabores
        </div>
        <p className='text-text-default font-bold'>
          Cadastre todas as suas variações de de sabores.
        </p>
      </div>

      <div className='px-6'>
        <div className='border-brand-border border-line rounded-md border bg-gray-400 p-6'>
          <span className='text-lg font-semibold'>Selecione abaixo</span>
          <form className='mt-2'>
            <InputRadio
              control={control}
              name='select'
              options={[
                {
                  title: 'Não, meu item não possui variação de sabores',
                  value: 'no',
                },
                {
                  title: 'Sim, meu item tem variação de sabores',
                  value: 'yes',
                },
              ]}
              selected={select}
            />
          </form>
        </div>

        <div className='space-y-2 py-4'>
          <ItemFlavor />
          <ItemFlavor />
          <ItemFlavor />
          <ItemFlavor />
          <ItemFlavor />
          <div className='mt-4 flex items-center justify-center'>
            <Button size='sm' family='tertiary'>
              <Button.Icon>
                <IconPlus size={16} />
              </Button.Icon>
              Adicionar sabor
            </Button>
          </div>
        </div>
        <FormAddFlavor />
      </div>

      <div className='border-border-default mt-auto flex justify-end gap-4 border-t px-8 py-4'>
        <Button size='md' family='secondary'>
          Cancelar
        </Button>
        <Button size='md' onClick={() => {}}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
