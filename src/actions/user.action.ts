'use server';

import { changeOnboardingStatus, getUserByRestaurantId } from '@/http/api';

import { getCookiesHeader } from './utils.action';

export async function getUsersByRestaurantIdAPI() {
  const headers = await getCookiesHeader();

  const response = await getUserByRestaurantId(headers.restaurantid, {
    headers,
  });

  if (response.status !== 200) throw new Error('Unauthorized');

  return response.data;
}

export async function changeOnboardingStatusAPI() {
  const headers = await getCookiesHeader();

  const userAPI = await getUserByRestaurantId(headers.restaurantid, {
    headers,
  });

  if (!userAPI.data.id) {
    throw new Error('Failed to get user id');
  }

  const response = await changeOnboardingStatus(userAPI.data.id);

  return response;
}
