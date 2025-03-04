'use server';

import {
  RequestChangePriceDTO,
  RequestCreateDishDTO,
  RequestUpdateDishDTO,
  changePrice,
  createDish,
  deleteDish,
  getDishById,
  getDishExtras,
  toggleDish,
  updateDish,
} from '@/http/api';
import { revalidateTag } from 'next/cache';

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

export async function deleteDishAPI(id: string) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await deleteDish(id, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  if (response.status === 200) {
    revalidateTag('delete-dish');
  }

  return response.status;
}

export async function getDishByIdAPI(id: string) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await getDishById(id, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });
  return response.data;
}

export async function updateDishAPI(id: string, data: RequestUpdateDishDTO) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await updateDish(id, data, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  return response.status;
}

export async function getDishExtrasAPI(id: string) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await getDishExtras(id, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  return response.data;
}
