'use server';

import {
  RequestChangePriceDTO,
  RequestCreateDishDTO,
  RequestUpdateDishDTO,
  RequestUpdateDishExtrasOrderDTO,
  changePrice,
  createDish,
  deleteDish,
  getDishById,
  toggleDish,
  updateDish,
  updateDishExtrasOrder,
} from '@/http/api';
import { revalidateTag } from 'next/cache';

import { getCookiesHeader } from './utils.action';

export async function toggleDishAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await toggleDish(id, {
    headers,
  });

  return response.status;
}

export async function changePriceAPI(
  id: string,
  { price }: RequestChangePriceDTO
) {
  const headers = await getCookiesHeader();

  const response = await changePrice(
    id,
    { price },
    {
      headers,
    }
  );

  return response.status;
}

export async function createDishAPI(data: RequestCreateDishDTO) {
  const headers = await getCookiesHeader();

  const response = await createDish(data, {
    headers,
  });

  return response;
}

export async function deleteDishAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteDish(id, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag('delete-dish');
  }

  return response.status;
}

export async function getDishByIdAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getDishById(id, {
    headers,
  });
  return response.data;
}

export async function updateDishAPI(id: string, data: RequestUpdateDishDTO) {
  const headers = await getCookiesHeader();

  const response = await updateDish(id, data, {
    headers,
  });

  return response.status;
}

export async function updateDishExtrasOrderAPI(
  id: string,
  data: RequestUpdateDishExtrasOrderDTO
) {
  const headers = await getCookiesHeader();

  const response = await updateDishExtrasOrder(id, data, {
    headers,
  });

  return response.status;
}
