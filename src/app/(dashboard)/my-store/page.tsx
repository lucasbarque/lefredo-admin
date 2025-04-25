'use client';

import { fetcher } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

import { Header } from '@/components/data-display/header';

import { FormUpdateStore } from './form-update-store';
import { Skeleton } from './skeleton';

export default function PageMyStore() {
  const { data, isLoading } = useQuery({
    queryKey: ['restaurantData'],
    queryFn: () => fetcher('/api/restaurants'),
  });

  if (isLoading || !data) return <Skeleton />;

  return (
    <section>
      <Header title='Informações da Loja' />
      <FormUpdateStore restaurantData={data} />
    </section>
  );
}
