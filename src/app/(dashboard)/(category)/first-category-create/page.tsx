import { getRestaurantIsFirstCategoryAPI } from '@/actions/my-store.action';
import { getSectionsAPI } from '@/actions/sections.action';
import { IconDeviceMobileSearch } from '@tabler/icons-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { CategoryItem } from '@/components/data-display/category-item';
import { Header } from '@/components/data-display/header';

import { FormCreateCategory } from './form-create-category';

export default async function PageFirstCategoryCreate() {
  const { isFirstCategory } = await getRestaurantIsFirstCategoryAPI();

  if (!isFirstCategory) {
    return redirect('menu-list');
  }

  const sections = await getSectionsAPI();

  return (
    <section>
      <Header
        title='Cardápio'
        description=' Este é o seu cardápio. Aqui você define quais os itens seus clientes
        poderão visualizar no app.'
      />
      <div className='flex w-full gap-16'>
        <div>
          <div className='text-title-default pt-6 text-2xl font-bold'>
            Vamos criar as
            <br />
            categorias de produtos
          </div>
          <p className='text-text-default max-w-[464px] pt-3 text-lg'>
            Elas ajudam na organização dos produtos em grupos, tornando mais
            fácil para seus clientes encontrarem o que procuram na sua loja.
          </p>
          <div className='mt-5 flex flex-col gap-2'>
            {sections?.map((section) => (
              <CategoryItem
                key={section.id}
                id={section.id}
                title={section.title}
              />
            ))}
          </div>

          <FormCreateCategory />
        </div>
        <div className='flex flex-col gap-4 pt-6'>
          <Image
            className='drop-shadow-mobile'
            src='/assets/images/preview-2.png'
            alt=''
            height={625}
            width={282}
            quality={100}
          />
          <div className='border-line flex w-[280px] items-center gap-2 rounded-md border bg-gray-400 px-6 py-3 text-[10px] font-bold'>
            <IconDeviceMobileSearch size={24} className='shrink-0' />É mais ou
            menos assim que essas informações ficam no app do Le Fredo
          </div>
        </div>
      </div>
    </section>
  );
}
