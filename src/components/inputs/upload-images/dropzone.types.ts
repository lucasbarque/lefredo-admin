import { DragEvent, RefObject } from 'react';

export interface DropzoneProps {
  isDragActive: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  dropZoneProps: {
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnter: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
  };
  label: string;
  additionalInfo: string | undefined;
}
