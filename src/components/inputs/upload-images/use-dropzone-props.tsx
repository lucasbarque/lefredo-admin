import { Dispatch, DragEvent, SetStateAction } from 'react';

interface UseDropzonePropsProps {
  setIsDragActive: Dispatch<SetStateAction<boolean>>;
  addNewImages: (newFiles: File[]) => boolean;
}

export function useDropzoneProps({
  setIsDragActive,
  addNewImages,
}: UseDropzonePropsProps) {
  const dropZoneProps = {
    onDragOver: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    },
    onDragEnter: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(true);
    },
    onDragLeave: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    },
    onDrop: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFiles = Array.from(e.dataTransfer.files);
        addNewImages(newFiles);
        e.dataTransfer.clearData();
      }
    },
  };

  return {
    dropZoneProps,
  };
}
