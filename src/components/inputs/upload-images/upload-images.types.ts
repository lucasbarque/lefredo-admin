import { Crop } from './crop-modal.types';

export interface CropData {
  crop: Crop;
  zoom: number;
  croppedArea: { x: number; y: number; width: number; height: number };
}

export interface FileUploaded {
  id: string; // Identificador único da imagem, sempre vindo da API após upload
  file: File | null; // Permite null enquanto a imagem estiver carregando
  url: string;
  cropData?: CropData;
  isLoading?: boolean; // true enquanto o upload está em andamento
  isNew?: boolean; // true para imagens recém-adicionadas via input
}

export interface UploadImageProps {
  label: string;
  currentImages?: FileUploaded[];
  additionalInfo?: string;
  onSubmit?: (files: FileUploaded[]) => void;
  onRemove?: (id: string) => void;
  // Nova prop para notificar o pai sobre a atualização de uma imagem
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
