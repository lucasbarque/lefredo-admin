'use client';

import { useState } from 'react';

import { Header } from '@/components/data-display/header';
import { Button } from '@/components/inputs/button';
import { StepperBar } from '@/components/inputs/stepper-bar';
import { UploadImages } from '@/components/inputs/upload-images';
import { FileUploaded } from '@/components/inputs/upload-images/upload-images.types';

export default function PageAddItemPhotos() {
  // Armazena um array de imagens
  const [images, setImages] = useState<FileUploaded[]>([]);

  return (
    <>
      <div className='flex items-end justify-between px-6 pt-6'>
        <Header
          backButton={{ onClick: () => {}, title: 'Voltar' }}
          title='Adicionar item'
        />
        <StepperBar currentStepperIndex={1} />
      </div>

      <div className='p-6'>
        <UploadImages
          label='Fotos do item'
          additionalInfo='Resolução sugerida 533x430 | Formatos: JPG, JPEG, PNG - Máximo 10MB'
          currentImages={images}
          onSubmit={setImages}
        />
      </div>

      <div className='border-border-default mt-auto flex justify-end gap-4 border-t px-8 py-4'>
        <Button size='md' family='secondary'>
          Cancelar
        </Button>
        <Button size='md' onClick={() => {}}>
          Continuar
        </Button>
      </div>
    </>
  );
}
