'use client';

import { useEffect, useState } from 'react';

import {
  deleteDishesFlavorsImageAPI,
  uploadDishesFlavorsImageAPI,
} from '@/actions/dish-flavor.action';
import { toast } from 'sonner';

import { UploadImages } from '@/components/inputs/upload-images';
import {
  CropData,
  FileUploaded,
} from '@/components/inputs/upload-images/upload-images.types';

import { UploadImagesComponentProps } from './add-item-flavors.types';

export function UploadImagesComponent({
  id,
  imagesFlavor,
}: UploadImagesComponentProps) {
  const [images, setImages] = useState<FileUploaded[]>([]);

  async function loadImages() {
    const placeholders: FileUploaded[] = imagesFlavor.map((image) => ({
      id: image.id,
      file: null,
      url: '',
      isLoading: true,
      isNew: false,
    }));
    setImages(placeholders);

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

    const loadedResults = await Promise.all(loadPromises);
    setImages((prev) => {
      const newImages = [...prev];
      loadedResults.forEach(({ index, ...result }) => {
        newImages[index] = { ...newImages[index], ...result };
      });
      return newImages;
    });
  }

  async function handleDeleteImage(idImage: string) {
    setImages((prev) =>
      prev.map((item) =>
        item.id === idImage ? { ...item, isLoading: true } : item
      )
    );

    const img = images.find((item) => item.id === idImage);
    if (img) {
      try {
        const response = await deleteDishesFlavorsImageAPI(idImage);
        if (response.status !== 200) {
          console.error('Erro ao deletar a imagem:', img.url);
          setImages((prev) =>
            prev.map((item) =>
              item.id === idImage ? { ...item, isLoading: false } : item
            )
          );
          return;
        }
      } catch (error) {
        console.error('Erro ao deletar a imagem:', img.url, error);
        setImages((prev) =>
          prev.map((item) =>
            item.id === idImage ? { ...item, isLoading: false } : item
          )
        );
        return;
      }
    }
    setImages((prev) => prev.filter((item) => item.id !== idImage));
  }

  async function handleImageUpdate(
    oldImageId: string,
    newFile: File,
    cropData: CropData
  ) {
    if (!id) return null;
    setImages((prev) =>
      prev.map((image) =>
        image.id === oldImageId ? { ...image, isLoading: true } : image
      )
    );

    try {
      const deleteResponse = await deleteDishesFlavorsImageAPI(oldImageId);
      if (deleteResponse.status !== 200) {
        toast.error('Erro ao deletar a imagem. Tente novamente mais tarde', {
          position: 'top-right',
        });
        setImages((prev) =>
          prev.map((image) =>
            image.id === oldImageId ? { ...image, isLoading: false } : image
          )
        );
        return;
      }

      const uploadResponse = await uploadDishesFlavorsImageAPI(id, {
        // @ts-ignore
        file: newFile,
      });
      if (uploadResponse.status !== 200) {
        toast.error(
          'Ocorreu um erro ao realizar o upload da nova imagem. Tente novamente mais tarde',
          { position: 'top-right' }
        );
        setImages((prev) =>
          prev.map((image) =>
            image.id === oldImageId ? { ...image, isLoading: false } : image
          )
        );
        return;
      }

      setImages((prev) =>
        prev.map((image) =>
          image.id === oldImageId
            ? {
                ...image,
                id: uploadResponse.data.id,
                url:
                  process.env.NEXT_PUBLIC_BUCKET_URL + uploadResponse.data.url,
                isLoading: false,
                isNew: false,
                cropData,
              }
            : image
        )
      );
    } catch (error) {
      console.error('Erro no processo de atualização de imagem:', error);
      toast.error('Erro ao atualizar a imagem. Tente novamente mais tarde', {
        position: 'top-right',
      });
      setImages((prev) =>
        prev.map((image) =>
          image.id === oldImageId ? { ...image, isLoading: false } : image
        )
      );
    }
  }

  useEffect(() => {
    if (imagesFlavor.length > 0) {
      loadImages();
    }
  }, [imagesFlavor]);

  useEffect(() => {
    if (id === null) return;
    const imagesToUpload = images.filter(
      (img) => img.isNew && img.isLoading && img.file
    );
    if (imagesToUpload.length === 0) return;

    Promise.all(
      imagesToUpload.map(async (img) => {
        try {
          const response = await uploadDishesFlavorsImageAPI(id, {
            //@ts-ignore
            file: img.file,
          });
          if (response.status !== 200) {
            toast.error(
              'Ocorreu um erro ao realizar o upload da imagem. Tente novamente mais tarde',
              { position: 'top-right' }
            );
            setImages((prev) =>
              prev.map((item) =>
                item.id === img.id ? { ...item, isLoading: false } : item
              )
            );
            return null;
          }
          return {
            oldId: img.id,
            newId: response.data.id,
            newUrl: process.env.NEXT_PUBLIC_BUCKET_URL + response.data.url,
          };
        } catch (error) {
          console.error('Erro ao fazer upload da imagem:', img.url, error);
          toast.error(
            'Erro ao fazer upload da imagem. Tente novamente mais tarde',
            { position: 'top-right' }
          );
          setImages((prev) =>
            prev.map((item) =>
              item.id === img.id ? { ...item, isLoading: false } : item
            )
          );
          return null;
        }
      })
    ).then((results) => {
      setImages((prev) =>
        prev.reduce<FileUploaded[]>((acc, item) => {
          if (item.isNew) {
            const uploaded = results.find(
              (res) => res !== null && res.oldId === item.id
            );
            if (uploaded) {
              acc.push({
                ...item,
                id: uploaded.newId,
                url: uploaded.newUrl,
                isLoading: false,
                isNew: false,
              });
            }
          } else {
            acc.push(item);
          }
          return acc;
        }, [])
      );
    });
  }, [id, images]);

  return (
    <div className='mt-4'>
      <UploadImages
        label='Fotos do item'
        additionalInfo='Resolução sugerida 480x360 | Formatos: JPG, JPEG, PNG - Máximo 5MB'
        currentImages={images}
        onSubmit={setImages}
        onRemove={handleDeleteImage}
        onImageUpdate={handleImageUpdate}
        previewConfig={{ height: 150 }}
        maxImages={3}
        maxFileSize={5}
      />
    </div>
  );
}
