'use client';

import {
  deleteDishesFlavorsImageAPI,
  uploadDishesFlavorsImageAPI,
} from '@/actions/dish-flavor.action';
import { useQueryClient } from '@tanstack/react-query';

import { UploadImages } from '@/components/inputs/upload-images';
import { useUploadImages } from '@/components/inputs/upload-images/use-upload-images';

import { FlavorUploadImagesProps } from './add-item-flavors.types';

export function FlavorUploadImages({
  id,
  dishId,
  flavorImages,
}: FlavorUploadImagesProps) {
  const queryClient = useQueryClient();

  const { images, setImages, handleDeleteImage, handleImageUpdate } =
    useUploadImages({
      parentId: id,
      medias: flavorImages,
      fnDeleteImages: deleteDishesFlavorsImageAPI,
      fnUploadImages: uploadDishesFlavorsImageAPI,
      updateQueryFn: () =>
        queryClient.invalidateQueries({ queryKey: ['dishFlavors', dishId] }),
    });

  return (
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
  );
}
