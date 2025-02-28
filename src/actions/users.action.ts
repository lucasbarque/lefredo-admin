'use server';

import { changeOnboardingStatus, getUserByRestaurantId } from '@/http/api';
import { auth, clerkClient } from '@clerk/nextjs/server';

import { getCookiesHeader } from './utils.action';

export async function getUsersByRestaurantIdAPI() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const response = await getUserByRestaurantId(
    user.publicMetadata.restaurantId,
    {
      headers: {
        Cookie: await getCookiesHeader(),
      },
    }
  );

  if (response.status !== 200) throw new Error('Unauthorized');

  return response.data;
}

export async function changeOnboardingStatusAPI() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const userAPI = await getUserByRestaurantId(
    user.publicMetadata.restaurantId,
    {
      headers: {
        Cookie: await getCookiesHeader(),
      },
    }
  );

  if (!userAPI.data.id) {
    throw new Error('Failed to get user id');
  }

  const response = await changeOnboardingStatus(userAPI.data.id);

  return response;
}
