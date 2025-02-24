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
  cropConfig: {
    width: number;
    height: number;
  };
  onSubmit?: (file?: FileUploaded) => void;
}
