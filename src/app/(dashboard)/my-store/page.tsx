import { getRestaurantData } from '@/actions/my-store.action';

import { Header } from '@/components/data-display/header';

import { FormUpdateStore } from './form-update-store';

export default async function PageMyStore() {
  const restaurantData = await getRestaurantData();

  return (
    <section>
      <Header title='Informações da Loja' />
      <FormUpdateStore restaurantData={restaurantData} />
    </section>
  );
}
