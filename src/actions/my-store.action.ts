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
import { cookies } from 'next/headers';

async function getCookiesHeader() {
  const cookiesData = await cookies();
  const cookieEntries = cookiesData
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`);

  return cookieEntries.join('; ');
}

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
  const cookiesData = await cookies();
  const cookieEntries = cookiesData
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`);

  const cookiesHeader = cookieEntries.join('; ');

  const response = await updateRestaurant(restaurantId, data, {
    headers: {
      Cookie: cookiesHeader,
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
