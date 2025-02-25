'use client';

import { GetRestaurantByIdDTO } from '@/http/api';

import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputEditor } from '@/components/inputs/input-editor';
import { UploadImage } from '@/components/inputs/upload-image/upload-image';

import { useMyStore } from './use-my-store';

export interface FormProps {
  restaurantData: GetRestaurantByIdDTO;
}

export function FormUpdateStore({ restaurantData }: FormProps) {
  const {
    control,
    errors,
    imageData,
    setImageData,
    handleSubmit,
    onSubmit,
    isLoadingUploadImage,
    deleteImageData,
  } = useMyStore({ restaurantData });

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

      {/* <UploadSingleImage
        label='Adicione uma imagem'
        currentImage={imageData}
        onSubmit={setImageData}
        onDelete={deleteImageData}
        cropConfig={{ width: 300, height: 300 }}
        isLoading={isLoadingUploadImage}
      /> */}

      <UploadImage
        label='Adicione uma imagem'
        currentImage={imageData}
        onSubmit={setImageData}
        onDelete={deleteImageData}
        isLoading={isLoadingUploadImage}
      />

      <div className='mt-4'>
        <Button type='submit'>Salvar alterações</Button>
      </div>
    </form>
  );
}
