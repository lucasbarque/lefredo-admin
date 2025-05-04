'use client';

import { useCallback, useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  FileUploaded,
  UseUploadImageProps,
} from '@/components/inputs/upload-image/upload-image.types';

/* eslint-disable @typescript-eslint/no-unused-vars */

export function useUploadImage<TResponse = any>({
  initialUrl,
  initialId,
  uploadFn,
  deleteFn,
  updateCallback,
  getResponseData,
}: UseUploadImageProps<TResponse>) {
  const [imageData, setImageData] = useState<FileUploaded | undefined>();
  const [imageId, setImageId] = useState<string | undefined>(initialId);
  const [isNew, setIsNew] = useState(false);

  const loadInitial = useCallback(async () => {
    if (!initialUrl) return;
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) throw new Error('Fetch failed');
      const blob = await response.blob();
      const file = new File([blob], initialUrl, { type: blob.type });
      setImageData({ file, url: initialUrl });
      setImageId(initialId);
    } catch (_) {}
  }, [initialUrl, initialId]);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadFn(file),
    onSuccess: (response, file) => {
      const data = getResponseData?.(response);
      if (!data?.url) {
        toast.error('Upload failed: invalid response', {
          position: 'top-right',
        });
        return;
      }
      setImageData({ file, url: data.url });
      setImageId(data.id);
      toast.success('Image uploaded successfully', { position: 'top-right' });
      updateCallback?.();
    },
    onError: () => {
      toast.error('Failed to upload image. Try again later.', {
        position: 'top-right',
      });
      loadInitial();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteFn(imageId),
    onSuccess: () => {
      toast.success('Image deleted successfully', { position: 'top-right' });
      setImageData(undefined);
      setImageId(undefined);
      updateCallback?.();
    },
    onError: () => {
      toast.error('Failed to delete image. Try again later.', {
        position: 'top-right',
      });
      loadInitial();
    },
  });

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  useEffect(() => {
    if (isNew && imageData?.file) {
      uploadMutation.mutate(imageData.file);
    }
  }, [isNew, imageData, uploadMutation]);

  const handleChange = useCallback((fileUpload: FileUploaded) => {
    setImageData(fileUpload);
    setIsNew(true);
  }, []);

  const handleDelete = useCallback(() => {
    deleteMutation.mutate();
  }, [deleteMutation]);

  return {
    imageData,
    isLoading: uploadMutation.isPending || deleteMutation.isPending,
    handleChange,
    handleDelete,
    imageId,
  };
}
