'use server';

import { cookies } from 'next/headers';

export async function getCookiesHeader() {
  const cookiesData = await cookies();
  const cookieEntries = cookiesData
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`);

  return cookieEntries.join('; ');
}
