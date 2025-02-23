import { useEffect, useState } from 'react';

import {
  changeRestaurantLogo,
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
    const imageUrl = restaurantData.logo;
    const response = await fetch(imageUrl, { mode: 'no-cors' });
    const blob = await response.blob();
    const file = new File([blob], 'minha-imagem-logo.png', {
      type: blob.type,
    });
    setImageData({ file, url: imageUrl });
  }

  useEffect(() => {
    loadImage();
  }, []);

  useEffect(() => {
    async function uploadImage() {
      if (imageData && imageData.file) {
        const response = await changeRestaurantLogo(
          restaurantData.id,
          // @ts-ignore
          { file: imageData.file }
        );
        console.log(response);
        if (response.status === 200) {
          toast.success('Logo atualizada com sucesso');
        }
        if (response.status === 400) {
          toast.error(
            'Falha ao atualizar imagem. Por favor, faça o upload de um arquivo de imagem',
            { position: 'top-right' }
          );
          loadImage();
        }
      }
    }

    if (imageData && imageData.file.name !== 'minha-imagem-logo.png') {
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
  };
}
