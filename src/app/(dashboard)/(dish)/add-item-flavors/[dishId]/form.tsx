import { useState } from 'react';

import { createFlavorSchema } from '@/validations/dishes-flavors-schema';
import {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { z } from 'zod';

import { AlertMessage } from '@/components/data-display/alert-message/alert-message';
import { Button } from '@/components/inputs/button';
import { Input } from '@/components/inputs/input';
import { InputCashout } from '@/components/inputs/input-cashout/input-cashout';
import { InputEditor } from '@/components/inputs/input-editor';
import { UploadSingleImage } from '@/components/inputs/upload-single-image/upload-single-image';
import { FileUploaded } from '@/components/inputs/upload-single-image/upload-single-image.types';

interface FormProps {
  control: Control<z.infer<typeof createFlavorSchema>>;
  handleSubmit: UseFormHandleSubmit<
    z.infer<typeof createFlavorSchema>,
    undefined
  >;
  onSubmit: SubmitHandler<z.infer<typeof createFlavorSchema>>;
  errors: FieldErrors<z.infer<typeof createFlavorSchema>>;
  handleCloseForm: () => void;
  isEditingId: string | null;
}

export function Form({
  control,
  handleSubmit,
  onSubmit,
  errors,
  handleCloseForm,
  isEditingId,
}: FormProps) {
  const [imageData, setImageData] = useState<FileUploaded>();

  return (
    <div>
      <div className='border-border-default mt-3 rounded-md border p-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='pb-4'>
          <Input
            id='title'
            name='title'
            label='Título do sabor'
            control={control}
            error={errors.title?.message}
            placeholder='Exemplo: X Salada Premium'
          />

          <div className='flex gap-3 py-2'>
            <Input
              id='label'
              name='label'
              label='Título do botão'
              control={control}
              error={errors.label?.message}
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

        {!isEditingId && (
          <AlertMessage
            type='warning'
            text='Para cadastrar as imagens, é necessário primeiro criar o sabor.'
          />
        )}

        {isEditingId && (
          <UploadSingleImage
            label='Adicione uma imagem'
            additionalInfo='Resolução sugerida 533x430'
            currentImage={imageData}
            onSubmit={setImageData}
            cropConfig={{ width: 533, height: 430 }}
          />
        )}
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
        <Button size='sm' type='submit' onClick={handleSubmit(onSubmit)}>
          {isEditingId ? 'Atualizar' : 'Salvar'}
        </Button>
      </div>
    </div>
  );
}
