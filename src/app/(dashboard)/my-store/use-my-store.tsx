import { useEffect, useState } from 'react';

import {
  changeRestaurantLogo,
  deleteRestaurantLogo,
  updateRestaurantData,
} from '@/actions/my-store.action';
import { GetRestaurantByIdDTO } from '@/http/api';
import { updateStoreSchema } from '@/validations/update-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FileUploaded } from '@/components/inputs/upload-single-image/upload-single-image.types';

export interface UseMyStoreProps {
  restaurantData: GetRestaurantByIdDTO;
}

export function useMyStore({ restaurantData }: UseMyStoreProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof updateStoreSchema>>({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: {
      name: restaurantData.name || '',
      logo: restaurantData.logo || '',
      welcomeMessage: restaurantData.welcomeMessage || '',
    },
  });

  const [imageData, setImageData] = useState<FileUploaded>();
  const [isLoadingUploadImage, setIsLoadingUploadImage] = useState(false);

  const onSubmit: SubmitHandler<z.infer<typeof updateStoreSchema>> = async (
    data
  ) => {
    try {
      const response = await updateRestaurantData({
        restaurantId: restaurantData.id,
        data: {
          name: data.name,
          welcomeMessage: data?.welcomeMessage || '',
        },
      });
      if (response.status === 200) {
        toast.success('Restaurante atualizado com sucesso', {
          position: 'top-right',
        });
      } else {
        toast.error(
          'Falha ao atualizar restaurante. Tente novamente mais tarde.',
          {
            position: 'top-right',
          }
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        'Falha ao atualizar restaurante. Tente novamente mais tarde.',
        {
          position: 'top-right',
        }
      );
    }
  };

  async function loadImage() {
    if (!restaurantData.logo) return;

    const imageUrl = restaurantData.logo;
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], imageUrl, {
      type: blob.type,
    });
    setImageData({ file, url: imageUrl });
  }

  async function uploadImage() {
    setIsLoadingUploadImage(true);
    if (imageData && imageData.file) {
      const response = await changeRestaurantLogo(
        restaurantData.id,
        // @ts-ignore
        { file: imageData.file }
      );

      if (response.status === 200) {
        toast.success('Logo atualizada com sucesso');
      } else if (response.status === 400) {
        loadImage();
        toast.error(
          'Falha ao atualizar imagem. Por favor, faça o upload de um arquivo de imagem',
          { position: 'top-right' }
        );
      } else {
        toast.error(
          'Falha ao atualizar imagem. Por favor, faça o upload de um arquivo de imagem',
          { position: 'top-right' }
        );
      }
    }
    setIsLoadingUploadImage(false);
  }

  async function deleteImageData() {
    setIsLoadingUploadImage(true);
    const response = await deleteRestaurantLogo(restaurantData.id);
    if (response.status === 200) {
      toast.success('Logo deletada com sucesso', { position: 'top-right' });
    }
    setIsLoadingUploadImage(false);
  }

  useEffect(() => {
    loadImage();
  }, []);

  useEffect(() => {
    if (imageData && imageData.file.name !== restaurantData.logo) {
      uploadImage();
    }
  }, [imageData]);

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    imageData,
    setImageData,
    isLoadingUploadImage,
    deleteImageData,
  };
}
