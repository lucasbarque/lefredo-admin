'use client';

import { useEffect, useState } from 'react';

import {
  deleteDishesFlavorsImageAPI,
  uploadDishesFlavorsImageAPI,
} from '@/actions/dishes-flavors.action';
import { DishFlavorsMediaDTO } from '@/http/api';

import { UploadImages } from '@/components/inputs/upload-images';
import { FileUploaded } from '@/components/inputs/upload-images/upload-images.types';

interface UploadImagesComponentProps {
  id: string | null;
  imagesFlavor: DishFlavorsMediaDTO[] | [];
}

export function UploadImagesComponent({
  id,
  imagesFlavor,
}: UploadImagesComponentProps) {
  const [images, setImages] = useState<FileUploaded[]>([]);

  async function loadImages() {
    // Cria os placeholders para as imagens persistentes
    const placeholders = imagesFlavor.map((image) => ({
      id: image.id, // usa o id já existente da API
      file: null,
      url: '',
      isLoading: true,
      isNew: false,
    }));
    setImages(placeholders);

    // Cria um array de Promises para buscar as imagens em paralelo
    const loadPromises = imagesFlavor.map(async (image, index) => {
      const imageUrl = process.env.NEXT_PUBLIC_BUCKET_URL + image.url;
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          console.error('Falha ao buscar imagem:', imageUrl);
          return {
            index,
            file: null,
            url: imageUrl,
            isLoading: false,
            isNew: false,
          };
        }
        const blob = await response.blob();
        const file = new File([blob], imageUrl, { type: blob.type });
        return {
          index,
          file,
          url: imageUrl,
          isLoading: false,
          isNew: false,
        };
      } catch (error) {
        console.error('Erro ao carregar imagem:', imageUrl, error);
        return {
          index,
          file: null,
          url: imageUrl,
          isLoading: false,
          isNew: false,
        };
      }
    });

    // Aguarda todas as Promises serem resolvidas
    const loadedResults = await Promise.all(loadPromises);

    // Atualiza o estado com os resultados carregados
    setImages((prevImages) => {
      const newImages = [...prevImages];
      loadedResults.forEach(({ index, ...result }) => {
        newImages[index] = { ...newImages[index], ...result };
      });
      return newImages;
    });
  }

  useEffect(() => {
    if (imagesFlavor.length > 0) {
      loadImages();
    }
  }, [imagesFlavor]);

  // Efeito para disparar o upload de imagens novas (isNew === true) que estão com isLoading true
  useEffect(() => {
    if (id === null) return;
    images.forEach(async (img) => {
      if (img.isNew && img.isLoading && img.file) {
        try {
          const response = await uploadDishesFlavorsImageAPI(id, {
            // @ts-ignore
            file: img.file,
          });
          if (response.status !== 200) {
            console.error('Erro no upload da imagem:', img.url);
            return;
          }
          console.log('Upload ok:', response);
          setImages((prev) =>
            prev.map((item) =>
              item.id === img.id
                ? {
                    ...item,
                    id: response.data.id, // atualiza o id com o valor retornado pela API
                    url: process.env.NEXT_PUBLIC_BUCKET_URL + response.data.url,
                    isLoading: false,
                    isNew: false,
                  }
                : item
            )
          );
        } catch (error) {
          console.error('Erro ao fazer upload da imagem:', img.url, error);
          setImages((prev) =>
            prev.map((item) =>
              item.id === img.id ? { ...item, isLoading: false } : item
            )
          );
        }
      }
    });
  }, [images, id]);

  // Função para deletar a imagem via API e removê-la do estado (usando o id)
  async function handleDeleteImage(idImage: string) {
    const img = images.find((item) => item.id === idImage);
    if (img) {
      try {
        const response = await deleteDishesFlavorsImageAPI(idImage);
        if (response.status !== 200) {
          console.error('Erro ao deletar a imagem:', img.url);
          return;
        }
        console.log('Imagem deletada com sucesso:', response);
      } catch (error) {
        console.error('Erro ao deletar a imagem:', img.url, error);
      }
    }
    setImages((prev) => prev.filter((item) => item.id !== idImage));
  }

  return (
    <div className='mt-4'>
      <UploadImages
        label='Fotos do item'
        additionalInfo='Resolução sugerida 480x360 | Formatos: JPG, JPEG, PNG - Máximo 5MB'
        currentImages={images}
        onSubmit={setImages}
        onRemove={handleDeleteImage}
        previewConfig={{ height: 150 }}
        maxImages={3}
        maxFileSize={5}
      />
    </div>
  );
}
