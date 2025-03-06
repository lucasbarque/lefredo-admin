'use client';

import { useEffect, useState } from 'react';

import { IconPlus } from '@tabler/icons-react';
import { Reorder } from 'motion/react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/inputs/button';
import { InputRadio } from '@/components/inputs/input-radio';

import { FormAddItemFlavorsProps } from './add-item-flavors.types';
import { FormAddFlavor } from './form-add-flavor';
import { ItemFlavor } from './item-flavor';

export function FormAddItemFlavors({ dishFlavors }: FormAddItemFlavorsProps) {
  const { control } = useForm();
  const [createVariation, setCreateVariation] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dishFlavorsList, setDishFlavorsList] = useState(dishFlavors);

  useEffect(() => {
    setDishFlavorsList(dishFlavors);
  }, [dishFlavors]);

  console.log(dishFlavors);

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
          {dishFlavorsList.length > 0 && (
            <div className='space-y-2 py-4'>
              <Reorder.Group
                values={dishFlavorsList}
                onReorder={setDishFlavorsList}
                axis='y'
              >
                {dishFlavorsList?.map((item) => (
                  <Reorder.Item
                    key={item.id}
                    value={item}
                    // onDragEnd={handleUpdateOrder}
                  >
                    <ItemFlavor
                      id={item.id}
                      title={item.title}
                      label={item.label}
                      price={item.price}
                      description={item.description}
                      //  setEditItem={setEditItem}
                      //  handleCloseForm={handleCloseForm}
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
                onClick={() => setIsFormOpen(true)}
              >
                <Button.Icon>
                  <IconPlus size={16} />
                </Button.Icon>
                Adicionar sabor
              </Button>
            </div>
          )}

          {isFormOpen && <FormAddFlavor setIsFormOpen={setIsFormOpen} />}
        </>
      )}
    </div>
  );
}
