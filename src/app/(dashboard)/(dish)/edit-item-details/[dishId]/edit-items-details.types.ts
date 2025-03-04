import { GetDishDTO } from '@/http/api';

export interface PageEditItemDetailsParams {
  params: Promise<{
    dishId: string;
  }>;
}

export interface FormEditItemDetailsProps {
  data: GetDishDTO;
}
