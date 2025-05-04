import { fetcher } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { Steps } from './welcome.types';

export function useWelcome() {
  const { user } = useUser();

  const { data: categoriesCount, isLoading: categoriesLoading } = useQuery({
    queryKey: ['all-categories'],
    queryFn: () => fetcher('/api/reports/categories'),
  });

  const { data: dishesCount, isLoading: dishesLoading } = useQuery({
    queryKey: ['all-dishes'],
    queryFn: () => fetcher('/api/reports/dishes'),
  });

  const { data: flavorsCount, isLoading: flavorsLoading } = useQuery({
    queryKey: ['all-flavors'],
    queryFn: () => fetcher('/api/reports/flavors'),
  });

  const { data: hasLogo, isLoading: hasLogoLoading } = useQuery({
    queryKey: ['has-logo'],
    queryFn: () => fetcher('/api/reports/logo'),
  });

  const { data: hasActiveCategory, isLoading: hasActiveCategoryLoading } =
    useQuery({
      queryKey: ['has-active-category'],
      queryFn: () => fetcher('/api/reports/active-category'),
    });

  console.log(hasActiveCategory);

  const steps: Steps[] = [
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
      isChecked: hasLogo === 'true',
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
      isChecked: hasActiveCategory === 'true',
    },
  ];

  const totalSteps = steps.length;
  const completedSteps = steps.filter((step) => step.isChecked).length;

  return {
    totalSteps,
    completedSteps,
    steps,
    user,
    categoriesLoading,
    dishesLoading,
    flavorsLoading,
    hasLogoLoading,
    hasActiveCategoryLoading,
    categoriesCount,
    flavorsCount,
    dishesCount,
  };
}
