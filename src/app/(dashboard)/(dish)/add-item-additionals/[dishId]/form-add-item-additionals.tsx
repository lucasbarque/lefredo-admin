'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputCashout } from '@/components/inputs/input-cashout';

import { FormAddItemAdditionalsProps } from './add-item-additionals.types';

const inputSchema = z.object({
  name: z
    .string()
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(40, 'Digite no máximo 40 caracteres'),
  price: z.string().nonempty('Digite o preço'),
});

export function FormAddItemAdditionals({
  dishId,
}: FormAddItemAdditionalsProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      name: '',
      price: '',
    },
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onSubmit: SubmitHandler<z.infer<typeof inputSchema>> = async () => {};

  function handleCancel() {
    reset();
    setIsFormOpen(false);
  }

  return (
    <>
      <div className='max-w-[780px] px-6'>
        {!isFormOpen && (
          <div className='mt-2 flex items-center justify-center'>
            <Button
              family='tertiary'
              size='sm'
              onClick={() => setIsFormOpen(true)}
            >
              <Button.Icon>
                <IconPlus size={18} />
              </Button.Icon>
              Criar outro item adicional
            </Button>
          </div>
        )}

        {isFormOpen && (
          <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
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
            <div className='mt-2 flex items-center justify-end gap-3'>
              <Button
                size='sm'
                family='secondary'
                onClick={handleCancel}
                type='button'
              >
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
        )}
      </div>

      <div className='border-border-default mt-auto flex justify-end gap-4 border-t px-8 py-4'>
        <Link href='/menu-list'>
          <Button size='md' family='secondary'>
            Cancelar
          </Button>
        </Link>

        <Link href={`/add-item-classification/${dishId}`}>
          <Button size='md'>Continuar</Button>
        </Link>
      </div>
    </>
  );
}
