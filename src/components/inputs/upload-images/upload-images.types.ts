import { Crop } from './crop-modal.types';

export interface CropData {
  crop: Crop;
  zoom: number;
  croppedArea: { x: number; y: number; width: number; height: number };
}

export interface FileUploaded {
  id: string;
  file: File | null;
  url: string;
  cropData?: CropData;
  isLoading?: boolean;
  isNew?: boolean;
}

export interface UploadImageProps {
  label: string;
  currentImages?: FileUploaded[];
  additionalInfo?: string;
  onSubmit?: (files: FileUploaded[]) => void;
  onRemove?: (id: string) => void;
  onImageUpdate?: (
    oldImageId: string,
    newFile: File,
    cropData: CropData
  ) => void;
  previewConfig: {
    height: number;
  };
  maxImages?: number;
  maxFileSize?: number;
}
