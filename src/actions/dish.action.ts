'use server';

import {
  RequestChangePriceDTO,
  RequestCreateDishDTO,
  RequestUpdateDishDTO,
  RequestUpdateDishExtrasOrderDTO,
  RequestUpdateDishFlavorsOrderDTO,
  RequestUploadDishImageDTO,
  changePrice,
  createDish,
  deleteDish,
  deleteDishImage,
  getDishById,
  getDishesBySectionId,
  toggleDish,
  updateDish,
  updateDishExtrasOrder,
  updateDishFlavorsOrder,
  uploadDishImage,
} from '@/http/api';

import { getCookiesHeader } from './utils.action';

export async function getDishByIdAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getDishById(id, {
    headers,
  });
  return response;
}

export async function getDishesBySectionIdAPI(sectionId: string) {
  const headers = await getCookiesHeader();

  const response = await getDishesBySectionId(
    { sectionId },
    {
      headers,
    }
  );
  return response.data;
}

export async function toggleDishAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await toggleDish(id, {
    headers,
  });

  return response.status;
}

export async function changePriceAPI(
  id: string,
  { price }: RequestChangePriceDTO
) {
  const headers = await getCookiesHeader();

  const response = await changePrice(
    id,
    { price },
    {
      headers,
    }
  );

  return response.status;
}

export async function createDishAPI(data: RequestCreateDishDTO) {
  const headers = await getCookiesHeader();

  const response = await createDish(data, {
    headers,
  });

  return response;
}

export async function deleteDishAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteDish(id, {
    headers,
  });

  return response.status;
}

export async function updateDishAPI(id: string, data: RequestUpdateDishDTO) {
  const headers = await getCookiesHeader();

  const response = await updateDish(id, data, {
    headers,
  });

  return response;
}

export async function updateDishExtrasOrderAPI(
  id: string,
  data: RequestUpdateDishExtrasOrderDTO
) {
  const headers = await getCookiesHeader();

  const response = await updateDishExtrasOrder(id, data, {
    headers,
  });

  return response.status;
}

export async function updateDishFlavorsOrderAPI(
  id: string,
  data: RequestUpdateDishFlavorsOrderDTO
) {
  const headers = await getCookiesHeader();

  const response = await updateDishFlavorsOrder(id, data, {
    headers,
  });

  return response.status;
}

export async function uploadDishImageAPI(
  id: string,
  file: RequestUploadDishImageDTO
) {
  const headers = await getCookiesHeader();

  const response = await uploadDishImage(id, file, {
    headers,
  });

  return response;
}

export async function deleteDishImageAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteDishImage(id, {
    headers,
  });

  return response;
}
