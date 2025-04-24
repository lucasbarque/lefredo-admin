'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  changeRestaurantLogo,
  deleteRestaurantLogo,
  updateRestaurantData,
} from '@/actions/restaurant.action';
import { updateStoreSchema } from '@/validations/update-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputEditor } from '@/components/inputs/input-editor';
import { UploadImage } from '@/components/inputs/upload-image/upload-image';
import { FileUploaded } from '@/components/inputs/upload-image/upload-image.types';

import { FormUpdateStoreProps } from './my-store.types';

export function FormUpdateStore({ restaurantData }: FormUpdateStoreProps) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof updateStoreSchema>>({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: {
      name: restaurantData.name || '',
      logo: restaurantData.logo || '',
      welcomeMessage: restaurantData.welcomeMessage || '',
    },
  });

  const [imageData, setImageData] = useState<FileUploaded>();
  const [isNewImage, setIsNewImage] = useState(false);

  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof updateStoreSchema>) =>
      updateRestaurantData({
        restaurantId: restaurantData.id,
        data: { name: data.name, welcomeMessage: data.welcomeMessage || '' },
      }),
    onSuccess: () => {
      toast.success('Restaurante atualizado com sucesso', {
        position: 'top-right',
      });
      queryClient.invalidateQueries({ queryKey: ['restaurantData'] });
    },
    onError: () => {
      toast.error(
        'Falha ao atualizar restaurante. Tente novamente mais tarde.',
        { position: 'top-right' }
      );
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateStoreSchema>> = (data) => {
    updateMutation.mutate(data);
  };

  const loadImage = useCallback(async () => {
    if (!restaurantData.logo) return;
    try {
      const imageUrl = process.env.NEXT_PUBLIC_BUCKET_URL + restaurantData.logo;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], imageUrl, { type: blob.type });
      setImageData({ file, url: imageUrl });
    } catch (error) {
      console.error('Erro ao carregar imagem:', error);
    }
  }, [restaurantData.logo]);

  const uploadMutation = useMutation({
    mutationFn: (file: File) =>
      //@ts-ignore
      changeRestaurantLogo(restaurantData.id, { file }),
    onSuccess: () => {
      toast.success('Logo atualizada com sucesso', { position: 'top-right' });
      queryClient.invalidateQueries({ queryKey: ['restaurantData'] });
      setIsNewImage(false);
    },
    onError: async () => {
      await loadImage();
      toast.error(
        'Falha ao atualizar imagem. Por favor, faça o upload de um arquivo de imagem',
        { position: 'top-right' }
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteRestaurantLogo(restaurantData.id),
    onSuccess: () => {
      toast.success('Logo deletada com sucesso', { position: 'top-right' });
      queryClient.invalidateQueries({ queryKey: ['restaurantData'] });
    },
    onError: () => {
      toast.error('Falha ao deletar a logo. Tente novamente mais tarde.', {
        position: 'top-right',
      });
    },
  });

  const uploadImage = useCallback(() => {
    if (!imageData?.file) return;
    uploadMutation.mutate(imageData.file);
  }, [imageData, uploadMutation]);

  const deleteImageData = useCallback(() => {
    deleteMutation.mutate();
  }, [deleteMutation]);
  useEffect(() => {
    loadImage();
  }, [loadImage]);

  useEffect(() => {
    if (isNewImage && imageData) {
      uploadImage();
    }
  }, [isNewImage, imageData]);

  const handleImageChange = useCallback((newImageData?: FileUploaded) => {
    if (!newImageData) return;
    setImageData(newImageData);
    setIsNewImage(true);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-[640px] space-y-2 pt-6'
    >
      <Input
        id='name'
        name='name'
        label='Nome da loja'
        control={control}
        error={errors.name?.message}
        placeholder='Exemplo: Le Fredo'
      />

      <InputEditor
        id='welcomeMessage'
        name='welcomeMessage'
        label='Mensagem de boas-vindas'
        control={control}
        placeholder='Exemplo: Olá, nosso cardápio foi elaborado com muito carinho pra você.'
        error={errors.welcomeMessage?.message}
        isOptional
        maxLength={500}
      />

      <UploadImage
        label='Resolução sugerida 100x50'
        currentImage={imageData}
        onSubmit={(file) => {
          if (file) handleImageChange(file);
        }}
        onDelete={deleteImageData}
        isLoading={uploadMutation.isPending || deleteMutation.isPending}
      />

      <div className='mt-4'>
        <Button type='submit' isLoading={updateMutation.isPending}>
          {updateMutation.isPending ? 'Carregando...' : 'Salvar alterações'}
        </Button>
      </div>
    </form>
  );
}
