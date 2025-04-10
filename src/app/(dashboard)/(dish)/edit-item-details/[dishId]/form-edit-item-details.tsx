'use client';

import { updateDishAPI } from '@/actions/dish.action';
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

import { FormEditItemDetailsProps } from './edit-items-details.types';

export function FormEditItemDetails({ data }: FormEditItemDetailsProps) {
  const router = useRouter();

  const isFlagged = data.dishSpecs.some(
    (spec) => spec.DishSpecs.key === 'highlighted'
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<z.infer<typeof createDishDetailsSchema>>({
    resolver: zodResolver(createDishDetailsSchema),
    defaultValues: {
      title: data.title,
      portion: data.portion,
      price:
        new Intl.NumberFormat('pt-BR', {
          style: 'decimal',
          currency: 'BRL',
          minimumFractionDigits: 2,
        }).format(data.price / 100) ?? '0,00',
      flagged: String(isFlagged),
      prepTime: data.prepTime || '',
      description: data.description || '',
      sectionId: data.section.id,
    },
  });

  const updateDishMutation = useMutation({
    mutationKey: ['updateDish', data.id],
    mutationFn: async (
      dataToUpdate: z.infer<typeof createDishDetailsSchema>
    ) => {
      return await updateDishAPI(data.id, dataToUpdate);
    },
    onSuccess: (response) => {
      if (response.status !== 200) {
        toast.error(
          'Falha ao atualizar item. Por favor, tente novamente mais tarde'
        );
      } else {
        toast.success('Item atualizado com sucesso.', {
          position: 'top-right',
        });
        router.replace(`/add-item-photos/${data.id}`);
      }
    },
    onError: () => {
      toast.error(
        'Falha ao atualizar item. Por favor, tente novamente mais tarde'
      );
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createDishDetailsSchema>> = (
    dataToUpdate
  ) => {
    if (!isDirty) {
      return router.replace(`/add-item-photos/${data.id}`);
    }
    updateDishMutation.mutate(dataToUpdate);
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
            <Select
              id='sectionId'
              options={[{ label: data.section.title, value: data.section.id }]}
              name='sectionId'
              error={errors.sectionId?.message}
              control={control}
              label='Categoria'
              disabled
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
          disabled={updateDishMutation.isPending}
          onClick={handleSubmit(onSubmit)}
          isLoading={updateDishMutation.isPending}
        >
          Continuar
        </Button>
      </div>
    </>
  );
}
