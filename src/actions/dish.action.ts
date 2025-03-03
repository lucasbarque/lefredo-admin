'use server';

import {
  RequestChangePriceDTO,
  RequestCreateDishDTO,
  changePrice,
  createDish,
  toggleDish,
} from '@/http/api';

import { getCookiesHeader } from './utils.action';

export async function toggleDishAPI(id: string) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await toggleDish(id, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  return response.status;
}

export async function changePriceAPI(
  id: string,
  { price }: RequestChangePriceDTO
) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await changePrice(
    id,
    { price },
    {
      headers: {
        Cookie: cookies,
        restaurantid,
        menuid,
      },
    }
  );

  return response.status;
}

export async function createDishAPI(data: RequestCreateDishDTO) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await createDish(data, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  return response;
}
