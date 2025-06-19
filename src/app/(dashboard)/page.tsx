'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { Button } from '@/components/inputs/button';

import { useWelcome } from './(components)/use-welcome';

const Card = dynamic(() =>
  import('./(components)/card').then((mod) => mod.Card)
);
const GetStartedItem = dynamic(() =>
  import('./(components)/get-started-item').then((mod) => mod.GetStartedItem)
);
const SkeletonItem = dynamic(() =>
  import('@/components/data-display/skeleton-item/skeleton-item').then(
    (mod) => mod.SkeletonItem
  )
);

export default function PageWelcome() {
  const {
    user,
    categoriesLoading,
    dishesLoading,
    hasLogoLoading,
    flavorsLoading,
    hasActiveCategoryLoading,
    categoriesCount,
    dishesCount,
    flavorsCount,
    completedSteps,
    totalSteps,
    steps,
  } = useWelcome();

  return (
    <div className='h-[calc(100vh-80px)] w-full overflow-y-scroll p-8 outline-0'>
      <div className='flex items-center justify-between'>
        <div>
          <div
            className='text-title-default flex items-center gap-2 text-3xl font-extrabold'
            data-testid='welcome-message'
          >
            <div className='shrink-0'>Seja bem-vindo(a)</div>
            {!user ? (
              <SkeletonItem width='170px' height='32px' />
            ) : (
              user.firstName + ' ' + user?.lastName
            )}
            <span>🎉</span>
          </div>
          <p className='text-text-default mt-3.5 max-w-[700px] text-lg leading-[140%]'>
            Estamos felizes em ter você aqui, agora você pode facilitar a
            experiência dos seus clientes, gerencie seu cardápio com facilidade
            e eficiência.
          </p>
        </div>
        <Link href='/menu-list'>
          <Button>Ir para o cardápio</Button>
        </Link>
      </div>

      <div className='mt-10 flex w-full items-center gap-3.5'>
        <Card
          title='Categorias cadastradas'
          value={categoriesCount || 0}
          type='category'
          isLoading={categoriesLoading}
        />
        <Card
          title='Pratos cadastrados'
          value={dishesCount || 0}
          type='dish'
          isLoading={dishesLoading}
        />
        <Card
          title='Sabores cadastrados'
          value={flavorsCount || 0}
          type='flavors'
          isLoading={flavorsLoading}
        />
      </div>

      <div className='mt-10 pb-10'>
        <div className='text-title-default flex items-center gap-2 text-2xl font-bold'>
          Por onde começar?
          {hasLogoLoading ||
          categoriesLoading ||
          dishesLoading ||
          hasActiveCategoryLoading ? (
            <span className='inline-block h-6 w-10 animate-pulse rounded-sm bg-gray-500/30' />
          ) : (
            <span className='text-text-default text-lg font-medium'>
              ({completedSteps}/{totalSteps})
            </span>
          )}
        </div>

        <div className='mt-4 flex flex-col gap-4'>
          {hasLogoLoading ||
          categoriesLoading ||
          dishesLoading ||
          hasActiveCategoryLoading ? (
            <div className='flex flex-col gap-4'>
              <SkeletonItem
                className='rounded-2xl'
                width='100%'
                height='90px'
              />
              <SkeletonItem
                className='rounded-2xl'
                width='100%'
                height='90px'
              />
              <SkeletonItem
                className='rounded-2xl'
                width='100%'
                height='90px'
              />
              <SkeletonItem
                className='rounded-2xl'
                width='100%'
                height='90px'
              />
            </div>
          ) : (
            <>
              {steps.map((step, index) => (
                <GetStartedItem
                  key={index}
                  title={step.title}
                  text={step.text}
                  type={step.type}
                  isChecked={step.isChecked}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
