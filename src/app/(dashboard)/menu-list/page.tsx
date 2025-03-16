import { getSectionsAPI } from '@/actions/section.action';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';

import { CategoryListItems } from './category-list-items';

export default async function PageMenuList() {
  const sections = await getSectionsAPI();

  return (
    <section className='pb-64'>
      <Header
        title='Cardápio'
        description='Este é o seu cardápio. Aqui você define quais os itens seus clientes
        poderão visualizar no app.'
      />

      <div className='flex items-center justify-end pt-14'>
        <Link href='/create-category'>
          <Button>
            <Button.Icon>
              <IconPlus size={24} />
            </Button.Icon>
            Adicionar categoria
          </Button>
        </Link>
      </div>
      <div>
        <h2 className='text-title-default text-2xl font-medium'>Editar</h2>
        <p className='text-text-default pt-1.5 text-lg'>
          Ative ou pause a exibição dos itens do seu cardápio, altere os preços
          e muito mais.
        </p>
      </div>
      <div className='flex flex-col gap-6 pt-6'>
        {sections?.map((section) => (
          <CategoryListItems
            key={section.id}
            id={section.id}
            title={section.title}
            slug={section.slug}
            isActive={section.isActive}
          />
        ))}
      </div>
    </section>
  );
}
