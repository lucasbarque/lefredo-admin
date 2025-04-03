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
  handleCloseForm: () => void;
  setEditItem: (id: string) => void;
  handleOpenModalImage: (id: string) => void;
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
