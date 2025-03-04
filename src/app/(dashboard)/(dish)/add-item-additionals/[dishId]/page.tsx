import { getDishExtrasAPI } from '@/actions/dish.action';
import Link from 'next/link';

import { Header } from '@/components/data-display/header';
import { StepperBar } from '@/components/inputs/stepper-bar';

import { PageAddItemAdditionalsParams } from './add-item-additionals.types';
import { FormAddItemAdditionals } from './form-add-item-additionals';
import { ItemAdditional } from './item-additional';

export default async function PageAddItemAdditionals({
  params,
}: PageAddItemAdditionalsParams) {
  const { dishId } = await params;
  const dishExtras = await getDishExtrasAPI(dishId);

  return (
    <>
      <div className='flex items-end justify-between px-6 pt-6'>
        <Header
          title='Adicionar item'
          backButton={{
            title: '',
            children: <Link href={`/add-item-photos/${dishId}`}>Voltar</Link>,
          }}
        />
        <StepperBar currentStepperIndex={2} />
      </div>

      <div className='p-6'>
        <div className='text-title-default text-2xl font-extrabold'>
          Itens adicionais
        </div>
        <p className='text-text-default font-semibold'>
          Indique aqui se o item tem adicionais. (opcional)
        </p>
      </div>

      <div className='max-w-[780px] px-6'>
        <div className='space-y-3'>
          {dishExtras.map((item) => (
            <ItemAdditional
              key={item.id}
              id={item.id}
              name={item.title}
              price={item.price}
            />
          ))}
        </div>
      </div>

      <FormAddItemAdditionals dishId={dishId} />
    </>
  );
}
