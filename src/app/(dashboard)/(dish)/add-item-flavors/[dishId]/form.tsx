import { createFlavorSchema } from '@/validations/dishes-flavors-schema';
import { Control, FieldErrors } from 'react-hook-form';
import { z } from 'zod';

import { AlertMessage } from '@/components/data-display/alert-message/alert-message';
import { Input } from '@/components/inputs/input';
import { InputCashout } from '@/components/inputs/input-cashout/input-cashout';
import { InputEditor } from '@/components/inputs/input-editor';

interface FormProps {
  control: Control<z.infer<typeof createFlavorSchema>>;
  errors: FieldErrors<z.infer<typeof createFlavorSchema>>;
  isEditingId: string | null;
}

export function Form({ control, errors, isEditingId }: FormProps) {
  return (
    <div>
      <div className='border-border-default mt-3 rounded-md border p-6'>
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
      </div>

      {!isEditingId && (
        <div className='mt-4'>
          <AlertMessage
            type='warning'
            text='Para cadastrar as imagens, é necessário primeiro criar o sabor.'
          />
        </div>
      )}
    </div>
  );
}
