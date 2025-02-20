import { DragEvent, useCallback, useRef, useState } from 'react';

import { CropModal } from './crop-modal';
import { Dropzone } from './dropzone';
import { ImagePreview } from './image-preview';
import { FileUploaded, UploadImageProps } from './upload-images.types';

export function UploadImages({
  label,
  additionalInfo,
  onSubmit,
  currentImages = [],
}: UploadImageProps) {
  const [images, setImages] = useState<FileUploaded[]>(currentImages);
  const [isDragActive, setIsDragActive] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState({
    x: 0,
    y: 0,
    width: 533,
    height: 430,
  });
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number | null>(
    null
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const dropZoneProps = {
    onDragOver: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    },
    onDragEnter: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    },
    onDragLeave: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    },
    onDrop: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFiles = Array.from(e.dataTransfer.files);
        const newImages: FileUploaded[] = newFiles.map((file) => ({
          file,
          url: URL.createObjectURL(file),
        }));
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        if (onSubmit) onSubmit(updatedImages);
        e.dataTransfer.clearData();
      }
    },
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      const newImages: FileUploaded[] = newFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      if (onSubmit) onSubmit(updatedImages);
    }
  };

  const handleRemove = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (onSubmit) onSubmit(updatedImages);
  };

  const handleEdit = (index: number) => {
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
        const base64Image = canvas.toDataURL('image/png');
        const updatedImages = [...images];
        updatedImages[currentEditingIndex] = {
          file: imageObj.file,
          url: base64Image,
          cropData: { crop, zoom, croppedArea },
        };
        setImages(updatedImages);
        if (onSubmit) onSubmit(updatedImages);
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

      {images.length > 0 && (
        <>
          <hr className='border-border-default mt-4'></hr>
          <div className='mt-4 grid grid-cols-3 gap-4'>
            {images.map((img, index) => (
              <ImagePreview
                key={index}
                url={img.url}
                handleEdit={handleEdit}
                index={index}
                handleRemove={handleRemove}
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
