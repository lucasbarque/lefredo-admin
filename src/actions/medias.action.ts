'use server';

import {
  UploadSingleFileDTO,
  uploadSingleFile as uploadSingleFileAPI,
} from '@/http/api';
import { cookies } from 'next/headers';

async function getCookiesHeader() {
  const cookiesData = await cookies();
  const cookieEntries = cookiesData
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`);

  return cookieEntries.join('; ');
}

export async function uploadSingleFile({
  data,
}: {
  data: UploadSingleFileDTO;
}) {
  const response = await uploadSingleFileAPI(data, {
    headers: {
      Cookie: await getCookiesHeader(),
    },
  });

  return response;
}
