export interface ImagePreviewProps {
  url: string;
  index: number;
  handleEdit: (index: number) => void;
  handleRemove: (index: number) => void;
}
