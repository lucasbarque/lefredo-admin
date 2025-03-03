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

import { getCookiesHeader } from './utils.action';

export async function getRestaurantData() {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await getRestaurantById(restaurantid, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
    cache: 'force-cache',
    next: {
      tags: ['update-restaurant'],
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
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await updateRestaurant(restaurantId, data, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  if (response.status === 200) {
    revalidateTag('update-restaurant');
  }

  return response;
}

export async function changeRestaurantLogo(
  restaurantId: string,
  file: ChangeLogoDTO
) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await changeLogoRestaurant(restaurantId, file, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  return response;
}

export async function deleteRestaurantLogo(restaurantId: string) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await deleteLogoRestaurant(restaurantId, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  return response;
}

export async function getRestaurantIsFirstCategoryAPI() {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await getRestaurantIsFirstCategory(restaurantid, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
    cache: 'force-cache',
    next: {
      tags: ['update-restaurant-first-category'],
    },
  });

  if (response.status !== 200) throw new Error('Unauthorized');

  return response.data;
}
