'use server';

import {
  RequestUpdateSectionDTO,
  createSection,
  deleteSection,
  getAllSections,
  getSectionById,
  toggleSection,
  updateSection,
} from '@/http/api';

import { getCookiesHeader } from './utils.action';

export async function getSectionsAPI() {
  const headers = await getCookiesHeader();

  const response = await getAllSections(
    { menuId: headers.menuid },
    {
      headers,
    }
  );

  return response.data;
}

export async function getSectionByIdAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getSectionById(id, {
    headers,
  });

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

  return response;
}

export async function deleteSectionAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteSection(id, {
    headers,
  });
  return response.status;
}

export async function toggleSectionAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await toggleSection(id, {
    headers,
  });

  return response;
}

export async function updateSectionAPI(
  id: string,
  data: RequestUpdateSectionDTO
) {
  const headers = await getCookiesHeader();

  const response = await updateSection(id, data, {
    headers,
  });

  return response;
}
