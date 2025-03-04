'use server';

import {
  RequestUpdateSectionDTO,
  createSection,
  deleteSection,
  getSectionById,
  getSections,
  getSectionsWithItems,
  toggleSection,
  updateSection,
} from '@/http/api';
import { revalidateTag } from 'next/cache';

import { getCookiesHeader } from './utils.action';

export async function getSectionsAPI() {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await getSections(
    { menuId: menuid },
    {
      headers: {
        Cookie: cookies,
        restaurantid,
        menuid,
      },
      cache: 'force-cache',
      next: {
        tags: ['create-section', 'delete-section'],
      },
    }
  );

  return response.data;
}

export async function getSectionByIdAPI(id: string) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await getSectionById(id, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
    cache: 'force-cache',
    next: {
      tags: ['update-section'],
    },
  });

  return response.data;
}

export async function getSectionsWithItemsAPI() {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await getSectionsWithItems(
    { menuId: menuid },
    {
      headers: {
        Cookie: cookies,
        restaurantid,
        menuid,
      },
      cache: 'force-cache',
      next: {
        tags: [
          'delete-section',
          'create-section',
          'update-section',
          'delete-dish',
        ],
      },
    }
  );

  return response.data;
}

export async function createSectionAPI(data: {
  title: string;
  description: string | null;
}) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await createSection(
    { ...data, menuId: menuid },
    {
      headers: {
        Cookie: cookies,
        restaurantid,
        menuid,
      },
    }
  );

  if (response.status === 201) {
    revalidateTag('create-section');
  }

  return response.status;
}

export async function deleteSectionAPI(id: string) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await deleteSection(id, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  if (response.status === 200) {
    revalidateTag('delete-section');
  }

  return response.status;
}

export async function toggleSectionAPI(id: string) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await toggleSection(id, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  // if (response.status === 200) {
  //   revalidateTag('delete-section');
  // }

  return response.status;
}

export async function updateSectionAPI(
  id: string,
  data: RequestUpdateSectionDTO
) {
  const { cookies, restaurantid, menuid } = await getCookiesHeader();

  const response = await updateSection(id, data, {
    headers: {
      Cookie: cookies,
      restaurantid,
      menuid,
    },
  });

  revalidateTag('update-section');

  return response.status;
}
