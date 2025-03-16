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
  handleDeleteItem: (id: string) => void;
}

export interface FormAddItemAdditionalsProps {
  dishId: string;
}
