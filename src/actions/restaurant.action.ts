'use server';

import {
  ChangeLogoDTO,
  UpdateResturantDTO,
  changeLogoRestaurant,
  deleteLogoRestaurant,
  getRestaurantIsFirstCategory,
  updateRestaurant,
} from '@/http/api';

import { getCookiesHeader } from './utils.action';

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

  return response.data;
}
