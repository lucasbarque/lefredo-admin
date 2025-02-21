export interface FileUploaded {
  file: File;
  url: string;
}

export interface UploadImageProps {
  label: string;
  currentImage?: FileUploaded;
  footerLabel?: string;
  additionalInfo?: string;
  cropConfig: {
    width: number;
    height: number;
  };
  onSubmit?: (file?: FileUploaded) => void;
}
