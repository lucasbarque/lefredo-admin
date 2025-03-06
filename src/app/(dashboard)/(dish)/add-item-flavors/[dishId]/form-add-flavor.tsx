import { Dispatch, SetStateAction, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputCashout } from '@/components/inputs/input-cashout/input-cashout';
import { InputEditor } from '@/components/inputs/input-editor';
import { UploadSingleImage } from '@/components/inputs/upload-single-image/upload-single-image';
import { FileUploaded } from '@/components/inputs/upload-single-image/upload-single-image.types';

const inputSchema = z.object({
  title: z.string(),
  price: z.string(),
  description: z.string(),
});
type InputSchema = z.infer<typeof inputSchema>;

interface FormAddFlavorProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
}

export function FormAddFlavor({ setIsFormOpen }: FormAddFlavorProps) {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<InputSchema>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      title: '',
      price: '',
      description: '',
    },
  });

  const [imageData, setImageData] = useState<FileUploaded>();

  const onSubmit: SubmitHandler<z.infer<typeof inputSchema>> = async () => {};

  function handleCloseForm() {
    reset();
    setIsFormOpen(false);
  }

  return (
    <div>
      <div className='border-border-default mt-3 rounded-md border p-6'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-2 flex gap-3'>
            <Input
              id='title'
              name='title'
              label='Título do sabor'
              control={control}
              error={errors.title?.message}
              placeholder='Exemplo: X Salada'
            />

            <InputCashout
              control={control}
              name='price'
              placeholder='0,00'
              withSideLabel
              sideLabelText='R$'
              limitCash={10000}
              label='Preço'
              error={errors.price?.message}
            />
          </div>

          <InputEditor
            id='description'
            name='description'
            label='Descrição'
            control={control}
            placeholder='Exemplo: Pão brioche, alface, tomate, cebola caramelizada.'
            error={errors.description?.message}
            isOptional
            maxLength={500}
          />
        </form>

        <UploadSingleImage
          label='Adicione uma imagem'
          additionalInfo='Resolução sugerida 533x430'
          currentImage={imageData}
          onSubmit={setImageData}
          cropConfig={{ width: 533, height: 430 }}
        />
      </div>
      <div className='mt-2 flex items-center justify-end gap-2'>
        <Button
          size='sm'
          type='button'
          onClick={handleCloseForm}
          family='secondary'
        >
          Cancelar
        </Button>
        <Button size='sm' type='submit' onClick={() => {}}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
