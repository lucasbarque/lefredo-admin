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

export interface UseUploadImageProps<TResponse = any> {
  initialUrl?: string;
  initialId?: string;
  uploadFn: (file: File) => Promise<TResponse>;
  deleteFn: (id?: string) => Promise<any>;
  updateCallback?: () => void;
  getResponseData?: (response: TResponse) => { id?: string; url: string };
}
