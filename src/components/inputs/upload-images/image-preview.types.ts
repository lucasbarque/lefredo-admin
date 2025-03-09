export interface ImagePreviewProps {
  id: string;
  url: string;
  handleEdit: (id: string) => void;
  handleRemove: (id: string) => void;
  height?: number;
  isLoading?: boolean;
}
