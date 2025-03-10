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

import { RevalidateTags } from '@/constants/tags-revalidate';

import { getCookiesHeader } from './utils.action';

export async function getSectionsAPI() {
  const headers = await getCookiesHeader();

  const response = await getSections(
    { menuId: headers.menuid },
    {
      headers,
      cache: 'force-cache',
      next: {
        tags: [
          RevalidateTags.section['create-section'],
          RevalidateTags.section['delete-section'],
        ],
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
      tags: [RevalidateTags.section['update-section']],
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
          RevalidateTags.section['create-section'],
          RevalidateTags.section['update-section'],
          RevalidateTags.section['delete-section'],
          RevalidateTags.section['toggle-section'],
          RevalidateTags.dish['create-dish'],
          RevalidateTags.dish['toggle-dish'],
          RevalidateTags.dish['delete-dish'],
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
    revalidateTag(RevalidateTags.section['create-section']);
  }

  return response.status;
}

export async function deleteSectionAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteSection(id, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag(RevalidateTags.section['delete-section']);
  }

  return response.status;
}

export async function toggleSectionAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await toggleSection(id, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag(RevalidateTags.section['toggle-section']);
  }

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

  revalidateTag(RevalidateTags.section['update-section']);

  return response.status;
}
