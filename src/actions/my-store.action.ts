'use server';

import {
  ChangeLogoDTO,
  UpdateResturantDTO,
  changeLogoRestaurant,
  deleteLogoRestaurant,
  getRestaurantById,
  updateRestaurant,
} from '@/http/api';
import { auth, clerkClient } from '@clerk/nextjs/server';

import { getCookiesHeader } from './utils.action';

export async function getRestaurantData() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const response = await getRestaurantById(user.publicMetadata.restaurantId, {
    headers: {
      Cookie: await getCookiesHeader(),
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
  const response = await updateRestaurant(restaurantId, data, {
    headers: {
      Cookie: await getCookiesHeader(),
    },
  });

  return response;
}

export async function changeRestaurantLogo(
  restaurantId: string,
  file: ChangeLogoDTO
) {
  const response = await changeLogoRestaurant(restaurantId, file, {
    headers: {
      Cookie: await getCookiesHeader(),
    },
  });

  return response;
}

export async function deleteRestaurantLogo(restaurantId: string) {
  const response = await deleteLogoRestaurant(restaurantId, {
    headers: {
      Cookie: await getCookiesHeader(),
    },
  });

  return response;
}
