'use client';

import { useState } from 'react';

import { IconPlus } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/inputs/button';
import { InputRadio } from '@/components/inputs/input-radio';

import { FormAddFlavor } from './form-add-flavor';
import { ItemsList } from './items-list';

export function FormAddItemFlavors() {
  const { control } = useForm();
  const [createVariation, setCreateVariation] = useState(false);

  return (
    <div className='px-6'>
      <div className='border-brand-border border-line rounded-md border bg-gray-400 p-6'>
        <span className='text-lg font-semibold'>Selecione abaixo</span>
        <form className='mt-2'>
          <InputRadio
            control={control}
            name='select'
            onChangeCapture={() => setCreateVariation(!createVariation)}
            options={[
              {
                title: 'Não, meu item não possui variação de sabores',
                value: 'false',
              },
              {
                title: 'Sim, meu item tem variação de sabores',
                value: 'true',
              },
            ]}
            selected={String(createVariation)}
          />
        </form>
      </div>

      {createVariation && (
        <>
          <ItemsList />
          <div className='mt-4 flex items-center justify-center'>
            <Button size='sm' family='tertiary'>
              <Button.Icon>
                <IconPlus size={16} />
              </Button.Icon>
              Adicionar sabor
            </Button>
          </div>
          <FormAddFlavor />
        </>
      )}
    </div>
  );
}
