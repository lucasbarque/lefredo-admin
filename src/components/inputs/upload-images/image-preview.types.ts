export interface ImagePreviewProps {
  url: string;
  index: number;
  handleEdit: (index: number) => void;
  handleRemove: (index: number) => void;
  height?: number;
  isLoading?: boolean; // Propriedade adicionada para exibir loading no preview
}
