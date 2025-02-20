import { Dispatch, SetStateAction } from 'react';

type Crop = {
  x: number;
  y: number;
};

export interface CropModalProps {
  isImageSelected: boolean;
  setIsImageSelected: Dispatch<SetStateAction<boolean>>;
  onSubmitImage: () => void;
  fileUrl: string;
  crop: Crop;
  zoom: number;
  setCrop: Dispatch<SetStateAction<Crop>>;
  onCropComplete: (_: any, croppedAreaPixels: any) => void;
  setZoom: Dispatch<SetStateAction<number>>;
  handleChangeZoom: (type: 'zoomIn' | 'zoomOut') => void;
}
