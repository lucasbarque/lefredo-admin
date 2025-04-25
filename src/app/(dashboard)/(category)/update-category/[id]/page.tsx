import { getSectionByIdAPI } from '@/actions/section.action';
import Link from 'next/link';

import { Header } from '@/components/data-display/header';

import { FormUpdateCategory } from './form-update-category';
import { UpdateCategoryPageParams } from './update-category.types';

export default async function PageUpdateCategory({
  params,
}: UpdateCategoryPageParams) {
  const { id } = await params;
  const categoryData = await getSectionByIdAPI(id);

  return (
    <section>
      <Header
        backButton={{
          title: '',
          children: <Link href='/menu-list'>Voltar</Link>,
        }}
        title='Editar categoria'
        description='Edite as informações da categoria.'
      />
      <div className='pt-6'>
        <FormUpdateCategory initialData={categoryData} />
      </div>
    </section>
  );
}
