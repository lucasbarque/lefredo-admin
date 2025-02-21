import Cropper from 'react-easy-crop';

import Modal from '@/components/data-display/modal/modal';

import { CropModalProps } from './crop-modal.types';

export function CropModal({
  isImageSelected,
  setIsImageSelected,
  onSubmitImage,
  fileUrl,
  crop,
  zoom,
  setCrop,
  onCropComplete,
  setZoom,
  handleChangeZoom,
}: CropModalProps) {
  return (
    <Modal open={isImageSelected} onOpenChange={setIsImageSelected}>
      <Modal.Wrapper
        title='Imagem de capa'
        size='lg'
        actionButtonText='Salvar'
        actionButtonFunction={onSubmitImage}
      >
        <div className='relative mt-5 h-[400px] w-full'>
          {fileUrl && (
            <Cropper
              image={fileUrl}
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
              className='border-border-default h-[34px] w-[34px] cursor-pointer rounded-lg border text-gray-600'
              onClick={() => handleChangeZoom('zoomOut')}
            >
              -
            </button>
            <div className='border-border-default flex h-[34px] w-[90px] items-center justify-center rounded-lg border'>
              {(zoom * 100).toFixed(0) + '%'}
            </div>
            <button
              type='button'
              className='border-border-default h-[34px] w-[34px] cursor-pointer rounded-lg border text-gray-600'
              onClick={() => handleChangeZoom('zoomIn')}
            >
              +
            </button>
          </div>
        </div>
      </Modal.Wrapper>
    </Modal>
  );
}
