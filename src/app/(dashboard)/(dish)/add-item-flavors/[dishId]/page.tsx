import { getDishFlavorsAPI } from '@/actions/dishes-flavors.action';
import Link from 'next/link';

import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';
import { StepperBar } from '@/components/inputs/stepper-bar';

import { PageAddItemFlavorsParams } from './add-item-flavors.types';
import { FormAddItemFlavors } from './form-add-item-flavors';

export default async function PageAddItemFlavors({
  params,
}: PageAddItemFlavorsParams) {
  const { dishId } = await params;
  const dishFlavors = await getDishFlavorsAPI(dishId);

  return (
    <div className='flex h-[calc(100vh-80px)] w-full flex-col overflow-y-auto'>
      <div className='flex items-end justify-between px-6 pt-6'>
        <Header
          backButton={{
            title: '',
            children: (
              <Link href={`/add-item-additionals/${dishId}`}>Voltar</Link>
            ),
          }}
          title='Adicionar item'
        />
        <StepperBar currentStepperIndex={4} />
      </div>

      <div className='p-6'>
        <div className='text-title-default text-2xl font-extrabold'>
          Sabores
        </div>
        <p className='text-text-default font-semibold'>
          Cadastre todas as suas variações de de sabores.
        </p>
      </div>

      <FormAddItemFlavors dishFlavors={dishFlavors} />

      <div className='border-border-default mt-auto flex justify-end gap-4 border-t px-8 py-4'>
        <Link href='/menu-list'>
          <Button size='md' family='secondary'>
            Cancelar
          </Button>
        </Link>
        <Link href='/menu-list'>
          <Button size='md'>Finalizar</Button>
        </Link>
      </div>
    </div>
  );
}
