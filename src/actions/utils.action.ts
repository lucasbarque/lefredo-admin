'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';

export async function getCookiesHeader() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const cookiesData = await cookies();

  const cookieEntries = cookiesData
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`);

  return {
    Cookie: cookieEntries.join('; '),
    restaurantid: user.publicMetadata.restaurantId,
    menuid: user.publicMetadata.menuId,
  };
}
