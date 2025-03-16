'use client';

import { getSectionsAPI } from '@/actions/section.action';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Header } from '@/components/data-display/header';
import { SkeletonItem } from '@/components/data-display/skeleton-item/skeleton-item';
import { Button } from '@/components/inputs/button';

import { CategoryListItems } from './category-list-items';

export default function PageMenuList() {
  const {
    data: sections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['sections'],
    queryFn: getSectionsAPI,
  });

  if (isLoading)
    return (
      <div className='flex flex-col'>
        <SkeletonItem width='119px' height='28px' />
        <SkeletonItem className='mt-2' width='756px' height='28px' />

        <SkeletonItem className='mt-14 ml-auto' width='211px' height='44px' />

        <SkeletonItem width='63px' height='32px' />
        <SkeletonItem className='mt-2' width='650px' height='34px' />

        <SkeletonItem className='mt-6' width='100%' height='94px' fullsize />
        <SkeletonItem className='mt-6' width='100%' height='94px' fullsize />
        <SkeletonItem className='mt-6' width='100%' height='94px' fullsize />
      </div>
    );

  if (isError) return <div>Falha ao carregar o cardápio.</div>;

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
