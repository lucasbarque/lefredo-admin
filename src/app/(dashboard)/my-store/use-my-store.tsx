import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FileUploaded } from '@/components/inputs/upload-single-image/upload-single-image.types';

const inputSchema = z.object({
  name: z
    .string()
    .min(3, 'Digite no mínimo 3 caracteres')
    .max(40, 'Digite no máximo 40 caracteres'),
  logo: z.string(),
  welcome_message: z.string().optional().nullable(),
});

type InputSchema = z.infer<typeof inputSchema>;
export function useMyStore() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      name: '',
      logo: '',
      welcome_message: '',
    },
  });
  const [imageData, setImageData] = useState<FileUploaded>();

  const onSubmit: SubmitHandler<InputSchema> = async () => {};

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    imageData,
    setImageData,
  };
}
