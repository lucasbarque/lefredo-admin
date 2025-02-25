export interface FileUploaded {
  file: File;
  url: string;
}

export interface UploadImageProps {
  label: string;
  currentImage?: FileUploaded;
  footerLabel?: string;
  additionalInfo?: string;
  isLoading?: boolean;
  onSubmit?: (file?: FileUploaded) => void;
  onDelete?: (imageId: string) => void;
}
