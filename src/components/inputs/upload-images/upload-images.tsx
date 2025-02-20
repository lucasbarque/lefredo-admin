import { DragEvent, useCallback, useRef, useState } from 'react';

import { IconCloudUpload, IconEdit, IconX } from '@tabler/icons-react';
import Cropper from 'react-easy-crop';

import Modal from '@components/data-display/modal/modal';

import { FileUploaded, UploadImageProps } from './upload-images.types';

export function UploadImages({
  label,
  aditionalInfo,
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
    width: 1920,
    height: 1080,
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
      setCroppedArea({ x: 0, y: 0, width: 1920, height: 1080 });
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
      <div
        data-active={isDragActive}
        onClick={() => inputRef.current?.click()}
        {...dropZoneProps}
        className='data-[active=true]:border-brand-default hover:border-brand-default border-border-default relative flex cursor-pointer flex-col items-center rounded-md border-2 border-dashed p-6'
      >
        <div className='flex h-[68px] w-[68px] items-center justify-center rounded-full bg-slate-300'>
          <IconCloudUpload className='text-gray-600' size={40} />
        </div>
        <div className='mt-4 mb-5'>
          <p className='text-title-default text-center font-semibold'>
            {label}
          </p>
          {aditionalInfo && (
            <p className='text-body-3-regular mt-1 text-gray-600'>
              {aditionalInfo}
            </p>
          )}
        </div>
        <span className='text-title-secondary border-border-default rounded-md border px-10 py-2 font-semibold hover:bg-gray-400/50'>
          Escolher imagens
        </span>
      </div>

      {images.length > 0 && (
        <>
          <hr className='border-border-default mt-4'></hr>
          <div className='mt-4 grid grid-cols-3 gap-4'>
            {images.map((img, index) => (
              <div key={index} className='relative'>
                <img
                  src={img.url}
                  alt={`Imagem ${index}`}
                  className='h-[300px] w-full object-cover'
                />
                <div className='absolute top-2 right-2 flex gap-1'>
                  <button
                    onClick={() => handleEdit(index)}
                    className='cursor-pointer rounded bg-white p-1'
                  >
                    <IconEdit />
                  </button>
                  <button
                    onClick={() => handleRemove(index)}
                    className='cursor-pointer rounded bg-white p-1'
                  >
                    <IconX />
                  </button>
                </div>
              </div>
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

      <Modal open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
        <Modal.Wrapper
          title='Cortar imagem'
          size='lg'
          actionButtonText='Salvar'
          actionButtonFunction={onSubmitImage}
        >
          <div className='relative mt-5 h-[400px] w-full'>
            {currentEditingIndex !== null && images[currentEditingIndex] && (
              <Cropper
                // Sempre utiliza a imagem original para o crop
                image={URL.createObjectURL(images[currentEditingIndex].file)}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>

          <div className='mt-4 flex w-full items-center justify-end'>
            <div className='flex items-center gap-1'>
              <button
                type='button'
                className='h-[34px] w-[34px] cursor-pointer rounded-lg border border-gray-400 text-gray-600'
                onClick={() => handleChangeZoom('zoomOut')}
              >
                -
              </button>
              <div className='flex h-[34px] w-[90px] items-center justify-center rounded-lg border border-gray-400'>
                {(zoom * 100).toFixed(0) + '%'}
              </div>
              <button
                type='button'
                className='h-[34px] w-[34px] cursor-pointer rounded-lg border border-gray-400 text-gray-600'
                onClick={() => handleChangeZoom('zoomIn')}
              >
                +
              </button>
            </div>
          </div>
        </Modal.Wrapper>
      </Modal>
    </div>
  );
}
