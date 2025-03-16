'use server';

import {
  RequestCreateDishExtraDTO,
  RequestUpdateDishExtraDTO,
  createDishesExtra,
  deleteDishesExtra,
  getDishesExtras,
  updateDishesExtra,
} from '@/http/api';

import { getCookiesHeader } from './utils.action';

export async function getDishExtrasAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getDishesExtras(id, {
    headers,
  });

  return response;
}

export async function createDishesExtraAPI(
  dishId: string,
  data: RequestCreateDishExtraDTO
) {
  const headers = await getCookiesHeader();

  const response = await createDishesExtra(dishId, data, {
    headers,
  });

  return response;
}

export async function deleteDishesExtraAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteDishesExtra(id, {
    headers,
  });

  return response.status;
}

export async function updateDishesExtraAPI(
  id: string,
  data: RequestUpdateDishExtraDTO
) {
  const headers = await getCookiesHeader();

  const response = await updateDishesExtra(id, data, {
    headers,
  });

  return response;
}
