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
import { revalidateTag } from 'next/cache';

import { RevalidateTags } from '@/constants/tags-revalidate';

import { getCookiesHeader } from './utils.action';

export async function getDishFlavorsAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getDishesFlavors(id, {
    headers,
    cache: 'force-cache',
    next: {
      tags: [
        RevalidateTags.dishFlavor['create-dish-flavor'],
        RevalidateTags.dishFlavor['delete-dish-flavor'],
        RevalidateTags.dishFlavor['update-dish-flavor'],
        RevalidateTags.dishFlavor['upload-image-dish-flavor'],
        RevalidateTags.dishFlavor['delete-image-dish-flavor'],
      ],
    },
  });

  return response.data;
}

export async function createDishesFlavorsAPI(
  dishId: string,
  data: RequestCreateDishesFlavorsDTO
) {
  const headers = await getCookiesHeader();

  const response = await createDishesFlavors(dishId, data, {
    headers,
  });

  if (response.status === 201) {
    revalidateTag(RevalidateTags.dishFlavor['create-dish-flavor']);
  }

  return response.status;
}

export async function deleteDishesFlavorsAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteDishesFlavors(id, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag(RevalidateTags.dishFlavor['delete-dish-flavor']);
  }

  return response.status;
}

export async function updateDishesFlavorsAPI(
  id: string,
  data: RequestUpdateDishesFlavorsDTO
) {
  const headers = await getCookiesHeader();

  const response = await updateDishesFlavors(id, data, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag(RevalidateTags.dishFlavor['update-dish-flavor']);
  }

  return response.status;
}

export async function uploadDishesFlavorsImageAPI(
  id: string,
  file: RequestUploadDishFlavorImageDTO
) {
  const headers = await getCookiesHeader();

  const response = await uploadDishFlavorImage(id, file, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag(RevalidateTags.dishFlavor['upload-image-dish-flavor']);
  }

  return response;
}

export async function deleteDishesFlavorsImageAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await deleteDishFlavorMediaImage(id, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag(RevalidateTags.dishFlavor['delete-image-dish-flavor']);
  }

  return response;
}
