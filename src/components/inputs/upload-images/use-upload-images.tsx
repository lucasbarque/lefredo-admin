'use client';

import { useEffect, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CropData, FileUploaded } from './upload-images.types';
import { UseUploadImagesProps } from './use-upload-images.types';

export function useUploadImages({
  parentId,
  medias,
  fnDeleteImages,
  fnUploadImages,
  keyPrefix, // chave dinâmica, por exemplo "dishImages"
}: UseUploadImagesProps) {
  const queryClient = useQueryClient();
  const [images, setImages] = useState<FileUploaded[]>([]);

  // Carrega as imagens já existentes a partir de 'medias'
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
          console.error('Falha ao buscar imagem:', imageUrl);
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
        console.error('Erro ao carregar imagem:', imageUrl, error);
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

  // Mutation para deleção de imagem
  const deleteMutation = useMutation({
    mutationKey: [keyPrefix, 'deleteImage', parentId],
    mutationFn: (idImage: string) => fnDeleteImages(idImage),
    onSuccess: (_data, idImage) => {
      toast.success('Imagem deletada com sucesso');
      setImages((prev) => prev.filter((item) => item.id !== idImage));
      queryClient.invalidateQueries({ queryKey: [keyPrefix, parentId] });
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

  // Mutation para upload de imagem
  const uploadMutation = useMutation({
    mutationKey: [keyPrefix, 'uploadImage', parentId],
    mutationFn: (file: File) => fnUploadImages(parentId, file),
    onSuccess: (response, file) => {
      //@ts-ignore
      if (response.status !== 200) {
        toast.error(
          'Ocorreu um erro ao realizar o upload da imagem. Tente novamente mais tarde',
          { position: 'top-right' }
        );
        // Marca a imagem como não nova para evitar reenvio
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
      queryClient.invalidateQueries({ queryKey: [keyPrefix, parentId] });
      toast.success('Imagem enviada com sucesso');
    },
    onError: (error, file) => {
      console.error('Erro ao fazer upload da imagem:', file, error);
      toast.error(
        'Erro ao fazer upload da imagem. Tente novamente mais tarde',
        { position: 'top-right' }
      );
      // Marca a imagem como não nova para evitar reenvio contínuo
      setImages((prev) =>
        prev.map((item) =>
          item.isNew && item.file === file
            ? { ...item, isLoading: false, isNew: false }
            : item
        )
      );
    },
  });

  // Função para deletar uma imagem utilizando a mutation
  function handleDeleteImage(idImage: string) {
    setImages((prev) =>
      prev.map((item) =>
        item.id === idImage ? { ...item, isLoading: true } : item
      )
    );
    deleteMutation.mutate(idImage);
  }

  // Função para atualizar uma imagem (exclui a antiga e envia a nova)
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
      console.error(error);
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
    // Envia o novo arquivo
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
      onError: (error) => {
        console.error('Erro no processo de upload:', error);
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

  // Carrega as imagens assim que 'medias' muda
  useEffect(() => {
    if (medias?.length > 0) {
      loadImages();
    }
  }, [medias]);

  // Efeito para disparar upload automático para imagens novas
  useEffect(() => {
    if (!parentId) return;
    const imagesToUpload = images.filter(
      (img) => img.isNew && img.isLoading && img.file
    );
    if (imagesToUpload.length === 0) return;
    imagesToUpload.forEach((img) => {
      uploadMutation.mutate(img.file as File);
    });
  }, [parentId, images]);

  return {
    images,
    setImages,
    handleDeleteImage,
    handleImageUpdate,
  };
}
