'use server';

import {
  RequestDishSpecsToggleDTO,
  getDishesSpecs,
  toggleDishesSpec,
} from '@/http/api';
import { revalidateTag } from 'next/cache';

import { getCookiesHeader } from './utils.action';

export async function getDishesSpecsAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getDishesSpecs(id, {
    headers,
    cache: 'force-cache',
    next: {
      tags: ['toggle-dishes-specs'],
    },
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

  if (response.status === 200) {
    revalidateTag('toggle-dishes-specs');
  }

  return response;
}
