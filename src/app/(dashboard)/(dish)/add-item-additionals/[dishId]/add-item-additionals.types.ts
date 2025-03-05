import { ResponseGetDishesExtraDTO } from '@/http/api';

export interface PageAddItemAdditionalsParams {
  params: Promise<{
    dishId: string;
  }>;
}

export interface ItemAdditionalProps {
  id: string;
  name: string;
  price: number;
  setEditItem: (id: string) => void;
  handleCloseForm: () => void;
}

export interface FormAddItemAdditionalsProps {
  dishId: string;
  dishExtras: ResponseGetDishesExtraDTO[];
}
