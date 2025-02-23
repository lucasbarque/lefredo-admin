import { useEffect, useState } from 'react';

import { uploadSingleFile } from '@/actions/medias.action';
import { updateRestaurantData } from '@/actions/my-store.action';
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

  useEffect(() => {
    async function loadImage() {
      const imageUrl = restaurantData.logo;
      const response = await fetch(imageUrl, { mode: 'no-cors' });
      const blob = await response.blob();
      const file = new File([blob], 'minha-imagem-logo.png', {
        type: blob.type,
      });
      setImageData({ file, url: imageUrl });
    }

    loadImage();
  }, []);

  useEffect(() => {
    async function uploadImage() {
      if (imageData && imageData.file) {
        const response = await uploadSingleFile({
          data: {
            // @ts-ignore
            file: imageData.file,
            referenceId: restaurantData.id,
            referenceName: 'restaurants',
            title: `store-${restaurantData.id}-${imageData.file.name}`,
            type: 'image',
          },
        });
        if (response.status === 201) {
          toast.success('Imagem atualizada com sucesso');
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
