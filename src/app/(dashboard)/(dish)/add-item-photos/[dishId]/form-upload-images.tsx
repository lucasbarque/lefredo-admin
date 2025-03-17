'use client';

import { deleteDishImageAPI, uploadDishImageAPI } from '@/actions/dish.action';

import { UploadImages } from '@/components/inputs/upload-images';
import { useUploadImages } from '@/components/inputs/upload-images/use-upload-images';

import { FormUploadImagesProps } from './add-item-photos.types';

export function FormUploadImages({
  dishMedias,
  dishId,
}: FormUploadImagesProps) {
  const { images, setImages, handleDeleteImage, handleImageUpdate } =
    useUploadImages({
      parentId: dishId,
      medias: dishMedias,
      fnDeleteImages: deleteDishImageAPI,
      fnUploadImages: uploadDishImageAPI,
      keyPrefix: 'edit-dishes',
    });

  return (
    <div className='p-6'>
      <UploadImages
        label='Fotos do item'
        additionalInfo='Resolução sugerida 480x360 | Formatos: JPG, JPEG, PNG - Máximo 5MB'
        currentImages={images}
        onSubmit={setImages}
        onRemove={handleDeleteImage}
        onImageUpdate={handleImageUpdate}
        previewConfig={{ height: 400 }}
        maxImages={3}
        maxFileSize={5}
      />
    </div>
  );
}
