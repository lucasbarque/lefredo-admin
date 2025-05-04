'use client';

import { useEffect, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CropData, FileUploaded } from './upload-images.types';
import { UseUploadImagesProps } from './use-upload-images.types';

/* eslint-disable @typescript-eslint/no-unused-vars */

export function useUploadImages({
  parentId,
  medias,
  fnDeleteImages,
  fnUploadImages,
  updateQueryFn,
}: UseUploadImagesProps) {
  const [images, setImages] = useState<FileUploaded[]>([]);
  const scheduledUploads = useRef<Set<string>>(new Set());

  async function loadImages() {
    const placeholders: FileUploaded[] = medias.map((image) => ({
      id: image.id,
      file: null,
      url: '',
      isLoading: true,
      isNew: false,
    }));
    setImages(placeholders);

    const loadPromises = medias.map(async (image, index) => {
      const imageUrl = process.env.NEXT_PUBLIC_BUCKET_URL + image.url;
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          return {
            index,
            file: null,
            url: imageUrl,
            isLoading: false,
            isNew: false,
          };
        }
        const blob = await response.blob();
        const file = new File([blob], imageUrl, { type: blob.type });
        return {
          index,
          file,
          url: imageUrl,
          isLoading: false,
          isNew: false,
        };
      } catch (error) {
        return {
          index,
          file: null,
          url: imageUrl,
          isLoading: false,
          isNew: false,
        };
      }
    });

    const loadedResults = await Promise.all(loadPromises);
    setImages((prev) => {
      const newImages = [...prev];
      loadedResults.forEach(({ index, ...result }) => {
        newImages[index] = { ...newImages[index], ...result };
      });
      return newImages;
    });
  }

  const deleteMutation = useMutation({
    mutationFn: (idImage: string) => fnDeleteImages(idImage),
    onSuccess: (_data, idImage) => {
      toast.success('Imagem deletada com sucesso', { position: 'top-right' });
      setImages((prev) => prev.filter((item) => item.id !== idImage));
      updateQueryFn();
    },
    onError: () => {
      toast.error('Falha ao deletar imagem');
      setImages((prev) =>
        prev.map((item) =>
          item.isLoading ? { ...item, isLoading: false } : item
        )
      );
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => fnUploadImages(parentId, file),
    onSuccess: (response, file) => {
      //@ts-ignore
      if (response.status !== 200) {
        toast.error(
          'Ocorreu um erro ao realizar o upload da imagem. Tente novamente mais tarde',
          { position: 'top-right' }
        );
        setImages((prev) =>
          prev.map((item) =>
            item.isNew && item.file === file
              ? { ...item, isLoading: false, isNew: false }
              : item
          )
        );
        return;
      }
      setImages((prev) =>
        prev.map((item) => {
          if (item.isNew && item.isLoading && item.file === file) {
            return {
              ...item,
              //@ts-ignore
              id: response.data.id,
              //@ts-ignore
              url: process.env.NEXT_PUBLIC_BUCKET_URL + response.data.url,
              isLoading: false,
              isNew: false,
            };
          }
          return item;
        })
      );
      updateQueryFn();
      toast.success('Imagem enviada com sucesso', { position: 'top-right' });
    },
    onError: (_, file) => {
      toast.error(
        'Erro ao fazer upload da imagem. Tente novamente mais tarde',
        { position: 'top-right' }
      );
      setImages((prev) =>
        prev.map((item) =>
          item.isNew && item.file === file
            ? { ...item, isLoading: false, isNew: false }
            : item
        )
      );
    },
  });

  function handleDeleteImage(idImage: string) {
    setImages((prev) =>
      prev.map((item) =>
        item.id === idImage ? { ...item, isLoading: true } : item
      )
    );
    deleteMutation.mutate(idImage);
  }

  async function handleImageUpdate(
    oldImageId: string,
    newFile: File,
    cropData: CropData
  ) {
    setImages((prev) =>
      prev.map((image) =>
        image.id === oldImageId ? { ...image, isLoading: true } : image
      )
    );
    try {
      const deleteResponse = await fnDeleteImages(oldImageId);
      if (deleteResponse.status !== 200) {
        toast.error('Erro ao deletar a imagem. Tente novamente mais tarde', {
          position: 'top-right',
        });
        setImages((prev) =>
          prev.map((image) =>
            image.id === oldImageId ? { ...image, isLoading: false } : image
          )
        );
        return;
      }
    } catch (error) {
      toast.error('Erro ao deletar a imagem. Tente novamente mais tarde', {
        position: 'top-right',
      });
      setImages((prev) =>
        prev.map((image) =>
          image.id === oldImageId ? { ...image, isLoading: false } : image
        )
      );
      return;
    }
    uploadMutation.mutate(newFile, {
      onSuccess: (response) => {
        //@ts-ignore
        if (response.status === 200) {
          setImages((prev) =>
            prev.map((image) =>
              image.id === oldImageId
                ? {
                    ...image,
                    //@ts-ignore
                    id: response.data.id,
                    //@ts-ignore
                    url: process.env.NEXT_PUBLIC_BUCKET_URL + response.data.url,
                    isLoading: false,
                    isNew: false,
                    cropData,
                  }
                : image
            )
          );
        } else {
          toast.error(
            'Ocorreu um erro ao realizar o upload da nova imagem. Tente novamente mais tarde',
            { position: 'top-right' }
          );
          setImages((prev) =>
            prev.map((image) =>
              image.id === oldImageId ? { ...image, isLoading: false } : image
            )
          );
        }
      },
      onError: (_) => {
        toast.error('Erro ao atualizar a imagem. Tente novamente mais tarde', {
          position: 'top-right',
        });
        setImages((prev) =>
          prev.map((image) =>
            image.id === oldImageId ? { ...image, isLoading: false } : image
          )
        );
      },
    });
  }

  useEffect(() => {
    if (medias?.length > 0) {
      loadImages();
    }
  }, [medias]);

  useEffect(() => {
    if (!parentId) return;
    images.forEach((img) => {
      if (
        img.isNew &&
        img.isLoading &&
        img.file &&
        !scheduledUploads.current.has(img.id)
      ) {
        uploadMutation.mutate(img.file as File);
        scheduledUploads.current.add(img.id);
      }
    });
  }, [parentId, images]);

  return {
    images,
    setImages,
    handleDeleteImage,
    handleImageUpdate,
  };
}
