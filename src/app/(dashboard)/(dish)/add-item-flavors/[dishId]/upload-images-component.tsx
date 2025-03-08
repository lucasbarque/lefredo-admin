'use client';

import { useEffect, useState } from 'react';

import { DishFlavorsMediaDTO } from '@/http/api';

import { UploadImages } from '@/components/inputs/upload-images';
import { FileUploaded } from '@/components/inputs/upload-images/upload-images.types';

interface UploadImagesComponentProps {
  imagesFlavor: DishFlavorsMediaDTO[] | [];
}

export function UploadImagesComponent({
  imagesFlavor,
}: UploadImagesComponentProps) {
  const [images, setImages] = useState<FileUploaded[]>([]);

  function loadImages() {
    // Cria um placeholder para cada imagem com loading true
    setImages(
      imagesFlavor.map(() => ({
        file: null,
        url: '',
        isLoading: true,
      }))
    );

    imagesFlavor.forEach(async (image, index) => {
      const imageUrl = process.env.NEXT_PUBLIC_BUCKET_URL + image.url;
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          console.error('Falha ao buscar imagem:', imageUrl);
          setImages((prev) => {
            const newImages = [...prev];
            newImages[index] = { file: null, url: imageUrl, isLoading: false };
            return newImages;
          });
          return;
        }
        const blob = await response.blob();
        const file = new File([blob], imageUrl, { type: blob.type });
        setImages((prev) => {
          const newImages = [...prev];
          newImages[index] = { file, url: imageUrl, isLoading: false };
          return newImages;
        });
      } catch (error) {
        console.error('Erro ao carregar imagem:', imageUrl, error);
        setImages((prev) => {
          const newImages = [...prev];
          newImages[index] = { file: null, url: imageUrl, isLoading: false };
          return newImages;
        });
      }
    });
  }

  useEffect(() => {
    if (imagesFlavor.length > 0) {
      loadImages();
    }
  }, [imagesFlavor]);

  return (
    <div className='mt-4'>
      <UploadImages
        label='Fotos do item'
        additionalInfo='Resolução sugerida 480x360 | Formatos: JPG, JPEG, PNG - Máximo 5MB'
        currentImages={images}
        onSubmit={setImages}
        previewConfig={{ height: 150 }}
        maxImages={3}
        maxFileSize={5}
      />
    </div>
  );
}
