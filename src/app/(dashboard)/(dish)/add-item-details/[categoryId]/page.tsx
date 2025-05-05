import Link from 'next/link';

import { Header } from '@/components/data-display/header';
import { StepperBar } from '@/components/inputs/stepper-bar';

import { PageAddItemDetailsParams } from './add-items-details.types';
import { FormAddItemDetails } from './form-add-item-details';

export default async function PageAddItemDetails({
  params,
}: PageAddItemDetailsParams) {
  const { categoryId } = await params;
  const items = [
    { title: 'Detalhes', link: '' },
    { title: 'Fotos', link: '' },
    { title: 'Adicionais', link: '' },
    { title: 'Classificação', link: '' },
    { title: 'Sabores', link: '' },
  ];

  return (
    <div className='flex h-[calc(100vh-80px)] w-full flex-col overflow-y-auto'>
      <div className='flex items-end justify-between px-6 pt-6'>
        <Header
          backButton={{
            title: '',
            children: <Link href='/menu-list'>Voltar</Link>,
          }}
          title='Adicionar item'
        />
        <StepperBar currentStepperIndex={0} items={items} />
      </div>

      <FormAddItemDetails categoryId={categoryId} />
    </div>
  );
}
