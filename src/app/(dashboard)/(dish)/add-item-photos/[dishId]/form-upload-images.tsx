'use client';

import { useState } from 'react';

import { UploadImages } from '@/components/inputs/upload-images';
import { FileUploaded } from '@/components/inputs/upload-images/upload-images.types';

export function FormUploadImages() {
  const [images, setImages] = useState<FileUploaded[]>([]);

  return (
    <div className='p-6'>
      <UploadImages
        label='Fotos do item'
        additionalInfo='Resolução sugerida 533x430 | Formatos: JPG, JPEG, PNG - Máximo 10MB'
        currentImages={images}
        onSubmit={setImages}
      />
    </div>
  );
}
