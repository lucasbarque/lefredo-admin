import { Crop } from './crop-modal.types';

export interface CropData {
  crop: Crop;
  zoom: number;
  croppedArea: { x: number; y: number; width: number; height: number };
}

export interface FileUploaded {
  file: File | null; // Atualizado para permitir null enquanto a imagem estiver carregando
  url: string;
  cropData?: CropData;
  isLoading?: boolean; // Propriedade para indicar estado de carregamento
}

export interface UploadImageProps {
  label: string;
  currentImages?: FileUploaded[];
  additionalInfo?: string;
  onSubmit?: (files: FileUploaded[]) => void;
  previewConfig: {
    height: number;
  };
  maxImages?: number;
  maxFileSize?: number;
}
