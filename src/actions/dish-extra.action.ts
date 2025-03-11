'use server';

import {
  RequestCreateDishExtraDTO,
  RequestUpdateDishExtraDTO,
  createDishesExtra,
  deleteDishesExtra,
  getDishesExtras,
  updateDishesExtra,
} from '@/http/api';
import { revalidateTag } from 'next/cache';

import { RevalidateTags } from '@/constants/tags-revalidate';

import { getCookiesHeader } from './utils.action';

export async function getDishExtrasAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getDishesExtras(id, {
    headers,
    cache: 'force-cache',
    next: {
      tags: [
        RevalidateTags.dishExtra['create-dish-extra'],
        RevalidateTags.dishExtra['delete-dish-extra'],
        RevalidateTags.dishExtra['update-dish-extra'],
      ],
    },
  });

  return response.data;
}

export async function createDishesExtraAPI(
  dishId: string,
  data: RequestCreateDishExtraDTO
) {
  const headers = await getCookiesHeader();

  console.log({ dishId, data });
  const response = await createDishesExtra(dishId, data, {
    headers,
  });

  if (response.status === 201) {
    revalidateTag(RevalidateTags.dishExtra['create-dish-extra']);
  }

  return response.status;
}

export async function deleteDishesExtraAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteDishesExtra(id, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag(RevalidateTags.dishExtra['delete-dish-extra']);
  }

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

  revalidateTag(RevalidateTags.dishExtra['update-dish-extra']);

  return response.status;
}
