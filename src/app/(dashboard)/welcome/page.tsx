'use client';

import {
  getAllCategoriesReportAPI,
  getAllDishFlavorsReportAPI,
  getAllDishesReportAPI,
  hasActiveCategoryReportAPI,
  hasLogoReportAPI,
} from '@/actions/report.action';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Button } from '@/components/inputs/button';

import { Card } from './card';
import { GetStartedItem } from './get-started-item';

export default function PageWelcome() {
  const { data: categoriesCount, isLoading: categoriesLoading } = useQuery({
    queryKey: ['all-categories'],
    queryFn: async () => {
      const response = await getAllCategoriesReportAPI();
      if (response.status === 200) return response.data;
      throw new Error('Erro ao buscar categorias');
    },
  });

  const { data: dishesCount, isLoading: dishesLoading } = useQuery({
    queryKey: ['all-dishes'],
    queryFn: async () => {
      const response = await getAllDishesReportAPI();
      if (response.status === 200) return response.data;
      throw new Error('Erro ao buscar dishes');
    },
  });

  const { data: flavorsCount, isLoading: flavorsLoading } = useQuery({
    queryKey: ['all-flavors'],
    queryFn: async () => {
      const response = await getAllDishFlavorsReportAPI();
      if (response.status === 200) return response.data;
      throw new Error('Erro ao buscar flavors');
    },
  });

  const { data: hasLogo, isLoading: hasLogoLoading } = useQuery({
    queryKey: ['has-logo'],
    queryFn: async () => {
      const response = await hasLogoReportAPI();
      if (response.status === 200) return response.data;
      throw new Error('Erro ao buscar logo');
    },
  });

  const { data: hasActiveCategory, isLoading: hasActiveCategoryLoading } =
    useQuery({
      queryKey: ['has-active-category'],
      queryFn: async () => {
        const response = await hasActiveCategoryReportAPI();
        if (response.status === 200) return response.data;
        throw new Error('Erro ao buscar categoria ativa');
      },
    });

  const steps = [
    {
      title: 'Cadastre a primeira categoria',
      text: 'As categorias ajudam seus clientes a navegarem com mais facilidade pelo cardápio digital, além de deixarem tudo mais organizado para você no painel administrativo.',
      type: 'category',
      isChecked: categoriesCount !== 0,
    },
    {
      title: 'Faça upload da sua logo',
      text: 'Personalize o seu sistema e deixe tudo com a cara do seu restaurante. Isso ajuda a fortalecer a identidade visual do seu negócio.',
      type: 'upload',
      isChecked: hasLogo,
    },
    {
      title: 'Cadastre, pelo menos 01 prato',
      text: 'Pode ser o carro-chefe da casa, aquele que todo mundo ama ou o que melhor representa sua cozinha.',
      type: 'dish',
      isChecked: dishesCount !== 0,
    },
    {
      title: 'Ative pelo menos uma categoria',
      text: 'Ao ativar a categoria, todos os pratos cadastrados dentro dela também serão exibidos para seus clientes. Você pode ativar ou desativar categorias a qualquer momento.',
      type: 'active',
      isChecked: hasActiveCategory,
    },
  ];

  // Cálculo do progresso
  const totalSteps = steps.length;
  const completedSteps = steps.filter((step) => step.isChecked).length;

  return (
    <div className='h-[calc(100vh-80px)] w-full overflow-y-scroll p-8'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='text-title-default text-3xl font-extrabold'>
            Seja bem-vindo(a) Lucas Barque 🎉
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
        <div className='text-title-default text-2xl font-bold'>
          Por onde começar?{' '}
          <span className='text-text-default text-lg font-medium'>
            ({completedSteps}/{totalSteps})
          </span>
        </div>

        <div className='mt-4 flex flex-col gap-4'>
          {hasLogoLoading ||
          categoriesLoading ||
          dishesLoading ||
          hasActiveCategoryLoading ? (
            <div className='flex flex-col gap-4'>
              <div className='h-25 w-full animate-pulse rounded-2xl bg-gray-500/20'></div>
              <div className='h-25 w-full animate-pulse rounded-2xl bg-gray-500/20'></div>
              <div className='h-25 w-full animate-pulse rounded-2xl bg-gray-500/20'></div>
              <div className='h-25 w-full animate-pulse rounded-2xl bg-gray-500/20'></div>
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
