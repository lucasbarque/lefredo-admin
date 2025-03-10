'use server';

import {
  RequestDishSpecsToggleDTO,
  getDishesSpecs,
  toggleDishesSpec,
} from '@/http/api';
import { revalidateTag } from 'next/cache';

import { RevalidateTags } from '@/constants/tags-revalidate';

import { getCookiesHeader } from './utils.action';

export async function getDishesSpecsAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getDishesSpecs(id, {
    headers,
    cache: 'force-cache',
    next: {
      tags: [RevalidateTags.dishSpec['toggle-dish-spec']],
    },
  });

  return response.data;
}

export async function toggleDishesSpecsAPI(
  id: string,
  data: RequestDishSpecsToggleDTO
) {
  const headers = await getCookiesHeader();

  const response = await toggleDishesSpec(id, data, {
    headers,
  });

  if (response.status === 200) {
    revalidateTag(RevalidateTags.dishSpec['toggle-dish-spec']);
  }

  return response;
}
