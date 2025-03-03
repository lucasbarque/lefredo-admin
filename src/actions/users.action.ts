'use server';

import { changeOnboardingStatus, getUserByRestaurantId } from '@/http/api';

import { getCookiesHeader } from './utils.action';

export async function getUsersByRestaurantIdAPI() {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await getUserByRestaurantId(restaurantid, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  if (response.status !== 200) throw new Error('Unauthorized');

  return response.data;
}

export async function changeOnboardingStatusAPI() {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const userAPI = await getUserByRestaurantId(restaurantid, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  if (!userAPI.data.id) {
    throw new Error('Failed to get user id');
  }

  const response = await changeOnboardingStatus(userAPI.data.id);

  return response;
}
