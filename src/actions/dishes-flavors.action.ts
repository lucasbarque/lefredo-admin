'use server';

import {
  // RequestCreateDishesExtraDTO,
  // RequestUpdateDishesExtraDTO,
  // createDishesExtra,
  // deleteDishesExtra,
  getDishesFlavors,
  // updateDishesExtra,
} from '@/http/api';

// import { revalidateTag } from 'next/cache';

import { getCookiesHeader } from './utils.action';

export async function getDishFlavorsAPI(id: string) {
  const headers = await getCookiesHeader();

  const response = await getDishesFlavors(id, {
    headers,
    cache: 'force-cache',
    next: {
      tags: [
        'create-dishes-flavors',
        'delete-dishes-flavors',
        'update-dish-flavors',
      ],
    },
  });

  return response.data;
}

// export async function createDishesExtraAPI(
//   dishId: string,
//   data: RequestCreateDishesExtraDTO
// ) {
//   const headers = await getCookiesHeader();

//   const response = await createDishesExtra(dishId, data, {
//     headers,
//   });

//   if (response.status === 201) {
//     revalidateTag('create-dishes-extra');
//   }

//   return response.status;
// }

// export async function deleteDishesExtraAPI(id: string) {
//   const headers = await getCookiesHeader();

//   const response = await deleteDishesExtra(id, {
//     headers,
//   });

//   if (response.status === 200) {
//     revalidateTag('delete-dishes-extra');
//   }

//   return response.status;
// }

// export async function updateDishesExtraAPI(
//   id: string,
//   data: RequestUpdateDishesExtraDTO
// ) {
//   const headers = await getCookiesHeader();
//   console.log(headers);
//   const response = await updateDishesExtra(id, data, {
//     headers,
//   });
//   console.log(response);

//   revalidateTag('update-dish-extra');

//   return response.status;
// }
