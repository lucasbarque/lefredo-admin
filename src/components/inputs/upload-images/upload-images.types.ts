export interface CropData {
  crop: { x: number; y: number };
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
  aditionalInfo?: string;
  onSubmit?: (files: FileUploaded[]) => void;
}
