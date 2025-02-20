import Cropper from 'react-easy-crop';

import Modal from '@components/data-display/modal/modal';

import { CropModalProps } from './crop-modal.types';

export function CropModal({
  isCropModalOpen,
  setIsCropModalOpen,
  onSubmitImage,
  currentEditingIndex,
  images,
  crop,
  zoom,
  setCrop,
  onCropComplete,
  setZoom,
  handleChangeZoom,
}: CropModalProps) {
  return (
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
  );
}
