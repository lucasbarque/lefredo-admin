import { Crop } from './crop-modal.types';

export interface CropData {
  crop: Crop;
  zoom: number;
  croppedArea: { x: number; y: number; width: number; height: number };
}

export interface FileUploaded {
  file: File;
  url: string;
  cropData?: CropData;
}

export interface UploadImageProps {
  label: string;
  currentImages?: FileUploaded[];
  additionalInfo?: string;
  onSubmit?: (files: FileUploaded[]) => void;
}
