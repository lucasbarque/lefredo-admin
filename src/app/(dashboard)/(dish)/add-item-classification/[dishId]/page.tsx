import { getDishesSpecsAPI } from '@/actions/dish-spec.action';
import { ClassificationItem } from '@/app/(dashboard)/(dish)/add-item-classification/[dishId]/classification-item';
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

import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';
import { StepperBar } from '@/components/inputs/stepper-bar';

import { PageAddItemClassificationParams } from './add-item-classification.types';

export default async function PageAddItemClassification({
  params,
}: PageAddItemClassificationParams) {
  const { dishId } = await params;
  const dishSpecs = await getDishesSpecsAPI(dishId);

  const items = [
    { title: 'Detalhes', link: `/edit-item-details/${dishId}` },
    { title: 'Fotos', link: `/add-item-photos/${dishId}` },
    { title: 'Adicionais', link: `/add-item-additionals/${dishId}` },
    { title: 'Classificação', link: `/add-item-classification/${dishId}` },
    { title: 'Sabores', link: `/add-item-flavors/${dishId}` },
  ];

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
        <StepperBar currentStepperIndex={3} items={items} />
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
          hashKey='vegetarian'
          icon={<IconMeatOff />}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'vegetarian'
          )}
        />
        <ClassificationItem
          dishId={dishId}
          title='Zero lactose'
          description='Não contém lactose, ou seja, leite e seus derivados'
          hashKey='lactfree'
          icon={<IconMilkOff />}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'lactfree'
          )}
        />
        <ClassificationItem
          dishId={dishId}
          title='Vegano'
          description='Sem produtos de origem animal, como carne, ovo ou leite'
          hashKey='vegan'
          icon={<IconSeeding />}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'vegan'
          )}
        />
        <ClassificationItem
          dishId={dishId}
          title='Servido Gelado'
          description='Da geladeira direto para o consumidor'
          hashKey='cold'
          icon={<IconSnowflake />}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'cold'
          )}
        />
        <ClassificationItem
          dishId={dishId}
          title='Servido Quente'
          description='Produto que acabou de sair do forno'
          hashKey='hot'
          icon={<IconFlame />}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'hot'
          )}
        />
        <ClassificationItem
          dishId={dishId}
          title='Orgânico'
          description='Cultivado sem agrotóxicos, segundo a lei 10.831'
          hashKey='organic'
          icon={<IconLeaf />}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'organic'
          )}
        />
        <ClassificationItem
          dishId={dishId}
          title='Sem açúcar'
          description='Não contém nenhum tipo de açúcar (cristal, orgânico, mascavo, etc.)'
          hashKey='suggarfree'
          icon={<IconCandyOff />}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'suggarfree'
          )}
        />
        <ClassificationItem
          dishId={dishId}
          title='Natural'
          description='Preparado na hora com frutas frescas'
          hashKey='natural'
          icon={<IconPlant2 />}
          isActive={dishSpecs.some(
            (dishSpec) => dishSpec.DishSpecs.key === 'natural'
          )}
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
