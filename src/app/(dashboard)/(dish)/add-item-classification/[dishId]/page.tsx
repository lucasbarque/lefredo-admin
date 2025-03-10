import { getDishesSpecsAPI } from '@/actions/dish-spec.action';
import { RequestDishSpecsToggleDTOKey } from '@/http/api';
import {
  IconCandyOff,
  IconFlame,
  IconLeaf,
  IconMeatOff,
  IconMilkOff,
  IconPlant2,
  IconSeeding,
  IconSnowflake,
} from '@tabler/icons-react';
import Link from 'next/link';

import { ClassificationItem } from '@/components/data-display/classification-item/classification-item';
import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';
import { StepperBar } from '@/components/inputs/stepper-bar';

import { PageAddItemClassificationParams } from './add-item-classification.types';

export default async function PageAddItemClassification({
  params,
}: PageAddItemClassificationParams) {
  const { dishId } = await params;

  const dishSpecs = await getDishesSpecsAPI(dishId);

  return (
    <>
      <div className='flex items-end justify-between px-6 pt-6'>
        <Header
          title='Adicionar item'
          backButton={{
            title: '',
            children: (
              <Link href={`/add-item-additionals/${dishId}`}>Voltar</Link>
            ),
          }}
        />
        <StepperBar currentStepperIndex={3} />
      </div>

      <div className='p-6'>
        <div className='text-title-default text-2xl font-extrabold'>
          Classificação
        </div>
        <p className='text-text-default'>
          Indique se seu item é adequado a restrições alimentares diversas para
          atrair a atenção de clientes com esse perfil.
        </p>
      </div>

      <div className='grid grid-cols-3 gap-3 px-6'>
        <ClassificationItem
          dishId={dishId}
          title='Vegetariano'
          description='Sem carne de nenhum tipo'
          hashKey={RequestDishSpecsToggleDTOKey.vegetarian}
          icon={<IconMeatOff />}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'vegetarian'
          )}
        />
        <ClassificationItem
          dishId={dishId}
          title='Zero lactose'
          description='Não contém lactose, ou seja, leite e seus derivados'
          hashKey={RequestDishSpecsToggleDTOKey.lactfree}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'lactfree'
          )}
          icon={<IconMilkOff />}
        />
        <ClassificationItem
          dishId={dishId}
          title='Vegano'
          description='Sem produtos de origem animal, como carne, ovo ou leite'
          hashKey={RequestDishSpecsToggleDTOKey.vegan}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'vegan'
          )}
          icon={<IconSeeding />}
        />
        <ClassificationItem
          dishId={dishId}
          title='Servido Gelado'
          description='Da geladeira direto para o consumidor'
          hashKey={RequestDishSpecsToggleDTOKey.cold}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'cold'
          )}
          icon={<IconSnowflake />}
        />
        <ClassificationItem
          dishId={dishId}
          title='Servido Quente'
          description='Produto que acabou de sair do forno'
          icon={<IconFlame />}
          hashKey={RequestDishSpecsToggleDTOKey.hot}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'hot'
          )}
        />
        <ClassificationItem
          dishId={dishId}
          title='Orgânico'
          description='Cultivado sem agrotóxicos, segundo a lei 10.831'
          hashKey={RequestDishSpecsToggleDTOKey.organic}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'organic'
          )}
          icon={<IconLeaf />}
        />
        <ClassificationItem
          dishId={dishId}
          title='Sem açúcar'
          description='Não contém nenhum tipo de açúcar (cristal, orgânico, mascavo, etc.)'
          icon={<IconCandyOff />}
          hashKey={RequestDishSpecsToggleDTOKey.suggarfree}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'suggarfree'
          )}
        />
        <ClassificationItem
          dishId={dishId}
          title='Natural'
          description='Preparado na hora com frutas frescas'
          hashKey={RequestDishSpecsToggleDTOKey.natural}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'natural'
          )}
          icon={<IconPlant2 />}
        />
      </div>

      <div className='border-border-default mt-auto flex justify-end gap-4 border-t px-8 py-4'>
        <Link href='/menu-list'>
          <Button size='md' family='secondary'>
            Cancelar
          </Button>
        </Link>
        <Link href={`/add-item-flavors/${dishId}`}>
          <Button size='md'>Continuar</Button>
        </Link>
      </div>
    </>
  );
}
