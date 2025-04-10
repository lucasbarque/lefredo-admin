'use client';

import { useState } from 'react';

import {
  createDishesFlavorsAPI,
  deleteDishesFlavorsAPI,
  getDishFlavorsAPI,
  updateDishesFlavorsAPI,
} from '@/actions/dish-flavor.action';
import { updateDishFlavorsOrderAPI } from '@/actions/dish.action';
import { getDishById } from '@/http/api';
import { createFlavorSchema } from '@/validations/dishes-flavors-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Reorder } from 'motion/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import Modal from '@/components/data-display/modal/modal';
import { Button } from '@/components/inputs/button';

import { FormAddItemFlavorsProps } from './add-item-flavors.types';
import { Form } from './form';
import { ItemFlavor } from './item-flavor';
import { RadioSelectCreateFlavor } from './radio-select-create-flavor';
import { UploadImagesComponent } from './upload-images-component';

export function FormAddItemFlavors({ dishId }: FormAddItemFlavorsProps) {
  const queryClient = useQueryClient();

  const {
    control,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm<z.infer<typeof createFlavorSchema>>({
    resolver: zodResolver(createFlavorSchema),
    defaultValues: {
      title: '',
      label: '',
      price: '',
      description: '',
    },
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  const [createVariation, setCreateVariation] = useState(false);
  const [isModalUploadImageOpen, setIsModalUploadImageOpen] = useState(false);
  const [currentFlavorImageId, setCurrentFlavorImageId] = useState<
    string | null
  >(null);

  const { data: dishFlavors = [], refetch } = useQuery({
    queryKey: ['dishFlavors', dishId],
    queryFn: async () => {
      const response = await getDishFlavorsAPI(dishId);
      if (response.status === 200) return response.data;
      throw new Error('Erro ao buscar sabores');
    },
  });

  const { data: dish } = useQuery({
    queryKey: ['dish', dishId],
    queryFn: async () => await getDishById(dishId),
  });

  const createFlavorMutation = useMutation({
    mutationKey: ['createDishFlavor', dishId],
    mutationFn: async (data: z.infer<typeof createFlavorSchema>) =>
      await createDishesFlavorsAPI(dishId, data),
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success('Sabor cadastrado com sucesso', {
          position: 'top-right',
        });
        refetch();
        handleCloseForm();
      } else {
        toast.error('Falha ao cadastrar sabor', { position: 'top-right' });
      }
    },
    onError: () => {
      toast.error('Falha ao cadastrar sabor', { position: 'top-right' });
    },
  });

  const updateFlavorMutation = useMutation({
    mutationKey: ['updateDishFlavor', dishId, isEditingId],
    mutationFn: async (data: z.infer<typeof createFlavorSchema>) =>
      await updateDishesFlavorsAPI(isEditingId as string, data),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success('Sabor atualizado com sucesso', {
          position: 'top-right',
        });
        refetch();
        handleCloseForm();
      } else {
        toast.error('Falha ao atualizar sabor', {
          position: 'top-right',
        });
      }
      setIsEditingId(null);
    },
    onError: () => {
      toast.error('Falha ao atualizar sabor', { position: 'top-right' });
      setIsEditingId(null);
      handleCloseForm();
    },
  });

  const deleteFlavorMutation = useMutation({
    mutationKey: ['deleteDishFlavor', dishId],
    mutationFn: (id: string) => deleteDishesFlavorsAPI(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success('Sabor deletado com sucesso', {
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

  const updateOrderMutation = useMutation({
    mutationKey: ['updateDishFlavorOrder', dishId],
    mutationFn: async (orderItems: string[]) =>
      await updateDishFlavorsOrderAPI(dishId, {
        orderUpdated: orderItems,
      }),
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

  function handleUpdateOrder(newOrder: typeof dishFlavors) {
    if (newOrder.length < 2) return;
    const orderItems = newOrder.map((item) => item.id);
    updateOrderMutation.mutate(orderItems);
    queryClient.setQueryData(['dishFlavors', dishId], newOrder);
  }

  const onSubmit: SubmitHandler<z.infer<typeof createFlavorSchema>> = (
    data
  ) => {
    if (isEditingId) {
      updateFlavorMutation.mutate(data);
    } else {
      createFlavorMutation.mutate(data);
    }
  };

  function handleCloseForm() {
    reset();
    setIsFormOpen(false);
  }

  function setEditItem(id: string) {
    reset();
    const currentDishFlavor = dishFlavors?.find(
      (flavor: any) => flavor.id === id
    );
    if (currentDishFlavor) {
      setValue('title', currentDishFlavor.title);
      setValue('label', currentDishFlavor.label);
      setValue('description', currentDishFlavor.description);
      if (currentDishFlavor.price) {
        setValue(
          'price',
          new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            currency: 'BRL',
            minimumFractionDigits: 2,
          }).format(currentDishFlavor.price / 100) ?? ''
        );
      }
      setIsEditingId(currentDishFlavor.id);
      handleOpenForm('edit');
    }
  }

  function handleOpenForm(type: 'create' | 'edit') {
    setIsFormOpen(true);
    if (type === 'create') {
      reset();
      setIsEditingId(null);
    }
  }

  function handleOpenModalImage(flavorId: string) {
    setIsModalUploadImageOpen(true);
    setCurrentFlavorImageId(flavorId);
  }

  function handleDeleteItem(id: string) {
    deleteFlavorMutation.mutate(id);
  }

  return (
    <div className='px-6 pb-40'>
      <RadioSelectCreateFlavor
        createVariation={createVariation}
        setCreateVariation={setCreateVariation}
        dishFlavors={dishFlavors ?? []}
      />

      {createVariation && (
        <>
          {dishFlavors.length > 0 && (
            <div className='space-y-2 pt-4'>
              <Reorder.Group
                values={dishFlavors}
                onReorder={(newOrder) => {
                  handleUpdateOrder(newOrder);
                }}
                axis='y'
              >
                {dishFlavors.map((item: any) => (
                  <Reorder.Item key={item.id} value={item}>
                    <ItemFlavor
                      id={item.id}
                      title={item.title}
                      label={item.label}
                      price={item.price}
                      description={item.description}
                      dish={dish!}
                      handleDeleteItem={handleDeleteItem}
                      dishFlavorsMedias={item.dishFlavorsMedias}
                      setEditItem={setEditItem}
                      handleOpenModalImage={handleOpenModalImage}
                    />
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          )}

          {!isFormOpen && (
            <div className='flex items-center justify-center'>
              <Button
                size='sm'
                family='tertiary'
                onClick={() => handleOpenForm('create')}
              >
                <Button.Icon>
                  <IconPlus size={16} />
                </Button.Icon>
                Adicionar sabor
              </Button>
            </div>
          )}

          <Modal open={isFormOpen} onOpenChange={setIsFormOpen}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Wrapper
                title={isEditingId ? 'Atualizar sabor' : 'Adicionar sabor'}
                size='lg'
                actionButtonText='Salvar'
                actionButtonFunction={() => onSubmit}
              >
                <Form
                  control={control}
                  errors={errors}
                  isEditingId={isEditingId}
                />
              </Modal.Wrapper>
            </form>
          </Modal>

          {dishFlavors && dishFlavors.length > 0 && (
            <Modal
              open={isModalUploadImageOpen}
              onOpenChange={setIsModalUploadImageOpen}
            >
              <Modal.Wrapper
                title='Atualizar imagens'
                size='lg'
                hideActionButton
              >
                <UploadImagesComponent
                  id={
                    dishFlavors.find(
                      (flavor: any) => flavor.id === currentFlavorImageId
                    )?.id || null
                  }
                  imagesFlavor={
                    dishFlavors.find(
                      (flavor: any) => flavor.id === currentFlavorImageId
                    )?.dishFlavorsMedias || []
                  }
                />
              </Modal.Wrapper>
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
