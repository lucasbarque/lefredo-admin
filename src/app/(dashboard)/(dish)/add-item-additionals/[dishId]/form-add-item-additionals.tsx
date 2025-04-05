'use client';

import { useState } from 'react';

import {
  createDishesExtraAPI,
  deleteDishesExtraAPI,
  getDishExtrasAPI,
  updateDishesExtraAPI,
} from '@/actions/dish-extra.action';
import { updateDishExtrasOrderAPI } from '@/actions/dish.action';
import { createDishesExtraSchema } from '@/validations/dishes-extra-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Reorder } from 'motion/react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputCashout } from '@/components/inputs/input-cashout';

import { FormAddItemAdditionalsProps } from './add-item-additionals.types';
import { ItemAdditional } from './item-additional';

export function FormAddItemAdditionals({
  dishId,
}: FormAddItemAdditionalsProps) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createDishesExtraSchema>>({
    resolver: zodResolver(createDishesExtraSchema),
    defaultValues: {
      title: '',
      price: '',
    },
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  // Query para buscar os extras do prato
  const { data: dishExtras = [], refetch } = useQuery({
    queryKey: ['dishExtras', dishId],
    queryFn: async () => {
      const response = await getDishExtrasAPI(dishId);
      if (response.status === 200) return response.data;
      throw new Error('Erro ao buscar extras');
    },
  });

  // Mutation para criar um novo item adicional
  const createExtraMutation = useMutation({
    mutationKey: ['createDishesExtra', dishId],
    mutationFn: (data: z.infer<typeof createDishesExtraSchema>) =>
      createDishesExtraAPI(dishId, data),
    onSuccess: (response) => {
      console.log('entrou');
      if (response.status === 201) {
        toast.success('Item adicional cadastrado com sucesso', {
          position: 'top-right',
        });
        refetch();
        handleCloseForm();
      } else {
        toast.error('Falha ao cadastrar item adicional', {
          position: 'top-right',
        });
      }
    },
    onError: () => {
      toast.error('Falha ao cadastrar item adicional', {
        position: 'top-right',
      });
    },
  });

  // Mutation para atualizar um item adicional existente
  const updateExtraMutation = useMutation({
    mutationKey: ['updateDishesExtra', dishId, isEditingId],
    mutationFn: (data: z.infer<typeof createDishesExtraSchema>) =>
      updateDishesExtraAPI(isEditingId as string, data),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success('Item adicional atualizado com sucesso', {
          position: 'top-right',
        });
        refetch();
        handleCloseForm();
      } else {
        toast.error('Falha ao atualizar item adicional', {
          position: 'top-right',
        });
      }
      setIsEditingId(null);
    },
    onError: () => {
      toast.error('Falha ao atualizar item adicional', {
        position: 'top-right',
      });
      setIsEditingId(null);
      handleCloseForm();
    },
  });

  // Mutation para deletar um item adicional
  const deleteExtraMutation = useMutation({
    mutationKey: ['deleteDishesExtra', dishId],
    mutationFn: (id: string) => deleteDishesExtraAPI(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success('Item adicional deletado com sucesso', {
          position: 'top-right',
        });
        refetch();
      } else {
        toast.error('Falha ao deletar item adicional', {
          position: 'top-right',
        });
      }
      handleCloseForm();
    },
    onError: () => {
      toast.error('Falha ao deletar item adicional', {
        position: 'top-right',
      });
      handleCloseForm();
    },
  });

  // Mutation para atualizar a ordem dos itens adicionais
  const updateOrderMutation = useMutation({
    mutationKey: ['updateDishExtrasOrder', dishId],
    mutationFn: (orderItems: string[]) =>
      updateDishExtrasOrderAPI(dishId, { orderUpdated: orderItems }),
    onSuccess: (response) => {
      if (response === 200) {
        toast.success('Ordem atualizada com sucesso', {
          position: 'top-right',
        });
      } else {
        toast.error('Falha ao atualizar ordem', { position: 'top-right' });
      }
    },
    onError: () => {
      toast.error('Falha ao atualizar ordem', { position: 'top-right' });
    },
  });

  // Função para atualizar a ordem dos itens, usando a mutation
  async function handleUpdateOrder(newOrder: typeof dishExtras) {
    if (newOrder.length < 2) return;
    const orderItems = newOrder.map((item) => item.id);
    updateOrderMutation.mutate(orderItems);
    queryClient.setQueryData(['dishExtras', dishId], newOrder);
  }

  const onSubmit: SubmitHandler<z.infer<typeof createDishesExtraSchema>> = (
    data
  ) => {
    if (isEditingId) {
      updateExtraMutation.mutate(data);
    } else {
      createExtraMutation.mutate(data);
    }
  };

  function handleCloseForm() {
    reset();
    setIsFormOpen(false);
  }

  function handleOpenCreateForm() {
    setIsFormOpen(true);
    setIsEditingId(null);
  }

  function setEditItem(id: string) {
    const currentExtra = dishExtras.find((extra) => extra.id === id);
    if (currentExtra) {
      setIsFormOpen(true);
      setIsEditingId(currentExtra.id);
      setValue('title', currentExtra.title);
      setValue(
        'price',
        new Intl.NumberFormat('pt-BR', {
          style: 'decimal',
          currency: 'BRL',
          minimumFractionDigits: 2,
        }).format(currentExtra.price / 100) ?? '0,00'
      );
    }
  }

  function handleDeleteItem(id: string) {
    deleteExtraMutation.mutate(id);
  }

  return (
    <>
      {dishExtras.length > 0 && (
        <div className='mt-6 max-w-[780px] px-6'>
          <div className='space-y-3'>
            <Reorder.Group
              values={dishExtras}
              onReorder={(newOrder) => {
                // Chama a função handleUpdateOrder com a nova ordem
                handleUpdateOrder(newOrder);
              }}
              axis='y'
            >
              {dishExtras.map((item) => (
                <Reorder.Item key={item.id} value={item}>
                  <ItemAdditional
                    id={item.id}
                    name={item.title}
                    price={item.price}
                    setEditItem={setEditItem}
                    handleDeleteItem={handleDeleteItem}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </div>
      )}
      <div className='max-w-[780px] px-6'>
        {!isFormOpen && (
          <div
            data-has-additionals={dishExtras.length > 0}
            className='mt-2 flex items-center justify-center'
          >
            <Button family='tertiary' size='sm' onClick={handleOpenCreateForm}>
              <Button.Icon>
                <IconPlus size={18} />
              </Button.Icon>
              Criar item adicional
            </Button>
          </div>
        )}
        {isFormOpen && (
          <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-3'>
              <Input
                id='title'
                name='title'
                label='Título'
                control={control}
                error={errors.title?.message}
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
                onClick={handleCloseForm}
                disabled={isSubmitting}
                type='button'
              >
                Cancelar
              </Button>
              <Button size='sm' disabled={isSubmitting} type='submit'>
                {isEditingId ? 'Atualizar' : 'Adicionar'}
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
