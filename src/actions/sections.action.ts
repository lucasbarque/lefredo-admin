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
  const headers = await getCookiesHeader();

  const response = await getSections(
    { menuId: headers.menuid },
    {
      headers,
      cache: 'force-cache',
      next: {
        tags: ['create-section', 'delete-section'],
      },
    }
  );

  return response.data;
}

export async function getSectionByIdAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getSectionById(id, {
    headers,
    cache: 'force-cache',
    next: {
      tags: ['update-section'],
    },
  });

  return response.data;
}

export async function getSectionsWithItemsAPI() {
  const headers = await getCookiesHeader();

  const response = await getSectionsWithItems(
    { menuId: headers.menuid },
    {
      headers,
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
  const headers = await getCookiesHeader();

  const response = await createSection(
    { ...data, menuId: headers.menuid },
    {
      headers,
    }
  );

  if (response.status === 201) {
    revalidateTag('create-section');
  }

  return response.status;
}

export async function deleteSectionAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteSection(id, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag('delete-section');
  }

  return response.status;
}

export async function toggleSectionAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await toggleSection(id, {
    headers,
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
  const headers = await getCookiesHeader();

  const response = await updateSection(id, data, {
    headers,
  });

  revalidateTag('update-section');

  return response.status;
}
