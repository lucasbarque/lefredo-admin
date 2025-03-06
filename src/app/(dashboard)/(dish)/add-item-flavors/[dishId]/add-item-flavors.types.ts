import { Dispatch, SetStateAction } from 'react';

import { DishFlavorsDTO, getDishByIdResponse } from '@/http/api';

export interface PageAddItemFlavorsParams {
  params: Promise<{
    dishId: string;
  }>;
}

export interface FormAddItemFlavorsProps {
  dishFlavors: DishFlavorsDTO[];
  dish: getDishByIdResponse;
}

export interface ItemFlavorProps extends DishFlavorsDTO {
  dish: getDishByIdResponse;
  handleCloseForm: () => void;
  setEditItem: (id: string) => void;
}

export interface RadioSelectCreateFlavorProps {
  setCreateVariation: Dispatch<SetStateAction<boolean>>;
  createVariation: boolean;
  dishFlavors: DishFlavorsDTO[];
}
