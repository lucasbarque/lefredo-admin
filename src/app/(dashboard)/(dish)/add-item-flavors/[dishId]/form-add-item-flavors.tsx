'use client';

import { useEffect, useState } from 'react';

import {
  createDishesFlavorsAPI,
  updateDishesFlavorsAPI,
} from '@/actions/dish-flavor.action';
import { updateDishFlavorsOrderAPI } from '@/actions/dish.action';
import { createFlavorSchema } from '@/validations/dishes-flavors-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconPlus } from '@tabler/icons-react';
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

export function FormAddItemFlavors({
  dishFlavors,
  dish,
}: FormAddItemFlavorsProps) {
  const [createVariation, setCreateVariation] = useState(
    dishFlavors.length > 0
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalUploadImageOpen, setIsModalUploadImageOpen] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [currentFlavorImageId, setCurrentFlavorImageId] = useState<
    string | null
  >(null);
  const [dishFlavorsList, setDishFlavorsList] = useState(dishFlavors);

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

  const onSubmit: SubmitHandler<z.infer<typeof createFlavorSchema>> = async (
    data
  ) => {
    if (isEditingId) {
      const responseStatus = await updateDishesFlavorsAPI(isEditingId, data);
      if (responseStatus === 200) {
        toast.success('Sabor atualizado com sucesso', {
          position: 'top-right',
        });
        handleCloseForm();
      } else {
        toast.error('Falha ao atualizar sabor', { position: 'top-right' });
      }
      setIsEditingId(null);
      handleCloseForm();
    } else {
      const responseStatus = await createDishesFlavorsAPI(dish.data.id, data);
      if (responseStatus === 201) {
        toast.success('Sabor cadastrado com sucesso', {
          position: 'top-right',
        });
        handleCloseForm();
      } else {
        toast.error('Falha ao cadastrar sabor', { position: 'top-right' });
      }
    }
  };

  function handleCloseForm() {
    reset();
    setIsFormOpen(false);
  }

  async function handleUpdateOrder() {
    if (dishFlavorsList.length < 2) return;

    const orderItems = dishFlavorsList.map((item) => item.id);
    const responseStatus = await updateDishFlavorsOrderAPI(dish.data.id, {
      orderUpdated: orderItems,
    });

    if (responseStatus === 200) {
      toast.success('Ordem atualizada com sucesso', { position: 'top-right' });
    } else {
      toast.error('Falha ao atualizar ordem', { position: 'top-right' });
    }
  }

  function setEditItem(id: string) {
    reset();
    const currentDishFlavor = dishFlavors.find((dish) => dish.id === id);

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

  useEffect(() => {
    setDishFlavorsList(dishFlavors);
  }, [dishFlavors]);

  return (
    <div className='px-6 pb-40'>
      <RadioSelectCreateFlavor
        createVariation={createVariation}
        setCreateVariation={setCreateVariation}
        dishFlavors={dishFlavors}
      />

      {createVariation && (
        <>
          {dishFlavorsList.length > 0 && (
            <div className='space-y-2 pt-4'>
              <Reorder.Group
                values={dishFlavorsList}
                onReorder={setDishFlavorsList}
                axis='y'
              >
                {dishFlavorsList?.map((item) => (
                  <Reorder.Item
                    key={item.id}
                    value={item}
                    onDragEnd={handleUpdateOrder}
                  >
                    <ItemFlavor
                      id={item.id}
                      title={item.title}
                      label={item.label}
                      price={item.price}
                      description={item.description}
                      dish={dish}
                      dishFlavorsMedias={item.dishFlavorsMedias}
                      handleCloseForm={handleCloseForm}
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

          {dishFlavors.length > 0 && (
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
                      (flavor) => flavor.id === currentFlavorImageId
                    )?.id || null
                  }
                  imagesFlavor={
                    dishFlavors.find(
                      (flavor) => flavor.id === currentFlavorImageId
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
