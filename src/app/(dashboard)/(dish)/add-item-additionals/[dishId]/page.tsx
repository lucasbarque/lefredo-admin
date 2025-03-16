import Link from 'next/link';

import { Header } from '@/components/data-display/header';
import { StepperBar } from '@/components/inputs/stepper-bar';

import { PageAddItemAdditionalsParams } from './add-item-additionals.types';
import { FormAddItemAdditionals } from './form-add-item-additionals';

export default async function PageAddItemAdditionals({
  params,
}: PageAddItemAdditionalsParams) {
  const { dishId } = await params;

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

      <div className='px-6 pt-6'>
        <div className='text-title-default text-2xl font-extrabold'>
          Itens adicionais
        </div>
        <p className='text-text-default font-semibold'>
          Indique aqui se o item tem adicionais. (opcional)
        </p>
      </div>

      <FormAddItemAdditionals dishId={dishId} />
    </>
  );
}
