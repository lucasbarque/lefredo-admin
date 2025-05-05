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

  const items = [
    { title: 'Detalhes', link: `/edit-item-details/${dishId}` },
    { title: 'Fotos', link: `/add-item-photos/${dishId}` },
    { title: 'Adicionais', link: `/add-item-additionals/${dishId}` },
    { title: 'Classificação', link: `/add-item-classification/${dishId}` },
    { title: 'Sabores', link: `/add-item-flavors/${dishId}` },
  ];

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
        <StepperBar currentStepperIndex={4} items={items} />
      </div>

      <div className='p-6'>
        <div className='text-title-default text-2xl font-extrabold'>
          Sabores
        </div>
        <p className='text-text-default font-semibold'>
          Cadastre todas as suas variações de sabores.
        </p>
      </div>

      <FormAddItemFlavors dishId={dishId} />

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
