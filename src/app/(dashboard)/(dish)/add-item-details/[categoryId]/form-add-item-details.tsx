'use client';

import { createDishAPI } from '@/actions/dish.action';
import { createDishDetailsSchema } from '@/validations/dish-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputCashout } from '@/components/inputs/input-cashout';
import { InputEditor } from '@/components/inputs/input-editor';
import { Select } from '@/components/inputs/select';

import { FormAddItemDetailsProps } from './add-items-details.types';

export function FormAddItemDetails({ categoryId }: FormAddItemDetailsProps) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createDishDetailsSchema>>({
    resolver: zodResolver(createDishDetailsSchema),
    defaultValues: {
      title: '',
      portion: '',
      price: '0,00',
      flagged: 'false',
      prepTime: 0,
      description: '',
      sectionId: categoryId,
    },
  });

  const createDishMutation = useMutation({
    mutationKey: ['createDish'],
    mutationFn: async (data: z.infer<typeof createDishDetailsSchema>) => {
      return await createDishAPI(data);
    },
    onSuccess: (response) => {
      if (response.status !== 201) {
        toast.error(
          'Falha ao criar item. Por favor, tente novamente mais tarde'
        );
      } else {
        toast.success('Item criado com sucesso.', { position: 'top-right' });
        router.replace(`/add-item-photos/${response.data.id}`);
      }
    },
    onError: () => {
      toast.error('Falha ao criar item. Por favor, tente novamente mais tarde');
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createDishDetailsSchema>> = (
    data
  ) => {
    createDishMutation.mutate(data);
  };

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
          <div className='col-span-3'>
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
          <div className='col-span-3'>
            <Input
              id='prepTime'
              name='prepTime'
              label='Tempo de preparo (em minutos)'
              type='number'
              min={0}
              max={999}
              control={control}
              error={errors.prepTime?.message}
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
          disabled={createDishMutation.isPending}
          onClick={handleSubmit(onSubmit)}
        >
          {createDishMutation.isPending ? 'Carregando' : 'Continuar'}
        </Button>
      </div>
    </>
  );
}
