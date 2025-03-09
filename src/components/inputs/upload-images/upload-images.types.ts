import { Crop } from './crop-modal.types';

export interface CropData {
  crop: Crop;
  zoom: number;
  croppedArea: { x: number; y: number; width: number; height: number };
}

export interface FileUploaded {
  id: string; // Identificador único da imagem, sempre atualizado com o valor retornado pela API
  file: File | null; // Permite null enquanto a imagem estiver carregando
  url: string;
  cropData?: CropData;
  isLoading?: boolean; // Indica o estado de carregamento (true enquanto o upload está em andamento)
  isNew?: boolean; // true para imagens recém-adicionadas via input
}

export interface UploadImageProps {
  label: string;
  currentImages?: FileUploaded[];
  additionalInfo?: string;
  onSubmit?: (files: FileUploaded[]) => void;
  onRemove?: (id: string) => void; // Função para deletar a imagem usando o id
  previewConfig: {
    height: number;
  };
  maxImages?: number;
  maxFileSize?: number;
}
