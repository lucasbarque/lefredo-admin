'use server';

import {
  ChangeLogoDTO,
  UpdateResturantDTO,
  changeLogoRestaurant,
  deleteLogoRestaurant,
  getRestaurantById,
  getRestaurantIsFirstCategory,
  updateRestaurant,
} from '@/http/api';
import { revalidateTag } from 'next/cache';

import { RevalidateTags } from '@/constants/tags-revalidate';

import { getCookiesHeader } from './utils.action';

export async function getRestaurantData() {
  const headers = await getCookiesHeader();

  const response = await getRestaurantById(headers.restaurantid, {
    headers,
    cache: 'force-cache',
    next: {
      tags: [RevalidateTags.restaurant['update-restaurant']],
    },
  });

  if (response.status !== 200) throw new Error('Unauthorized');

  return response.data;
}

export async function updateRestaurantData({
  restaurantId,
  data,
}: {
  restaurantId: string;
  data: UpdateResturantDTO;
}) {
  const headers = await getCookiesHeader();

  const response = await updateRestaurant(restaurantId, data, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag(RevalidateTags.restaurant['update-restaurant']);
  }

  return response;
}

export async function changeRestaurantLogo(
  restaurantId: string,
  file: ChangeLogoDTO
) {
  const headers = await getCookiesHeader();

  const response = await changeLogoRestaurant(restaurantId, file, {
    headers,
  });

  return response;
}

export async function deleteRestaurantLogo(restaurantId: string) {
  const headers = await getCookiesHeader();

  const response = await deleteLogoRestaurant(restaurantId, {
    headers,
  });

  return response;
}

export async function getRestaurantIsFirstCategoryAPI() {
  const headers = await getCookiesHeader();

  const response = await getRestaurantIsFirstCategory(headers.restaurantid, {
    headers,
  });

  if (response.status !== 200) throw new Error('Unauthorized');

  return response.data;
}
