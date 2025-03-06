import { ResponseGetDishesFlavorsDTO } from '@/http/api';

export interface PageAddItemFlavorsParams {
  params: Promise<{
    dishId: string;
  }>;
}

export interface FormAddItemFlavorsProps {
  dishFlavors: ResponseGetDishesFlavorsDTO[];
}

export interface ItemFlavorProps extends ResponseGetDishesFlavorsDTO {}
