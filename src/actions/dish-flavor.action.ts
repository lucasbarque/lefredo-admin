'use server';

import {
  RequestCreateDishesFlavorsDTO,
  RequestUpdateDishesFlavorsDTO,
  RequestUploadDishFlavorImageDTO,
  createDishesFlavors,
  deleteDishFlavorMediaImage,
  deleteDishesFlavors,
  getDishesFlavors,
  updateDishesFlavors,
  uploadDishFlavorImage,
} from '@/http/api';

import { getCookiesHeader } from './utils.action';

export async function getDishFlavorsAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getDishesFlavors(id, {
    headers,
  });

  return response;
}

export async function createDishesFlavorsAPI(
  dishId: string,
  data: RequestCreateDishesFlavorsDTO
) {
  const headers = await getCookiesHeader();

  const response = await createDishesFlavors(dishId, data, {
    headers,
  });

  return response;
}

export async function deleteDishesFlavorsAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteDishesFlavors(id, {
    headers,
  });

  return response;
}

export async function updateDishesFlavorsAPI(
  id: string,
  data: RequestUpdateDishesFlavorsDTO
) {
  const headers = await getCookiesHeader();

  const response = await updateDishesFlavors(id, data, {
    headers,
  });

  return response;
}

export async function uploadDishesFlavorsImageAPI(
  id: string,
  file: RequestUploadDishFlavorImageDTO
) {
  const headers = await getCookiesHeader();

  const response = await uploadDishFlavorImage(
    id,
    //@ts-ignore
    { file },
    {
      headers,
    }
  );

  return response;
}

export async function deleteDishesFlavorsImageAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteDishFlavorMediaImage(id, {
    headers,
  });

  return response;
}
