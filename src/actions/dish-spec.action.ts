'use server';

import {
  RequestDishSpecsToggleDTO,
  getDishesSpecs,
  toggleDishesSpec,
} from '@/http/api';

import { getCookiesHeader } from './utils.action';

export async function getDishesSpecsAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getDishesSpecs(id, {
    headers,
  });

  return response.data;
}

export async function toggleDishesSpecsAPI(
  id: string,
  data: RequestDishSpecsToggleDTO
) {
  const headers = await getCookiesHeader();

  const response = await toggleDishesSpec(id, data, {
    headers,
  });

  return response;
}
