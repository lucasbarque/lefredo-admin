'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { CropModal } from './crop-modal';
import { Dropzone } from './dropzone';
import { ImagePreview } from './image-preview';
import { FileUploaded, UploadImageProps } from './upload-images.types';
import { useDropzoneProps } from './use-dropzone-props';

export function UploadImages({
  label,
  additionalInfo,
  onSubmit,
  onRemove,
  onImageUpdate,
  currentImages = [],
  previewConfig,
  maxImages,
  maxFileSize,
}: UploadImageProps) {
  const [images, setImages] = useState<FileUploaded[]>(currentImages);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState({
    x: 0,
    y: 0,
    width: 480,
    height: 360,
  });
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImages(currentImages);
  }, [currentImages]);

  const addNewImages = (newFiles: File[]) => {
    const errorMessages: string[] = [];
    let validFiles = newFiles;
    if (maxFileSize) {
      const maxBytes = maxFileSize * 1024 * 1024;
      const invalidFiles = newFiles.filter((file) => file.size > maxBytes);
      validFiles = newFiles.filter((file) => file.size <= maxBytes);
      if (invalidFiles.length > 0) {
        const messages = invalidFiles.map(
          (file) =>
            `A imagem ${file.name} excede o limite máximo de ${maxFileSize} MB, selecione outra imagem.`
        );
        errorMessages.push(...messages);
      }
    }
    if (maxImages) {
      const availableSlots = maxImages - images.length;
      if (validFiles.length > availableSlots) {
        const filesToAdd = validFiles.slice(0, availableSlots);
        const excessFiles = validFiles.slice(availableSlots);
        const messages = excessFiles.map(
          (file) =>
            `A imagem ${file.name} não pode ser adicionada pois excede o limite máximo de ${maxImages} imagens.`
        );
        errorMessages.push(...messages);
        validFiles = filesToAdd;
      }
    }
    if (validFiles.length === 0) {
      setErrorMessage(errorMessages.join('\n'));
      return false;
    }
    const newImages: FileUploaded[] = validFiles.map((file) => ({
      id: String(Date.now() + Math.random()),
      file,
      url: URL.createObjectURL(file),
      isLoading: true,
      isNew: true,
    }));
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    if (onSubmit) onSubmit(updatedImages);
    setErrorMessage(errorMessages.join('\n'));
    return true;
  };

  const { dropZoneProps } = useDropzoneProps({ setIsDragActive, addNewImages });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      addNewImages(newFiles);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleRemove = (id: string) => {
    if (onRemove) {
      onRemove(id);
    } else {
      const updatedImages = images.filter((item) => item.id !== id);
      setImages(updatedImages);
      if (onSubmit) onSubmit(updatedImages);
    }
  };

  const handleEdit = (id: string) => {
    const index = images.findIndex((item) => item.id === id);
    if (index !== -1) {
      setCurrentEditingIndex(index);
      if (images[index].cropData) {
        setCrop(images[index].cropData!.crop);
        setZoom(images[index].cropData!.zoom);
        setCroppedArea(images[index].cropData!.croppedArea);
      } else {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setCroppedArea({ x: 0, y: 0, width: 533, height: 430 });
      }
      setIsCropModalOpen(true);
    }
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleChangeZoom = (type: 'zoomIn' | 'zoomOut') => {
    if (type === 'zoomIn') {
      setZoom((prev) => prev + 0.1);
    } else {
      if (zoom === 1) return;
      setZoom((prev) => prev - 0.1);
    }
  };

  const onSubmitImage = () => {
    if (currentEditingIndex === null) return;
    const imageObj = images[currentEditingIndex];
    if (!imageObj.file) {
      return;
    }

    const originalUrl = URL.createObjectURL(imageObj.file);
    const image = new Image();
    image.src = originalUrl;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = croppedArea.width;
      canvas.height = croppedArea.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
          image,
          croppedArea.x,
          croppedArea.y,
          croppedArea.width,
          croppedArea.height,
          0,
          0,
          croppedArea.width,
          croppedArea.height
        );

        canvas.toBlob((blob) => {
          if (!blob) return;
          const newFile = new File([blob], imageObj.file!.name, {
            type: blob.type,
          });
          if (onImageUpdate) {
            onImageUpdate(imageObj.id, newFile, { crop, zoom, croppedArea });
          }
        }, 'image/png');
      }
      setIsCropModalOpen(false);
      setCurrentEditingIndex(null);
    };
  };

  return (
    <div className='rounded-md border border-slate-200 px-4 py-4'>
      <Dropzone
        isDragActive={isDragActive}
        inputRef={inputRef}
        dropZoneProps={dropZoneProps}
        label={label}
        additionalInfo={additionalInfo}
      />
      {errorMessage && (
        <div className='mt-2 text-sm whitespace-pre-line text-red-500'>
          {errorMessage}
        </div>
      )}
      {images.length > 0 && (
        <>
          <hr className='border-border-default mt-4' />
          <div className='mt-4 grid grid-cols-3 gap-4'>
            {images.map((img) => (
              <ImagePreview
                key={img.id}
                id={img.id}
                url={img.url}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
                height={previewConfig.height}
                isLoading={img.isLoading}
              />
            ))}
          </div>
        </>
      )}
      <input
        type='file'
        id='upload-file'
        multiple
        className='hidden'
        onChange={handleFileChange}
        ref={inputRef}
      />
      <CropModal
        isCropModalOpen={isCropModalOpen}
        setIsCropModalOpen={setIsCropModalOpen}
        onSubmitImage={onSubmitImage}
        currentEditingIndex={currentEditingIndex}
        images={images}
        crop={crop}
        zoom={zoom}
        setCrop={setCrop}
        onCropComplete={onCropComplete}
        setZoom={setZoom}
        handleChangeZoom={handleChangeZoom}
      />
    </div>
  );
}
