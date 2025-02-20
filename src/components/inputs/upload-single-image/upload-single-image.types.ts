export interface FileUploaded {
  file: File;
  url: string;
}

export interface UploadImageProps {
  label: string;
  currentImage?: FileUploaded;
  footerLabel?: string;
  additionalInfo?: string;
  onSubmit?: (file?: FileUploaded) => void;
}
