'use client';

import { useEffect, useState } from 'react';

import {
  createDishesExtraAPI,
  deleteDishesExtraAPI,
  getDishExtrasAPI,
  updateDishesExtraAPI,
} from '@/actions/dish-extra.action';
import { updateDishExtrasOrderAPI } from '@/actions/dish.action';
import { DishExtraDTO } from '@/http/api';
import { createDishesExtraSchema } from '@/validations/dishes-extra-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus } from '@tabler/icons-react';
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
  const [dishExtras, setDishExtras] = useState<DishExtraDTO[]>([]);

  const onSubmit: SubmitHandler<
    z.infer<typeof createDishesExtraSchema>
  > = async (data) => {
    if (isEditingId) {
      const response = await updateDishesExtraAPI(isEditingId, data);

      if (response.status === 200) {
        toast.success('Item adicional atualizado com sucesso', {
          position: 'top-right',
        });
        setDishExtras((prevExtras) =>
          prevExtras.map((item) =>
            item.id === isEditingId ? response.data : item
          )
        );
        handleCloseForm();
      } else {
        toast.error('Falha ao atualizar item adicional', {
          position: 'top-right',
        });
      }
      setIsEditingId(null);
      handleCloseForm();
    } else {
      const response = await createDishesExtraAPI(dishId, data);
      if (response.status === 201) {
        toast.success('Item adicional cadastrado com sucesso', {
          position: 'top-right',
        });
        setDishExtras((oldState) => [...oldState, response.data]);
        handleCloseForm();
      } else {
        toast.error('Falha ao cadastrar item adicional', {
          position: 'top-right',
        });
      }
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
    const currentDish = dishExtras?.find((dish) => dish.id === id);

    if (currentDish) {
      setIsFormOpen(true);
      setIsEditingId(currentDish.id);
      setValue('title', currentDish.title);
      setValue(
        'price',
        new Intl.NumberFormat('pt-BR', {
          style: 'decimal',
          currency: 'BRL',
          minimumFractionDigits: 2,
        }).format(currentDish.price / 100) ?? '0,00'
      );
    }
  }

  async function handleUpdateOrder() {
    if (dishExtras?.length < 2) return;

    const orderItems = dishExtras?.map((item) => item.id);
    const responseStatus = await updateDishExtrasOrderAPI(dishId, {
      orderUpdated: orderItems,
    });

    if (responseStatus === 200) {
      toast.success('Ordem atualizada com sucesso', { position: 'top-right' });
    } else {
      toast.error('Falha ao atualizar ordem', { position: 'top-right' });
    }
  }

  async function handleDeleteItem(id: string) {
    const responseStatus = await deleteDishesExtraAPI(id);
    if (responseStatus === 200) {
      toast.success('Item adicional deletado com sucesso', {
        position: 'top-right',
      });
      setDishExtras((prevExtras) =>
        prevExtras.filter((item) => item.id !== id)
      );
    } else {
      toast.error('Falha ao deletar item adicional', {
        position: 'top-right',
      });
    }
    handleCloseForm();
  }

  useEffect(() => {
    async function getDishExtras() {
      const response = await getDishExtrasAPI(dishId);

      if (response.status === 200) {
        setDishExtras(response.data);
      }
    }

    getDishExtras();
  }, [dishId]);

  return (
    <>
      {dishExtras.length > 0 && (
        <div className='mt-6 max-w-[780px] px-6'>
          <div className='space-y-3'>
            <Reorder.Group
              values={dishExtras}
              onReorder={setDishExtras}
              axis='y'
            >
              {dishExtras.map((item) => (
                <Reorder.Item
                  key={item.id}
                  value={item}
                  onDragEnd={handleUpdateOrder}
                >
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
            className='mt-2 flex items-center data-[has-additionals=false]:justify-start data-[has-additionals=true]:justify-center'
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
              <Button
                size='sm'
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
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
