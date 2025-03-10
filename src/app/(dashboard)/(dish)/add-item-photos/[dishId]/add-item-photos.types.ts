import { DishMediasDTO } from '@/http/api';

export interface PageAddItemPhotosParams {
  params: Promise<{
    dishId: string;
  }>;
}

export interface FormUploadImagesProps {
  dishMedias: DishMediasDTO[];
  dishId: string;
}
