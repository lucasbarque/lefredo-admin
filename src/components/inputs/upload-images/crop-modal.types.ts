import { Dispatch, SetStateAction } from 'react';

import { FileUploaded } from './upload-images.types';

export type Crop = {
  x: number;
  y: number;
};

export interface CropModalProps {
  isCropModalOpen: boolean;
  setIsCropModalOpen: Dispatch<SetStateAction<boolean>>;
  onSubmitImage: () => void;
  currentEditingIndex: number | null;
  images: FileUploaded[];
  crop: Crop;
  zoom: number;
  setCrop: Dispatch<SetStateAction<Crop>>;
  onCropComplete: (_: any, croppedAreaPixels: any) => void;
  setZoom: Dispatch<SetStateAction<number>>;
  handleChangeZoom: (type: 'zoomIn' | 'zoomOut') => void;
}
