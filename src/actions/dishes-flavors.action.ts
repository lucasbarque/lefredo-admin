'use server';

import {
  RequestCreateDishesFlavorsDTO,
  RequestUpdateDishesFlavorsDTO,
  createDishesFlavors,
  deleteDishesFlavors,
  getDishesFlavors,
  updateDishesFlavors,
} from '@/http/api';
import { revalidateTag } from 'next/cache';

import { getCookiesHeader } from './utils.action';

export async function getDishFlavorsAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getDishesFlavors(id, {
    headers,
    cache: 'force-cache',
    next: {
      tags: [
        'create-dishes-flavors',
        'delete-dishes-flavors',
        'update-dish-flavors',
      ],
    },
  });

  return response.data;
}

export async function createDishesFlavorsAPI(
  dishId: string,
  data: RequestCreateDishesFlavorsDTO
) {
  const headers = await getCookiesHeader();
  console.log(data);

  const response = await createDishesFlavors(dishId, data, {
    headers,
  });

  if (response.status === 201) {
    revalidateTag('create-dishes-flavors');
  }

  return response.status;
}

export async function deleteDishesFlavorsAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteDishesFlavors(id, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag('delete-dishes-flavors');
  }

  return response.status;
}

export async function updateDishesFlavorsAPI(
  id: string,
  data: RequestUpdateDishesFlavorsDTO
) {
  const headers = await getCookiesHeader();

  const response = await updateDishesFlavors(id, data, {
    headers,
  });

  revalidateTag('update-dish-flavors');

  return response.status;
}
