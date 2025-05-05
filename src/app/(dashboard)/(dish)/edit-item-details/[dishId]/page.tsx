import { getDishByIdAPI } from '@/actions/dish.action';
import Link from 'next/link';

import { Header } from '@/components/data-display/header';
import { StepperBar } from '@/components/inputs/stepper-bar';

import { PageEditItemDetailsParams } from './edit-items-details.types';
import { FormEditItemDetails } from './form-edit-item-details';

export default async function PageAddItemDetails({
  params,
}: PageEditItemDetailsParams) {
  const { dishId } = await params;
  const dish = await getDishByIdAPI(dishId);

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
            children: <Link href='/menu-list'>Voltar</Link>,
          }}
          title='Atualizar item'
        />
        <StepperBar currentStepperIndex={0} items={items} />
      </div>

      <FormEditItemDetails data={dish.data} />
    </div>
  );
}
