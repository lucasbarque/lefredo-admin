export interface PageAddItemAdditionalsParams {
  params: Promise<{
    dishId: string;
  }>;
}

export interface ItemAdditionalProps {
  id: string;
  name: string;
  price: number;
}

export interface FormAddItemAdditionalsProps {
  dishId: string;
}
