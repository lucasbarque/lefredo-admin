import { Dispatch, SetStateAction } from 'react';

import {
  DishFlavorsDTO,
  DishFlavorsMediaDTO,
  getDishByIdResponse,
} from '@/http/api';

export interface PageAddItemFlavorsParams {
  params: Promise<{
    dishId: string;
  }>;
}

export interface FormAddItemFlavorsProps {
  dishId: string;
}

export interface ItemFlavorProps extends DishFlavorsDTO {
  dish: getDishByIdResponse;
  setEditItem: (id: string) => void;
  handleDeleteItem: (id: string) => void;
}

export interface RadioSelectCreateFlavorProps {
  setCreateVariation: Dispatch<SetStateAction<boolean>>;
  createVariation: boolean;
  dishFlavors: DishFlavorsDTO[];
}

export interface UploadImagesComponentProps {
  id: string | null;
  imagesFlavor: DishFlavorsMediaDTO[] | [];
}

export interface FlavorUploadImagesProps {
  id: string;
  dishId: string;
  flavorImages: DishFlavorsMediaDTO[];
}
